import { Injectable, signal } from '@angular/core';
import { Watch, watches as mockWatches } from './watches';

@Injectable({ providedIn: 'root' })
export class WatchDataService {
  // Consumers stay behind this boundary when the local source becomes an API.
  readonly watches = signal<readonly Watch[]>(mockWatches);
}
