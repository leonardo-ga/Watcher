import { AfterViewInit, Component, ElementRef, HostListener, ViewChild, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navigation',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navigation.html',
  styleUrl: './navigation.css',
})
export class Navigation implements AfterViewInit {
  @ViewChild('navigationLinks') private navigationLinks?: ElementRef<HTMLElement>;

  protected readonly isHeaderHidden = signal(false);

  private lastScrollY = 0;
  private pillAnimationFrame?: number;

  ngAfterViewInit(): void {
    this.lastScrollY = window.scrollY;
    this.scheduleActivePillUpdate();
  }

  @HostListener('window:resize')
  protected onWindowResize(): void {
    this.scheduleActivePillUpdate();
  }

  @HostListener('window:scroll')
  protected onWindowScroll(): void {
    const currentScrollY = window.scrollY;
    const scrollDelta = currentScrollY - this.lastScrollY;

    if (currentScrollY < 96) {
      this.isHeaderHidden.set(false);
    } else if (Math.abs(scrollDelta) > 8) {
      this.isHeaderHidden.set(scrollDelta > 0);
    }

    this.lastScrollY = currentScrollY;
  }

  protected updateActivePill(): void {
    this.scheduleActivePillUpdate();
  }

  protected scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  private scheduleActivePillUpdate(): void {
    if (this.pillAnimationFrame !== undefined) {
      cancelAnimationFrame(this.pillAnimationFrame);
    }

    this.pillAnimationFrame = requestAnimationFrame(() => {
      this.pillAnimationFrame = undefined;
      const navigation = this.navigationLinks?.nativeElement;
      const activeLink = navigation?.querySelector<HTMLElement>('a.active');

      if (!navigation || !activeLink) {
        return;
      }

      const activeLinkBounds = activeLink.getBoundingClientRect();
      const pillInset = parseFloat(getComputedStyle(navigation).paddingLeft);

      navigation.style.setProperty('--active-pill-offset', `${activeLink.offsetLeft - pillInset}px`);
      navigation.style.setProperty('--active-pill-width', `${activeLinkBounds.width}px`);
    });
  }
}
