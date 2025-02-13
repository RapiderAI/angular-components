import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { getAppConfig } from './app/app.config';
import { ConfigService } from './app/services/stripe-config.service';
import { TranslateModule } from '@ngx-translate/core';
import { importProvidersFrom } from '@angular/core';

// bootstrapApplication ile uygulamayı başlatıyoruz
bootstrapApplication(AppComponent, {
  providers: [
    ConfigService, // ConfigService'i burada sağlıyoruz
    {
      provide: 'APP_CONFIG', // 'APP_CONFIG' adında bir sağlayıcı belirliyoruz
      useFactory: (configService: ConfigService) => getAppConfig(configService), // configService kullanarak config alıyoruz
      deps: [ConfigService], // ConfigService bağımlılığı
    },
    importProvidersFrom(TranslateModule.forRoot()), 
  ]
});
