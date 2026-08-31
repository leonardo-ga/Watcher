import { Injectable, signal } from '@angular/core';
import { JournalEntry, journalEntries as mockJournalEntries } from './journal';

@Injectable({ providedIn: 'root' })
export class JournalDataService {
  // Replace this local source with a backend request without changing journal consumers.
  readonly entries = signal<readonly JournalEntry[]>(mockJournalEntries);
}
