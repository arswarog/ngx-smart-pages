import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { Page1Component } from './page1/page1.component';
import { RouterModule, Routes } from '@angular/router';
import { NgxSmartPagesModule } from '../../projects/ngx-smart-pages/src/lib/ngx-smart-pages.module';
import { Widget1Component } from './widgets/widget1/widget1.component';
import { Widget2Component } from './widgets/widget2/widget2.component';
import { Widget3Component } from './widgets/widget3/widget3.component';

const routes: Routes = [
    {
        path     : 'page1',
        component: Page1Component,
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
    ],
    imports        : [
        BrowserModule,
        RouterModule.forRoot(routes),
        NgxSmartPagesModule,
    ],
    providers      : [],
    bootstrap      : [
        AppComponent,
    ],
    entryComponents: [
        Widget1Component,
        Widget2Component,
        Widget3Component,
    ],
})
export class AppModule {
}
