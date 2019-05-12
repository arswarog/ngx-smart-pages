import {
    ChangeDetectorRef,
    Component,
    ComponentFactoryResolver, ComponentRef,
    ElementRef,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges, Type,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { NgxSmartPagesService } from './ngx-smart-pages.service';
import { NgxSmartWidgetComponent } from './widget/widget.component';
import { IPageConfig, IPageWidgetItem, IWidgetConfig } from './ngx-smart-pages.interface';

interface IPrivateWidgetItem extends IPageWidgetItem {
    // originCfg: IWidgetItem;
    data: Observable<any>;
    initialData: any;
    instance: any;
    element: ElementRef;
    changeDetector: ChangeDetectorRef;
    componentRef: any;// ComponentRef<any>;
}

@Component({
    selector : 'ngx-smart-pages',
    template : '<div #items></div>',
    styleUrls: ['ngx-smart-pages.component.css'],
})
export class NgxSmartPagesComponent implements OnInit, OnChanges {
    _widgets: IPrivateWidgetItem[] = [];

    @Input() gap: number = 0;
    @Input() pageConfig: IPageConfig = {widgets: []};
    @Input() columns: string[] = [];
    @Input() baseWidget: Type<NgxSmartWidgetComponent> = NgxSmartWidgetComponent;

    @ViewChild('items') itemsRefHidden: ElementRef<HTMLDivElement>;
    @ViewChild('items', {read: ViewContainerRef}) itemsRef: ViewContainerRef;

    constructor(private grid: ElementRef<HTMLDivElement>,
                private service: NgxSmartPagesService,
                private componentFactoryResolver: ComponentFactoryResolver) {
        if (service.config.baseWidget)
            this.baseWidget = service.config.baseWidget;
    }

    ngOnInit() {
        this.grid.nativeElement.style.display = 'grid';
        this.grid.nativeElement.style.justifyContent = 'stretch';
        this.grid.nativeElement.style.alignItems = 'stretch';
        this.render();
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.itemsRefHidden.nativeElement.style.display = 'none';
        this.update(!!changes['baseWidget']);
    }

    private update(recreate = false) {
        this.service.group('Update layout');
        if (recreate)
            this.clear();

        if (!this.pageConfig || !this.pageConfig.widgets)
            return;

        this.grid.nativeElement.style.gridGap = this.gap + 'px';

        this._widgets = this._widgets.filter(widget => {
            const exists = this.pageConfig.widgets.some(widgetEql(widget));
            if (!exists) {
                this.removeWidget(widget);
            }
            return exists;
        });

        this.pageConfig.widgets.forEach((widget: IPageWidgetItem) => {
            let pWidget = this._widgets.find(widgetEql(widget));
            if (!pWidget) {
                pWidget = this.addWidget(widget);
                this._widgets.push(pWidget);
            }

            if (widget.position !== pWidget.position) {
                this.updateWidgetPosition(pWidget, widget.position);
            }

            this.updateWidgetData(pWidget, widget);
        });
        this.service.groupEnd();
    }

    private clear() {
        this.service.group('Clear layout');
        this._widgets.forEach(widget => this.removeWidget(widget));
        this.itemsRef.clear();
        this.service.groupEnd();
    }

    private render() {
        this.clear();

        this.grid.nativeElement.style.gridTemplateColumns = this.columns.join(' ');

        this._widgets = [];

        this.update();
    }

    private addWidget(widget: IPageWidgetItem): IPrivateWidgetItem {
        this.service.log(`Create widget ${widget.uuid} with type "${widget.widgetID}" at position "${widget.position}"`);

        const component: Type<any> = this.baseWidget;

        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);

        const componentRef = this.itemsRef.createComponent(componentFactory);

        const result: IPrivateWidgetItem = {
            uuid          : widget.uuid,
            title         : widget.title,
            componentRef,
            changeDetector: componentRef.changeDetectorRef,
            widgetID      : widget.widgetID,
            element       : componentRef.location,
            position      : '',
            instance      : componentRef.instance,
            initialData   : widget.data,

            data: null,
        };

        result.instance.widgetID = widget.widgetID;

        return result;
    }

    private removeWidget(widget: IPrivateWidgetItem) {
        this.service.log(`Remove widget ${widget.uuid}`);

        const index: number = this.itemsRef.indexOf(widget.componentRef);

        this.itemsRef.remove(index);

        this._widgets = this._widgets.filter(item => item !== widget);
    }

    private updateWidgetData(widget: IPrivateWidgetItem, data: IPageWidgetItem) {
        this.service.log(`Update widget ${widget.uuid}`);
        widget.instance.uuid = data.uuid;
        widget.instance.title = data.title || '---';
        widget.instance.data = data.data;
        if (typeof widget.instance.ngOnChanges === 'function') {
            widget.instance.ngOnChanges();
        }
    }

    private updateWidgetPosition(widget: IPrivateWidgetItem, position: string) {
        this.service.log(`Update pos on ${widget.uuid} to "${position}"`);
        widget.position = position;
        NgxSmartPagesService.applyPosition(widget.element, widget.position);
    }
}

function widgetEql(widget: IPageWidgetItem) {
    return (item: IPageWidgetItem) => {
        return item.uuid === widget.uuid && item.widgetID === widget.widgetID;
    };
}
