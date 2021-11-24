import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import AppNavbarComponent from './core/components/app-navbar/app-navbar.component';
import routes from './app.routes';
import LoginComponent from './core/authentication/login/login.component';
import SignupComponent from './core/authentication/signup/signup.component';
import AppFooterComponent from './core/components/app-footer/app-footer.component';
import { BS_TOKEN } from './core/services/bootsratp.service';
import DatabaseService from './storage/local/db';
import { SiteManagerModule } from './site-manager/site-manager.module';
import { ContentManagerModule } from './content-manager/content-manager.module';

const { bootstrap } = window as any;

@NgModule({
  declarations: [
    AppComponent,
    AppNavbarComponent,
    LoginComponent,
    SignupComponent,
    AppFooterComponent,
    AppNavbarComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    SiteManagerModule,
    ContentManagerModule,
  ],
  providers: [
    DatabaseService,
    {
      provide: BS_TOKEN, useValue: bootstrap,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
