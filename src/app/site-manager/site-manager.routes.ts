import {Routes} from '@angular/router';
import {DashboardComponent} from './dashboard.module/dashboard.component';
import SiteManagerComponent from './site-manager.component';
import {ContentPageComponent} from './content.module/components/content.page/content.page.component';
import {ArticlesComponent} from './content.module/articles/components/articles.page/articles.component';
import {SeriesPageComponent} from './content.module/series/pages/series/series-page.component';
import {ArticleDetailsPageComponent} from './content.module/articles/components/article-details.page/article-details.page.component';
import ArticleDetailResolver from './content.module/articles/resolvers/article-detail.resolver';
import {NotFoundComponent} from './content.module/articles/components/not-found.page/not-found.component';
import {UsersPageComponent} from "./users.module/components/users.page/users-page.component";
import {UsersListComponent} from "./users.module/components/users-list/users-list.component";
import {CreateUserPageComponent} from "./users.module/components/create-user.page/create-user-page.component";
import {UserDetailsPageComponent} from "./users.module/components/user-details.page/user-details.page.component";
import {ConfigPageComponent} from "./config.module/components/config.page/config.page.component";

export const ROUTES: Routes = [
  {
    path: 'site',
    component: SiteManagerComponent,
    children: [
      {path: '', component: DashboardComponent},
      {
        path: 'content',
        component: ContentPageComponent,
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
            component: ArticleDetailsPageComponent,
            resolve: {
              article: ArticleDetailResolver,
            },
          },
        ],
      },
      {
        path: 'users', component: UsersPageComponent, children: [
          {path: '', component: UsersListComponent},
          {path: 'create', component: CreateUserPageComponent},
          {path: ':id', component: UserDetailsPageComponent}
        ]
      },
      {
        path: 'config', component: ConfigPageComponent
      }
    ],
  },
];
