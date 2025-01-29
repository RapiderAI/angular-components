import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RappiderMediaPlayerComponent } from './media-player.component';

@NgModule({
  imports: [RappiderMediaPlayerComponent],
  exports: [RappiderMediaPlayerComponent]
})
export class RappiderMediaPlayerModule { }
