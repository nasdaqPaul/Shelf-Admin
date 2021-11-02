import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import DatabaseService from './app/storage/local/db';

if (environment.production) {
  enableProdMode();
}
DatabaseService.initDb().then(() => {
  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch((err) => console.error(err));
});
