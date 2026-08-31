import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { JournalEntry } from '../../data/journal';
import { JournalDataService } from '../../data/journal-data.service';
import { WatchDataService } from '../../data/watch-data.service';
import { Watch } from '../../data/watches';

@Component({
  selector: 'app-journal',
  imports: [RouterLink],
  templateUrl: './journal.html',
  styleUrl: './journal.css',
})
export class Journal {
  private readonly journalData = inject(JournalDataService);
  private readonly watchData = inject(WatchDataService);

  protected readonly featuredEntry = computed(() => this.journalData.entries()[0]);
  protected readonly comparisons = computed(() => this.journalData.entries().filter((entry) => entry.kind === 'Comparison'));
  protected readonly stories = computed(() => this.journalData.entries().slice(1).filter((entry) => entry.kind === 'Story'));

  protected watchFor(slug: string): Watch | undefined {
    return this.watchData.watches().find((watch) => watch.slug === slug);
  }

  protected comparisonWatches(entry: JournalEntry): Watch[] {
    return entry.relatedWatchSlugs
      .map((slug) => this.watchFor(slug))
      .filter((watch): watch is Watch => watch !== undefined);
  }
}
