import { Component, OnInit } from '@angular/core';
import { SmartWidget } from 'ngx-smart-pages';

@SmartWidget({
    widgetID: 'widget-3',
})
@Component({
  selector: 'ngx-widget3',
  templateUrl: './widget3.component.html',
  styleUrls: ['./widget3.component.scss']
})
export class Widget3Component implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
