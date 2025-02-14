import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { ConfigService } from './app/services/stripe-config.service';
import { provideHttpClient } from '@angular/common/http';
import { DocumentRef, LazyStripeAPILoader, NGX_STRIPE_VERSION, STRIPE_OPTIONS, STRIPE_PUBLISHABLE_KEY, StripeElementsService, StripeService, WindowRef } from 'ngx-stripe';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: ConfigService, useClass: ConfigService }, // ConfigService sağlayıcısını ekliyoruz
    provideHttpClient(),
    StripeService,
    { provide: NGX_STRIPE_VERSION, useValue: '1.0' },
    {
      provide: 'STRIPE_CLIENT_SECRET',
      useFactory: (configService: ConfigService) => configService.getStripeKey(),
      deps: [ConfigService],
    },
    {
      provide: STRIPE_PUBLISHABLE_KEY,
      useFactory: (configService: ConfigService) => configService.getStripeKey(),
      deps: [ConfigService],
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
});