import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { NgxSmartWidgetComponent, NgxSmartPagesService } from 'ngx-smart-pages';

@Component({
    selector   : 'app-base-component',
    templateUrl: './base.component.html',
    styleUrls  : ['./base.component.scss'],
})
export class BaseComponent extends NgxSmartWidgetComponent {
    @Input() title: string = null;

    // @ViewChild('widget', {read: ViewContainerRef}) widget: ViewContainerRef;

    constructor(componentFactoryResolver: ComponentFactoryResolver, smartPages: NgxSmartPagesService) {
        super(componentFactoryResolver, smartPages);
    }
}
