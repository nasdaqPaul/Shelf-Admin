import { Routes } from '@angular/router';
import { ROUTES } from './content-manager/content-manager.routes';
import PageNotFoundComponent from './core/pages/page-not-found/page-not-found.component';
import LoginComponent from './core/authentication/login/login.component';
import SignupComponent from './core/authentication/signup/signup.component';
import AcccountComponent from './content-manager/account/acccount.component';

const routes: Routes = [
  ...ROUTES,
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/signup', component: SignupComponent },
  { path: 'account', component: AcccountComponent },
  {
    path: 'site',
    loadChildren: () => import('./site-manager/site-manager.module').then((m) => m.SiteManagerModule),
  },
  { path: '**', component: PageNotFoundComponent },
];

export default routes;
