import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppShellModule } from './app/app-shell.module';


platformBrowserDynamic().bootstrapModule(AppShellModule)
  .catch(err => console.error(err));