import { ApplicationConfig, provideZoneChangeDetection, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';

import * as AllIcons from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import { provideHttpClient } from '@angular/common/http';
import { provideTranslateService } from '@ngx-translate/core';

import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n'; 
import { registerLocaleData } from '@angular/common'; 
import en from '@angular/common/locales/en';
import { DocumentRef, LazyStripeAPILoader, NGX_STRIPE_VERSION, STRIPE_OPTIONS, STRIPE_PUBLISHABLE_KEY, StripeElementsService, StripeService, WindowRef } from 'ngx-stripe';

registerLocaleData(en);

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideNzIcons(icons),
    provideTranslateService(),
    { provide: LOCALE_ID, useValue: 'en-US' },
    { provide: NZ_I18N, useValue: en_US },
    provideHttpClient(),
    StripeService,
    { provide: NGX_STRIPE_VERSION, useValue: '1.0' },
    {
      provide: STRIPE_PUBLISHABLE_KEY,
      useValue:'pi_3JdDdrY2wyK5pM_secret_FXh1J5BxL'
    },
    {
      provide: STRIPE_OPTIONS,
      useValue: {
        apiVersion: '2020-08-27',
        locale: 'en',
      },
    },
    LazyStripeAPILoader,
    WindowRef,
    DocumentRef,
    StripeElementsService
  ]
};