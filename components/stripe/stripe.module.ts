import { NgModule } from '@angular/core';
import { RappiderStripeComponent } from './stripe.component';


@NgModule({
  imports: [RappiderStripeComponent],
  exports: [RappiderStripeComponent]
})
export class RappiderStripeModule {
  static forRoot(clientSecret: string) {
    return {
      ngModule: RappiderStripeModule,
      providers: [
        { provide: 'STRIPE_CLIENT_SECRET', useValue: clientSecret },
      ],
    };
  }
}