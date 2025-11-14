import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor} from './interceptor/token.interceptor';
import { ConfigService } from './config.service';


export function initializeApp(config: ConfigService) {
  return () => config.loadConfig();
}

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),provideHttpClient(
      withInterceptors([tokenInterceptor])
    ),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [ConfigService],
      multi: true
    }]
};
