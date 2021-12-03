import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ROUTES } from './site-manager.routes';
import { SharedModule } from '../shared/shared.module';
import { ArticleComponent } from './articles/components/article/article.component';
import { ArticleListComponent } from './articles/components/article-list/article-list.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import SiteManagerComponent from './site-manager.component';
import { ContentComponent } from './pages/content/content.component';
import { ArticlesComponent } from './articles/pages/articles/articles.component';
import { SeriesPageComponent } from './series/pages/series/series-page.component';
import { ArticleDetailsComponent } from './articles/pages/article-details/article-details.component';
import ArticleDetailResolver from './articles/resolvers/article-detail.resolver';
import { NotFoundComponent } from './articles/pages/not-found/not-found.component';
import { ConnectSiteModalComponent } from './components/connect-site/connect-site-modal.component';
import { UsersPageComponent } from './pages/users/users-page.component';
import { UsersListComponent } from './users/components/users-list/users-list.component';
import { UsersListItemComponent } from './users/components/users-list-item/users-list-item.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ArticleComponent,
    ArticleListComponent,
    NavBarComponent,
    SiteManagerComponent,
    ContentComponent,
    ArticlesComponent,
    SeriesPageComponent,
    ArticleDetailsComponent,
    NotFoundComponent,
    ConnectSiteModalComponent,
    UsersPageComponent,
    UsersListComponent,
    UsersListItemComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,

  ],
  providers: [
    ArticleDetailResolver,
  ],
})
export class SiteManagerModule {
}
