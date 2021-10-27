import {Routes} from "@angular/router";
import DashboardComponent from "./core/pages/dashboard/dashboard.component";
import EditorComponent from "./features/articles/pages/article-editor/editor.component";
import {default as ArticleEditorAutosaveGuard} from "./features/articles/guards/autosave.guard";
import ArticleEditorResolver from "./features/articles/resolvers/article-editor.resolver";
import PageNotFoundComponent from "./core/pages/page-not-found/page-not-found.component";
import LoginComponent from "./features/authentication/login/login.component";
import SignupComponent from "./features/authentication/signup/signup.component";
import AcccountComponent from "./features/account/acccount.component";
import SeriesEditorComponent from "./features/series/pages/series-editor/series-editor.component";
import SeriesEditorResolver from "./features/series/resolvers/series-editor.resolver";
import {default as SeriesEditorAutosaveGuard} from "./features/series/guards/autosave.guard";

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'editor/:id',
    component: EditorComponent,
    canDeactivate: [
      ArticleEditorAutosaveGuard
    ],
    resolve: {
      article: ArticleEditorResolver
    }
  },
  {
    path: 'editor',
    component: EditorComponent,
    canDeactivate: [
      ArticleEditorAutosaveGuard
    ]
  },
  {path: 'auth/login', component: LoginComponent},
  {path: 'auth/signup', component: SignupComponent},
  {path: 'account', component: AcccountComponent},
  {
    path: 'series-editor',
    component: SeriesEditorComponent,
    canDeactivate: [
      SeriesEditorAutosaveGuard
    ]
  },
  {
    path: 'series-editor/:index',
    component: SeriesEditorComponent,
    resolve: {
      series: SeriesEditorResolver
    },
    canDeactivate: [
      SeriesEditorAutosaveGuard
    ]
  },
  {path: '**', component: PageNotFoundComponent}
]

export default routes;
