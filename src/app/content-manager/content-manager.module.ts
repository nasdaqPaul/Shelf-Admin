import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import AccountComponent from './account/acccount.component';
import ArticleComponent from './articles/components/article/article.component';
import ArticleListComponent from './articles/components/article-list/article-list.component';
import SeriesComponent from './series/components/series/series.component';
import SeriesArticleComponent from './series/components/series-article/series-article.component';
import SeriesArticleListComponent from './series/components/series-article-list/series-article-list.component';
import SeriesListComponent from './series/components/series-list/series-list.component';
import ArticleIdToTitlePipe from './articles/pipes/article-id-to-title.pipe';
import EditorComponent from './articles/components/article-editor/editor.component';
import SeriesEditorComponent from './series/pages/series-editor/series-editor.component';
import { SharedModule } from '../shared/shared.module';
import DashboardComponent from './components/dashboard/dashboard.component';
import { default as SeriesAutosaveGuard } from './series/guards/autosave.guard';
import { default as ArticleAutosaveGuard } from './articles/guards/autosave.guard';
import ContentManagerComponent from './content-manager.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { UploadArticleComponent } from './articles/components/upload-article/upload-article.component';
import { HeroImageComponent } from './articles/components/hero-image/hero-image.component';

@NgModule({
  declarations: [
    DashboardComponent,
    AccountComponent,
    ArticleComponent,
    ArticleListComponent,
    SeriesComponent,
    SeriesArticleComponent,
    SeriesArticleListComponent,
    SeriesListComponent,
    ArticleIdToTitlePipe,
    EditorComponent,
    SeriesEditorComponent,
    ContentManagerComponent,
    NavBarComponent,
    UploadArticleComponent,
    HeroImageComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
  ],
  providers: [
    SeriesAutosaveGuard,
    ArticleAutosaveGuard,
  ],
})
export class ContentManagerModule {
}
