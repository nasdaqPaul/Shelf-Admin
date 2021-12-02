import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import SiteManagerComponent from './site-manager.component';
import { ContentComponent } from './pages/content/content.component';
import { ArticlesComponent } from './articles/pages/articles/articles.component';
import { SeriesPageComponent } from './series/pages/series/series-page.component';
import { ArticleDetailsComponent } from './articles/pages/article-details/article-details.component';
import ArticleDetailResolver from './articles/resolvers/article-detail.resolver';
import { NotFoundComponent } from './articles/pages/not-found/not-found.component';

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
            path: '', redirectTo: '/site/content/articles', pathMatch: 'full',
          },
          {
            path: 'articles', component: ArticlesComponent,
          },
          {
            path: 'series', component: SeriesPageComponent,
          },
          {
            path: 'articles/not-found', component: NotFoundComponent,
          },
          {
            path: 'articles/:id',
            component: ArticleDetailsComponent,
            resolve: {
              article: ArticleDetailResolver,
            },
          },
        ],
      },
    ],
  },
];
