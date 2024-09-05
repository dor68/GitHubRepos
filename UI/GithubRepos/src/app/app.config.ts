import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

import {JwtModule} from "@auth0/angular-jwt";


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),provideHttpClient(),
    importProvidersFrom([
                  JwtModule.forRoot({
                              config: {
                                  tokenGetter: () => localStorage.getItem('token')
                            }
                      })

      ])
    ]
  
}
