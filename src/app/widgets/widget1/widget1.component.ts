import { Component, OnInit } from '@angular/core';
import { SmartWidget } from 'ngx-smart-pages';

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
