import { Component, OnInit } from '@angular/core';
import { IPageConfig } from 'ngx-smart-pages';

@Component({
    selector   : 'app-page1',
    templateUrl: './page1.component.html',
    styleUrls  : ['./page1.component.scss'],
})
export class Page1Component implements OnInit {

    page: IPageConfig = {
        widgets: [
            {
                'widgetID': 'widget-1',
                'uuid'  : 'history0',
                'title'  : 'history0',
                'position': '1/1/1/1',
                'data'    : {
                    'image'     : 'https://avatars.mds.yandex.net/get-pdb/1691218/7aa84b52-bb2c-4ddb-be85-0915cb5cbfaf/orig',
                },
            },
            {
                'widgetID': 'widget-1',
                'uuid'  : 'history1',
                'title'  : 'history1',
                'position': '1/2/1/1',
                'data'    : {
                    'image'     : 'https://c.pxhere.com/photos/48/a8/cocker_spaniel_dog_cocker_spaniel_brown_pet-985891.jpg!d',
                },
            },
            {
                'widgetID': 'widget-1',
                'uuid'  : 'history2',
                'title'  : 'history2',
                'position': '1/3/1/1',
                'data'    : {
                    'title': 'Trader Profit',
                    'color': 'inactive',
                },
            },
            {
                'widgetID': 'widget-2',
                'uuid'  : 'history3',
                'title'  : 'history3',
                'position': '2/1/2/3',
            },
            {
                'widgetID': 'widget-3',
                'uuid'  : 'table',
                'title'  : 'table',
                'position': '1/4/2/1',
                'data'    : {
                    'title': 'Last analytics doing',
                },
            },
            {
                'widgetID': 'widget-3',
                'uuid'  : 'table',
                'title'  : 'table',
                'position': '1/5/2/1',
                'data'    : {
                    'title': 'Last analytics doing',
                },
            },
            {
                'widgetID': 'widget-3',
                'uuid'  : 'balance',
                'title'  : 'balance',
                'position': '3/4/1/1',
                'data'    : {
                    'title': 'CryptoBank balance',
                },
            },
            {
                'widgetID': 'widget-2',
                'uuid'  : 'quick-list',
                'title'  : 'quick-list',
                'position': '3/5/1/1',
                'data'    : {
                    'title': 'Quick Details',
                },
            },
        ],
    };

    constructor() { }

    ngOnInit() {
    }

}
