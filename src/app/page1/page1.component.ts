import { Component, OnInit } from '@angular/core';

@Component({
  selector   : 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls  : ['./page1.component.scss'],
})
export class Page1Component implements OnInit {

  widgets = [
    {
      'widgetID': 'widget-1',
      'source'  : 'history0',
      'position': '1/1/1/1',
      'data'    : {
        'title'     : 'My Targets',
        'color'     : 'default',
        'value'     : 246125,
        'currency'  : '$',
        'lastChange': 0.138,
      },
    },
    {
      'widgetID': 'widget-1',
      'source'  : 'history1',
      'position': '1/2/1/1',
      'data'    : {
        'title': 'Total Profit',
        'color': 'active',
      },
    },
    {
      'widgetID': 'widget-1',
      'source'  : 'history2',
      'position': '1/3/1/1',
      'data'    : {
        'title': 'Trader Profit',
        'color': 'inactive',
      },
    },
    {
      'widgetID': 'widget-2',
      'source'  : 'history3',
      'position': '2/1/2/3',
    },
    {
      'widgetID': 'widget-3',
      'source'  : 'table',
      'position': '1/4/2/1',
      'data'    : {
        'title': 'Last analytics doing',
      },
    },
    {
      'widgetID': 'widget-3',
      'source'  : 'table',
      'position': '1/5/2/1',
      'data'    : {
        'title': 'Last analytics doing',
      },
    },
    {
      'widgetID': 'widget-3',
      'source'  : 'balance',
      'position': '3/4/1/1',
      'data'    : {
        'title': 'CryptoBank balance',
      },
    },
    {
      'widgetID': 'widget-2',
      'source'  : 'quick-list',
      'position': '3/5/1/1',
      'data'    : {
        'title': 'Quick Details',
      },
    },
  ];

  data: any = {};

  constructor() { }

  ngOnInit() {
  }

}
