import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
export class DebugComponent implements OnInit, OnChanges, ISmartWidget {
    public uuid: string;
    public title: string;

    public data: any = null;

    constructor() { }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log(this);
        this.data = {
            ...this,
        };
        delete this.data.data;
    }
}
