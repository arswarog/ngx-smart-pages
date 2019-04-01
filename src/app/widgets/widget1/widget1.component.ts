import { Component, OnInit } from '@angular/core';
import { SmartWidget } from '../../../../projects/ngx-smart-pages/src/lib/ngx-smart-pages.service';

@SmartWidget({
    widgetID: 'widget-1',
})
@Component({
    selector   : 'app-widget1',
    templateUrl: './widget1.component.html',
    styleUrls  : ['./widget1.component.scss'],
})
export class Widget1Component implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
