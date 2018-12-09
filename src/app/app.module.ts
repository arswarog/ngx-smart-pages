import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { Page1Component } from './page1/page1.component';
import { RouterModule, Routes } from '@angular/router';
import { NgxSmartPagesModule } from 'ngx-smart-pages';
import { Widget1Component } from './widgets/widget1/widget1.component';
import { Widget2Component } from './widgets/widget2/widget2.component';
import { Widget3Component } from './widgets/widget3/widget3.component';
import { CustomBaseWidgetComponent } from './custom-base-widget/custom-base-widget.component';
import { BaseComponent } from './custom-base-widget/base/base.component';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
    {
        path     : 'page1',
        component: Page1Component,
    },
    {
        path     : 'custom',
        component: CustomBaseWidgetComponent,
    },
    {
        path      : '**',
        redirectTo: 'page1',
    },
];

@NgModule({
    declarations   : [
        AppComponent,
        Page1Component,
        Widget1Component,
        Widget2Component,
        Widget3Component,
        CustomBaseWidgetComponent,
        BaseComponent,
    ],
    imports        : [
        BrowserModule,
        RouterModule.forRoot(routes),
        NgxSmartPagesModule.forRoot({debug: true}),
        HttpClientModule,
    ],
    providers      : [],
    bootstrap      : [
        AppComponent,
    ],
    entryComponents: [
        Widget1Component,
        Widget2Component,
        Widget3Component,
        BaseComponent,
    ],
})
export class AppModule {
}
