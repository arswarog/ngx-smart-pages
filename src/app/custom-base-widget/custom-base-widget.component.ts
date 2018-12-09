import { Component, OnInit } from '@angular/core';
import { BaseComponent } from './base/base.component';
import { IPageConfig } from 'ngx-smart-pages';
import { HttpClient } from '@angular/common/http';
import { delay, map } from 'rxjs/operators';

@Component({
    selector   : 'app-custom-base-widget',
    templateUrl: './custom-base-widget.component.html',
    styleUrls  : ['./custom-base-widget.component.scss'],
})
export class CustomBaseWidgetComponent implements OnInit {
    page: IPageConfig = {widgets: []};

    base = BaseComponent;

    constructor(private http: HttpClient) { }

    ngOnInit() {
        this.load('custom');
    }

    load(name: string) {
        console.log('load ' + name);
        if (name === 'clean') {
            this.page = {widgets: []};
        } else {
            this.http.get(`/assets/pages/${name}.json`)
                .pipe(
                    map(data => data as IPageConfig),
                    delay(500),
                )
                .subscribe(
                    page => this.page = page,
                );
        }
    }
}
