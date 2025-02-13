import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { getAppConfig } from './app/app.config';
import { ConfigService } from './app/services/stripe-config.service';
import { TranslateModule } from '@ngx-translate/core';
import { importProvidersFrom } from '@angular/core';

bootstrapApplication(AppComponent, {
  providers: [
    ConfigService,
    {
      provide: 'APP_CONFIG',
      useFactory: (configService: ConfigService) => getAppConfig(configService),
      deps: [ConfigService],
    },
    importProvidersFrom(TranslateModule.forRoot()), 
  ]
});
