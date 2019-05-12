import { ElementRef, Inject, Injectable } from '@angular/core';
import { IInputToReduce, IReducerResult, ISmartPagesConfig, IWidgetConfig, NGX_SMART_PAGES_CONFIG } from './ngx-smart-pages.interface';
import { none } from './reducers/none';

interface IPosition {
    x: number;
    y: number;
    w: number;
    h: number;
}

interface IPrivateWidgetConfig extends IWidgetConfig {
    component: any;
}

const availableWidgets: {
    [key: string]: IPrivateWidgetConfig;
} = {};

@Injectable({
    providedIn: 'root',
})
export class NgxSmartPagesService {
    private logGroupStarted = 0;

    static decodePosition(str: string): IPosition {
        if (typeof str !== 'string') {
            str = '';
        }

        const data = str.split('/')
            .map(i => +i);

        return {
            x: data[0] || 1,
            y: data[1] || 1,
            w: data[2] || 1,
            h: data[3] || 1,
        };
    }

    static applyPosition(target: ElementRef<HTMLDivElement>, position: string): void {
        const pos = NgxSmartPagesService.decodePosition(position);
        target.nativeElement.style.gridArea = [
            pos.y,
            pos.x,
            pos.y + pos.h,
            pos.x + pos.w,
        ].join('/');

        if (window.matchMedia('(min-width: 400px)').matches) {
            target.nativeElement.style['-ms-grid-row'] = pos.y;
            target.nativeElement.style['-ms-grid-row-span'] = pos.h;
            target.nativeElement.style['-ms-grid-col'] = pos.x;
            target.nativeElement.style['-ms-grid-col-span'] = pos.w;
        }
    }

    static encodePosition(pos: IPosition): string {
        return [
            pos.x,
            pos.y,
            pos.w,
            pos.h,
        ].join('/');
    }

    constructor(@Inject(NGX_SMART_PAGES_CONFIG) public config: ISmartPagesConfig) {
        this.group('Start service');
        this.log('Config:', config);
        this.log('Available widgets:', availableWidgets);
        this.groupEnd();
    }

    public reduceWidgets(input: IInputToReduce): IReducerResult {
        return none(input);
    }

    public getWidget(widgetID: string): any {
        return availableWidgets[widgetID];
    }

    public group(...rest: any[]) {
        if (this.config.debug) {
            console.groupCollapsed(...this.logGroupStarted ? [] : ['NgxSmartPages'], ...rest);
        }
        this.logGroupStarted++;
    }

    public groupEnd() {
        this.logGroupStarted--;
        if (this.config.debug) {
            console.groupEnd();
        }
    }

    public log(...rest: any[]) {
        if (this.config.debug) {
            console.log(this.logGroupStarted ? '' : 'NgxSmartPages', ...rest);
        }
    }
}

export function SmartWidget(config: IWidgetConfig) {
    return (component: any) => {
        if (config.widgetID in availableWidgets) {
            throw new Error(`Dashboard widget with "${config.widgetID}" already exists`);
        }

        availableWidgets[config.widgetID] = Object.assign({
            source  : '',
            position: '',
        }, {
            ...config,
            component,
        });

        return component;
    };
}
