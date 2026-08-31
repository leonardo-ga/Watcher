import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { WatchDataService } from '../../data/watch-data.service';
import { WatchType } from '../../data/watches';

interface WatchProfile {
  eyebrow: string;
  longDescription: string;
  notes: readonly { label: string; title: string; copy: string }[];
}

const profiles: Record<WatchType, WatchProfile> = {
  Chronograph: {
    eyebrow: 'Purpose in motion',
    longDescription: 'Chronographs earn their place through rhythm: the push of a button, the sweep of a hand, and a dial that rewards a second look.',
    notes: [
      { label: '01', title: 'A dial with a job', copy: 'Registers and scales make elapsed time legible without losing the plot.' },
      { label: '02', title: 'Measured confidence', copy: 'A considered complication for days that move at their own pace.' },
      { label: '03', title: 'Built to return to', copy: 'The kind of familiar shape that becomes more personal with wear.' },
    ],
  },
  Diver: {
    eyebrow: 'Made for depth',
    longDescription: 'The best divers bring purpose to the everyday. Strong proportions and direct visual cues make this a watch that feels ready before anything begins.',
    notes: [
      { label: '01', title: 'Clear at a glance', copy: 'High-contrast details keep the dial useful in any kind of light.' },
      { label: '02', title: 'A little more resolve', copy: 'The rotating bezel gives the silhouette its unmistakable confidence.' },
      { label: '03', title: 'Weekend-proof', copy: 'A relaxed, capable shape that works far beyond its intended setting.' },
    ],
  },
  Dress: {
    eyebrow: 'Quietly composed',
    longDescription: 'Dress watches are an exercise in restraint. Every surface, proportion, and line has more room to speak, making balance the real complication.',
    notes: [
      { label: '01', title: 'The art of proportion', copy: 'A measured case lets the dial and wrist share equal attention.' },
      { label: '02', title: 'Nothing extra', copy: 'Clean details make room for the materials and finishing to do the work.' },
      { label: '03', title: 'Easy ceremony', copy: 'Polished enough for an occasion, relaxed enough to make one.' },
    ],
  },
  Field: {
    eyebrow: 'Function, refined',
    longDescription: 'Field watches make clarity feel like a luxury. The appeal is in their honest layout, grounded materials, and the confidence to leave the excess behind.',
    notes: [
      { label: '01', title: 'Designed to be read', copy: 'The dial puts the essential information first, every time.' },
      { label: '02', title: 'No preciousness', copy: 'A practical companion that looks better once it has a few stories.' },
      { label: '03', title: 'The daily default', copy: 'Simple enough to forget about until someone asks what it is.' },
    ],
  },
  GMT: {
    eyebrow: 'Two places at once',
    longDescription: 'A GMT is a small promise of elsewhere. Its extra hand turns a familiar dial into a quiet tool for staying connected to another time zone.',
    notes: [
      { label: '01', title: 'A second horizon', copy: 'The additional time display keeps home and away in the same frame.' },
      { label: '02', title: 'Travel, considered', copy: 'Built for crossing time zones, but just as good at brightening routine.' },
      { label: '03', title: 'Useful character', copy: 'A functional complication with enough visual energy to carry a whole look.' },
    ],
  },
  'Integrated sports': {
    eyebrow: 'An easy rhythm',
    longDescription: 'Integrated sports watches balance sharp geometry with an effortless feel. The bracelet, case, and dial work as one continuous thought.',
    notes: [
      { label: '01', title: 'One continuous line', copy: 'The case and bracelet read as a single, satisfying silhouette.' },
      { label: '02', title: 'Texture does the talking', copy: 'A graphic dial brings personality without making the watch feel loud.' },
      { label: '03', title: 'Built for repeat wear', copy: 'Sporty enough for off-hours, composed enough for the rest.' },
    ],
  },
};

@Component({
  selector: 'app-watch-detail',
  imports: [RouterLink],
  templateUrl: './watch-detail.html',
  styleUrl: './watch-detail.css',
})
export class WatchDetail implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly watchData = inject(WatchDataService);
  private readonly routeParams = toSignal(this.route.paramMap, { initialValue: this.route.snapshot.paramMap });
  protected readonly selectedImageIndex = signal(0);

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  protected readonly watch = computed(() => {
    const slug = this.routeParams().get('slug');
    return this.watchData.watches().find((watch) => watch.slug === slug);
  });

  protected readonly profile = computed(() => {
    const watch = this.watch();
    return watch ? profiles[watch.type] : undefined;
  });

  protected readonly gallery = computed(() => {
    const watch = this.watch();
    return watch ? [{ src: watch.image, alt: watch.imageAlt }, ...(watch.gallery ?? [])] : [];
  });

  protected readonly selectedImage = computed(() => this.gallery()[this.selectedImageIndex()]);

  private readonly resetGalleryOnWatchChange = effect(() => {
    this.watch()?.slug;
    this.selectedImageIndex.set(0);
  });

  protected readonly relatedWatches = computed(() => {
    const currentWatch = this.watch();
    if (!currentWatch) return [];

    return this.watchData.watches()
      .filter((watch) => watch.slug !== currentWatch.slug)
      .sort((a, b) => Number(b.type === currentWatch.type) - Number(a.type === currentWatch.type))
      .slice(0, 3);
  });

  protected formatPrice(price: number): string {
    return new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(price);
  }

  protected scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  protected selectImage(index: number): void {
    this.selectedImageIndex.set(index);
  }
}
