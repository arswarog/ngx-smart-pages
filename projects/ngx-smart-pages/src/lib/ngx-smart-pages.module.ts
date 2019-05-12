import { ModuleWithProviders, NgModule } from '@angular/core';
import { NgxSmartPagesComponent } from './ngx-smart-pages.component';
import { NgxSmartPagesService } from './ngx-smart-pages.service';
import { NgxSmartWidgetComponent } from './widget/widget.component';
import { DebugComponent } from './widgets/debug/debug.component';
import { ISmartPagesConfig, NGX_SMART_PAGES_CONFIG } from './ngx-smart-pages.interface';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations   : [
        NgxSmartPagesComponent,
        NgxSmartWidgetComponent,
        DebugComponent,
    ],
    imports        : [
        CommonModule,
    ],
    exports        : [
        NgxSmartPagesComponent,
    ],
    entryComponents: [
        NgxSmartWidgetComponent,
        DebugComponent,
    ],
})
export class NgxSmartPagesModule {
    static forRoot(config: ISmartPagesConfig = {}): ModuleWithProviders {
        return {
            ngModule : NgxSmartPagesModule,
            providers: [
                {provide: NGX_SMART_PAGES_CONFIG, useValue: config},
                NgxSmartPagesService,
            ],
        };
    }
}

