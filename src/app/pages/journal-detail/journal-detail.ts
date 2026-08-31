import { Component, computed, inject, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { JournalDataService } from '../../data/journal-data.service';
import { WatchDataService } from '../../data/watch-data.service';
import { Watch } from '../../data/watches';

@Component({
  selector: 'app-journal-detail',
  imports: [RouterLink],
  templateUrl: './journal-detail.html',
  styleUrl: './journal-detail.css',
})
export class JournalDetail implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly journalData = inject(JournalDataService);
  private readonly watchData = inject(WatchDataService);
  private readonly params = toSignal(this.route.paramMap, { initialValue: this.route.snapshot.paramMap });

  protected readonly entry = computed(() => this.journalData.entries().find((entry) => entry.slug === this.params().get('slug')));
  protected readonly featuredWatch = computed(() => {
    const entry = this.entry();
    return entry ? this.watchFor(entry.featuredWatchSlug) : undefined;
  });
  protected readonly comparedWatches = computed(() => {
    const entry = this.entry();
    return entry ? entry.relatedWatchSlugs.map((slug) => this.watchFor(slug)).filter((watch): watch is Watch => watch !== undefined) : [];
  });

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  protected watchFor(slug: string): Watch | undefined {
    return this.watchData.watches().find((watch) => watch.slug === slug);
  }
}
