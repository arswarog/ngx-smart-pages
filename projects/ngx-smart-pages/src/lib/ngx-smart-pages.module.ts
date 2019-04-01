import { NgModule } from '@angular/core';
import { NgxSmartPagesComponent } from './ngx-smart-pages.component';
import { NgxSmartPagesService } from './ngx-smart-pages.service';

@NgModule({
  declarations: [
    NgxSmartPagesComponent,
  ],
  providers   : [
    NgxSmartPagesService,
  ],
  imports     : [],
  exports     : [
    NgxSmartPagesComponent,
  ],
})
export class NgxSmartPagesModule {
}
