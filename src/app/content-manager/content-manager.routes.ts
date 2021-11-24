import { Routes } from '@angular/router';
import DashboardComponent from './pages/dashboard/dashboard.component';
import EditorComponent from './articles/pages/article-editor/editor.component';
import { default as ArticleEditorAutosaveGuard } from './articles/guards/autosave.guard';
import ArticleEditorResolver from './articles/resolvers/article-editor.resolver';
import LoginComponent from '../core/authentication/login/login.component';
import SignupComponent from '../core/authentication/signup/signup.component';
import AcccountComponent from './account/acccount.component';
import SeriesEditorComponent from './series/pages/series-editor/series-editor.component';
import { default as SeriesEditorAutosaveGuard } from './series/guards/autosave.guard';
import SeriesEditorResolver from './series/resolvers/series-editor.resolver';
import ContentManagerComponent from './content-manager.component';

export const ROUTES: Routes = [
  {
    path: '',
    component: ContentManagerComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'editor/:id',
        component: EditorComponent,
        canDeactivate: [
          ArticleEditorAutosaveGuard,
        ],
        resolve: {
          article: ArticleEditorResolver,
        },
      },
      {
        path: 'editor',
        component: EditorComponent,
        canDeactivate: [
          ArticleEditorAutosaveGuard,
        ],
      },
      {
        path: 'series-editor',
        component: SeriesEditorComponent,
        canDeactivate: [
          SeriesEditorAutosaveGuard,
        ],
      },
      {
        path: 'series-editor/:id',
        component: SeriesEditorComponent,
        resolve: {
          series: SeriesEditorResolver,
        },
        canDeactivate: [
          SeriesEditorAutosaveGuard,
        ],
      },
    ],
  },
];
