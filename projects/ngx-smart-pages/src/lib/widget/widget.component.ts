import {
    Component,
    ComponentFactoryResolver,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
    Type,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import { NgxSmartPagesService } from '../ngx-smart-pages.service';

@Component({
    selector : 'ngx-widget',
    template : '<div #widget></div>',
    styleUrls: ['./widget.component.css'],
})
export class NgxSmartWidgetComponent implements OnInit, OnChanges {

    @Input() uuid: string = null;
    @Input() widgetID: string = null;
    @Input() data: any = null;
    @Input() position: string = null;
    @Input() title: string = null;
    private instance: OnChanges = null;

    @ViewChild('widget', {read: ViewContainerRef}) widget: ViewContainerRef;

    constructor(private componentFactoryResolver: ComponentFactoryResolver,
                private smartPages: NgxSmartPagesService) { }

    ngOnInit() {
        if (!this.widget) {
            throw new Error('You need to specify target for widget, use "#widget", for example "<div #widget></div>"');
        }
        this.render();
    }

    public ngOnChanges(changes: SimpleChanges): void {
        this.update();
    }

    public render() {
        const prepared = this.smartPages.getWidget(this.widgetID);
        if (!prepared) {
            return console.error(`Can not init widget "${this.widgetID}" because widget not found`);
        }

        this.widget.clear();

        const component: Type<any> = prepared.component;

        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);

        const componentRef = this.widget.createComponent(componentFactory);

        this.instance = componentRef.instance;

        this.update();
    }

    private update() {
        if (this.instance) {
            Object.assign(this.instance,
                this.data,
                {
                    uuid : this.uuid,
                    title: this.title,
                },
            );
            if ('ngOnChanges' in this.instance)
                this.instance.ngOnChanges({});
        }
    }
}
