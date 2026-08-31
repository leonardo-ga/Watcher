import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Journal } from './pages/journal/journal';
import { JournalDetail } from './pages/journal-detail/journal-detail';
import { WatchCatalogue } from './pages/watch-catalogue/watch-catalogue';
import { WatchDetail } from './pages/watch-detail/watch-detail';

export const routes: Routes = [
  { path: '', component: Home, title: 'Watcher' },
  { path: 'watches', component: WatchCatalogue, title: 'Discover watches | Watcher' },
  { path: 'watches/:slug', component: WatchDetail, title: 'Watch details | Watcher' },
  { path: 'journal', component: Journal, title: 'Journal | Watcher' },
  { path: 'journal/:slug', component: JournalDetail, title: 'Journal | Watcher' },
  { path: '**', redirectTo: '' }
];
