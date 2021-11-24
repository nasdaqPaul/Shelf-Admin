import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import SiteManagerComponent from './site-manager.component';
import { ContentComponent } from './pages/content/content.component';
import { ArticlesComponent } from './articles/pages/articles/articles.component';
import { SeriesPageComponent } from './series/pages/series/series-page.component';

export const ROUTES: Routes = [
  {
    path: 'site',
    component: SiteManagerComponent,
    children: [
      { path: '', component: DashboardComponent },
      {
        path: 'content',
        component: ContentComponent,
        children: [
          {
            path: '', redirectTo: 'articles', pathMatch: 'prefix',
          },
          {
            path: 'articles', component: ArticlesComponent,
          },
          {
            path: 'series', component: SeriesPageComponent,
          },
        ],
      },
    ],
  },
];
