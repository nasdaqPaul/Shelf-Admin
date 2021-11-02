import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import AppNavbarComponent from './core/components/app-navbar/app-navbar.component';
import routes from './app.routes';
import AutosaveGuard from './features/articles/guards/autosave.guard';
import DashboardComponent from './core/pages/dashboard/dashboard.component';
import ArticleComponent from './features/articles/components/article/article.component';
import ArticleListComponent from './features/articles/components/article-list/article-list.component';
import SeriesComponent from './features/series/components/series/series.component';
import SeriesListComponent from './features/series/components/series-list/series-list.component';
import ListNavigatorComponent from './shared/components/list-navigator/list-navigator.component';
import ListPaginatorComponent from './shared/components/list-paginator/list-paginator.component';
import SavedArticleComponent from './core/pages/dashboard/components/saved-article/saved-article.component';
import SavedArticleListComponent from './core/pages/dashboard/components/saved-article-list/saved-article-list.component';
import EditorComponent from './features/articles/pages/article-editor/editor.component';
import LoginComponent from './features/authentication/login/login.component';
import SignupComponent from './features/authentication/signup/signup.component';
import AcccountComponent from './features/account/acccount.component';
import AppFooterComponent from './core/components/app-footer/app-footer.component';
import { BS_TOKEN } from './core/services/bootsratp.service';
import SeriesEditorComponent from './features/series/pages/series-editor/series-editor.component';
import DatabaseService from './storage/local/db';
import SeriesArticleListComponent from './features/series/components/series-article-list/series-article-list.component';
import ArticleIdToTitlePipe from './features/articles/pipes/article-id-to-title.pipe';
import SeriesArticleComponent from './features/series/components/series-article/series-article.component';

const { bootstrap } = window as any;

@NgModule({
  declarations: [
    AppComponent,
    AppNavbarComponent,
    DashboardComponent,
    ArticleComponent,
    ArticleListComponent,
    SeriesComponent,
    SeriesListComponent,
    ListNavigatorComponent,
    ListPaginatorComponent,
    SavedArticleComponent,
    SavedArticleListComponent,
    EditorComponent,
    LoginComponent,
    SignupComponent,
    AcccountComponent,
    AppFooterComponent,
    SeriesEditorComponent,
    AppNavbarComponent,
    SeriesArticleListComponent,
    ArticleIdToTitlePipe,
    SeriesArticleComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    AutosaveGuard,
    DatabaseService,
    {
      provide: BS_TOKEN, useValue: bootstrap,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
