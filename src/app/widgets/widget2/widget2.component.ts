import { Component, OnInit } from '@angular/core';
import { SmartWidget } from '../../../../projects/ngx-smart-pages/src/lib/ngx-smart-pages.service';

@SmartWidget({
    widgetID : 'widget-2',
    fullwidth: true,
})
@Component({
    selector   : 'ngx-widget2',
    templateUrl: './widget2.component.html',
    styleUrls  : ['./widget2.component.scss'],
})
export class Widget2Component implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
