import {
    ChangeDetectorRef,
    Component,
    ComponentFactoryResolver,
    ElementRef,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges, Type,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import { IWidgetItem } from './ngx-smart-pages.interface';
import { Observable, Subscription } from 'rxjs';
import { NgxSmartPagesService } from './ngx-smart-pages.service';

interface IPrivateWidgetItem extends IWidgetItem {
    // originCfg: IWidgetItem;
    data: Observable<any>;
    initialData: any;
    subscription: Subscription;
    instance: any;
    element: ElementRef;
    changeDetector: ChangeDetectorRef;
}

@Component({
    selector: 'ngx-smart-pages',
    template: '<div #items></div><pre>{{columns}}</pre>',
    styles  : [],
})
export class NgxSmartPagesComponent implements OnInit, OnChanges {
    _widgets: IPrivateWidgetItem[] = [];

    @Input() widgets: IWidgetItem[] = [];
    @Input() data: { [key: string]: Observable<any> } = {};

    @Input() columns: string[] = [];

    @ViewChild('items') itemsRefHidden: ElementRef<HTMLDivElement>;
    @ViewChild('items', {read: ViewContainerRef}) itemsRef: ViewContainerRef;

    constructor(private grid: ElementRef<HTMLDivElement>,
                private componentFactoryResolver: ComponentFactoryResolver) { }

    ngOnInit() {
        this.render();
        this.grid.nativeElement.style.display = 'grid';
        this.grid.nativeElement.style.justifyContent = 'stretch';
        this.grid.nativeElement.style.alignItems = 'stretch';
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.itemsRefHidden.nativeElement.style.display = 'none';
        this.update();
    }

    private loadConfig(config: any) {
        if (config.columns) {
            this.columns = config.columns;
        }
    }

    private update() {
        this.widgets.forEach((widget: IWidgetItem, index) => {
            if (widget.widgetID === '_config_') {
                return this.loadConfig(widget);
            }

            let pWidget = this._widgets[index];
            if (!pWidget) {
                pWidget = this._widgets[index] = this.addWidget(widget);
            }

            if (pWidget.widgetID !== widget.widgetID) {
                this.removeWidget(pWidget);
                pWidget = this._widgets[index] = this.addWidget(widget);
            }

            if (pWidget.source !== widget.source ||
                pWidget.position !== widget.position) {

                pWidget.source = widget.source;
                pWidget.position = widget.position;

                this.updateWidget(pWidget);
            }

            if (pWidget.initialData !== widget.data) {
                pWidget.initialData = widget.data;

                this.updateWidgetData(pWidget, widget.data);
            }
        });
    }

    private render() {
        this.itemsRef.clear();

        this.grid.nativeElement.style.gridTemplateColumns = this.columns.join(' ');

        this._widgets = [];

        this.update();
    }

    private addWidget(widget: IWidgetItem): IPrivateWidgetItem {
        const prepared = NgxSmartPagesService.availableWidgets[widget.widgetID];

        if (!prepared) {
            throw new Error(`Widget "${widget.widgetID}" not defined`);
        }

        const component: Type<any> = prepared.component;

        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);

        const componentRef = this.itemsRef.createComponent(componentFactory);

        prepared.componentRef = componentRef;

        Object.assign(componentRef.instance, prepared.data);

        const result: IPrivateWidgetItem = {
            changeDetector: componentRef.changeDetectorRef,
            widgetID      : widget.widgetID,
            element       : componentRef.location,
            position      : '',
            source        : widget.source,
            instance      : componentRef.instance,
            initialData   : widget.data,

            data        : null,
            subscription: null,
        };

        this.updateWidget(result);
        this.updateWidgetData(result, widget.data);

        return result;
    }

    private removeWidget(widget: IPrivateWidgetItem) {
        if (widget.subscription) {
            widget.subscription.unsubscribe();
        }
    }

    private updateWidgetData(widget: IPrivateWidgetItem, data: any) {
        Object.assign(widget.instance, data);
        // widget.changeDetector.detectChanges();
        // widget.changeDetector.markForCheck();
        // widget.changeDetector.checkNoChanges();
        if (typeof widget.instance.ngOnChanges === 'function') {
            widget.instance.ngOnChanges();
        }
    }

    private updateWidget(widget: IPrivateWidgetItem) {
        if (this.data[widget.source]) {
            if (widget.subscription) {
                widget.subscription.unsubscribe();
            }
            widget.data = this.data[widget.source];
            widget.subscription = widget.data.subscribe(update => this.updateWidgetData(widget, update));
        }

        NgxSmartPagesService.applyPosition(widget.element, widget.position);
    }
}
