import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';

import * as AllIcons from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import { provideHttpClient } from '@angular/common/http';
import { provideTranslateService } from '@ngx-translate/core';
import { NgxStripeModule } from 'ngx-stripe';

import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n'; 
import { registerLocaleData } from '@angular/common'; 
import en from '@angular/common/locales/en';
import { ConfigService } from './services/stripe-config.service';

registerLocaleData(en);

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key]);

export async function getAppConfig(configService: ConfigService): Promise<ApplicationConfig> {
  await configService.loadConfig();

  return {
    providers: [
      provideHttpClient(),
      provideZoneChangeDetection({ eventCoalescing: true }),
      provideRouter(routes),
      provideAnimations(),
      provideNzIcons(icons),
      provideTranslateService(),
      { provide: LOCALE_ID, useValue: 'en-US' },
      { provide: NZ_I18N, useValue: en_US },
      importProvidersFrom(NgxStripeModule.forRoot(configService.getStripeKey()))
    ]
  };
}
