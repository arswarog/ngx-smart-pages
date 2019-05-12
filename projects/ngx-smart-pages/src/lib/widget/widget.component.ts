import {
    Component,
    ComponentFactoryResolver,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChanges,
    Type,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import { NgxSmartPagesService } from '../ngx-smart-pages.service';
import { ISmartWidget, ISmartWidgetError, SmartWidgetStatus } from '../ngx-smart-pages.interface';
import { BehaviorSubject, Subject } from 'rxjs';
import * as Rx from 'rxjs/operators';

@Component({
    selector : 'ngx-widget',
    template : '<div #widget></div>',
    styleUrls: ['./widget.component.css'],
})
export class NgxSmartWidgetComponent implements OnInit, OnChanges, OnDestroy {

    @Input() uuid: string = null;
    @Input() widgetID: string = null;
    @Input() data: any = null;
    @Input() position: string = null;
    @Input() title: string = null;
    protected instance: ISmartWidget & OnChanges = null;

    protected unsubscriber = new Subject();

    protected error$ = new BehaviorSubject<ISmartWidgetError>(null);

    @ViewChild('widget', {read: ViewContainerRef}) widget: ViewContainerRef;

    constructor(private componentFactoryResolver: ComponentFactoryResolver,
                private smartPages: NgxSmartPagesService) { }

    ngOnInit() {
        if (!this.widget) {
            throw new Error('You need to specify target for widget, use "#widget", for example "<div #widget></div>"');
        }
        this.render();
        if (this.instance.widgetError$)
            this.instance.widgetError$
                .pipe(
                    Rx.takeUntil(this.unsubscriber),
                    Rx.tap(() => this.instance.widgetStatus$.next(SmartWidgetStatus.Error)),
                )
                .subscribe(
                    error => this.error$.next(error),
                );
        this.instance.widgetStatus$
            .pipe(
                Rx.takeUntil(this.unsubscriber),
                Rx.filter(status => status !== SmartWidgetStatus.Error),
            )
            .subscribe(
                status => this.error$.next(null),
            );
        this.afterRender();
        this.update();
    }

    public ngOnChanges(changes: SimpleChanges): void {
        this.update();
    }

    public ngOnDestroy(): void {
        this.unsubscriber.next();
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
            this.afterUpdate();
        }
    }

    /**
     * After render hook
     */
    public afterRender() {

    }

    /**
     * After update hook
     */
    public afterUpdate() {

    }
}
