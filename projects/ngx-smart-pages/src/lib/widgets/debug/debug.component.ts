import { Component, OnInit } from '@angular/core';
import { SmartWidget } from '../../ngx-smart-pages.service';
import { ISmartWidget } from '../../ngx-smart-pages.interface';

@SmartWidget({
    widgetID: 'debug',
})
@Component({
    selector   : 'ngx-debug',
    templateUrl: './debug.component.html',
    styleUrls  : ['./debug.component.css'],
})
export class DebugComponent implements OnInit, ISmartWidget {
    public uuid: string;
    public title: string;

    // data = this;

    constructor() { }

    ngOnInit() {
    }

}
