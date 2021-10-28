import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import AppNavbarComponent from "./core/components/app-navbar/app-navbar.component";
import {RouterModule} from "@angular/router";
import routes from "./app.routes";
import AutosaveGuard from "./features/articles/guards/autosave.guard";
import {CommonModule} from "@angular/common";
import DashboardComponent from "./core/pages/dashboard/dashboard.component";
import LocalArticleComponent from "./features/articles/components/local-article/local-article.component";
import LocalArticleListComponent from "./features/articles/components/local-article-list/local-article-list.component";
import SeriesComponent from "./features/series/components/series/series.component";
import LocalSeriesListComponent from "./features/series/components/series-list/local-series-list.component";
import ListNavigatorComponent from "./shared/components/list-navigator/list-navigator.component";
import ListPaginatorComponent from "./shared/components/list-paginator/list-paginator.component";
import SavedArticleComponent from "./core/pages/dashboard/components/saved-article/saved-article.component";
import SavedArticleListComponent from "./core/pages/dashboard/components/saved-article-list/saved-article-list.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import EditorComponent from "./features/articles/pages/article-editor/editor.component";
import LoginComponent from "./features/authentication/login/login.component";
import SignupComponent from "./features/authentication/signup/signup.component";
import AcccountComponent from "./features/account/acccount.component";
import AppFooterComponent from "./core/components/app-footer/app-footer.component";
import {BS_TOKEN} from "./core/services/bootsratp.service";
import SeriesEditorComponent from "./features/series/pages/series-editor/series-editor.component";
import DatabaseService from "./storage/local/db";
import SeriesArticleListComponent from "./features/series/components/series-article-list/series-article-list.component";
import ArticleIdToTitlePipe from "./features/articles/pipes/article-id-to-title.pipe";

const bootstrap: any =(window as any)['bootstrap'];


@NgModule({
  declarations: [
    AppComponent,
    AppNavbarComponent,
    DashboardComponent,
    LocalArticleComponent,
    LocalArticleListComponent,
    SeriesComponent,
    LocalSeriesListComponent,
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
    ArticleIdToTitlePipe
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
      provide: BS_TOKEN, useValue: bootstrap
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
