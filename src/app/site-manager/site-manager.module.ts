import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.module/dashboard.component';
import { ROUTES } from './site-manager.routes';
import { SharedModule } from '../shared/shared.module';
import { ArticleComponent } from './content.module/articles/components/article/article.component';
import { ArticleListComponent } from './content.module/articles/components/article-list/article-list.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import SiteManagerComponent from './site-manager.component';
import { ContentPageComponent } from './content.module/components/content.page/content.page.component';
import { ArticlesComponent } from './content.module/articles/components/articles.page/articles.component';
import { SeriesPageComponent } from './content.module/series/pages/series/series-page.component';
import { ArticleDetailsPageComponent } from './content.module/articles/components/article-details.page/article-details.page.component';
import ArticleDetailResolver from './content.module/articles/resolvers/article-detail.resolver';
import { NotFoundComponent } from './content.module/articles/components/not-found.page/not-found.component';
import { ConnectSiteModalComponent } from './components/connect-site/connect-site-modal.component';
import { UsersPageComponent } from './users.module/components/users.page/users-page.component';
import { UsersListComponent } from './users.module/components/users-list/users-list.component';
import { UsersListItemComponent } from './users.module/components/users-list-item/users-list-item.component';
import { CreateUserPageComponent } from './users.module/components/create-user.page/create-user-page.component';
import { UserDetailsPageComponent } from './users.module/components/user-details.page/user-details.page.component';
import { ConfigPageComponent } from './config.module/components/config.page/config.page.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ArticleComponent,
    ArticleListComponent,
    NavBarComponent,
    SiteManagerComponent,
    ContentPageComponent,
    ArticlesComponent,
    SeriesPageComponent,
    ArticleDetailsPageComponent,
    NotFoundComponent,
    ConnectSiteModalComponent,
    UsersPageComponent,
    UsersListComponent,
    UsersListItemComponent,
    CreateUserPageComponent,
    UserDetailsPageComponent,
    ConfigPageComponent,
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
