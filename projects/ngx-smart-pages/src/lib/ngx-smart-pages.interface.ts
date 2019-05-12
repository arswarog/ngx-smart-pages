/// Public interfaces

import { EventEmitter, InjectionToken, Type } from '@angular/core';
import { NgxSmartWidgetComponent } from './widget/widget.component';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

export interface IWidgetMeta {
    fullwidth?: boolean;
    // sizes?: IWidgetSize[];
}

/**
 * Configuration for widget component
 */
export interface IWidgetConfig extends IWidgetMeta {
    widgetID: string;
}

/**
 * Configuration for page
 */
export interface IPageConfig {
    uuid?: string;
    widgets: IPageWidgetItem[];
    columns?: string[];
    rows?: string[];
    gap?: number;
}

/**
 * Configuration for widget 192.on page (part of JSON page config)
 */
export interface IPageWidgetItem {
    uuid: string;
    title: string;
    widgetID: string;
    position: string;
    data?: { [key: string]: any };
}

export const NGX_SMART_PAGES_CONFIG = new InjectionToken('ngxSmartPagesConfig');

export enum SmartWidgetStatus {
    Ready = 'ready',
    Loading = 'loading',
    Error = 'error',
}

export interface ISmartWidget {
    uuid: string;
    title: string;
    widgetStatus$: Subject<SmartWidgetStatus>;
    widgetError$?: Observable<ISmartWidgetError>;
}

export interface ISmartWidgetError {
    code?: string | number;
    title: string;
    description: string;
    details?: any;
    fatal?: boolean;
}

/// Inner interfaces

export type IWidgetReducer = (input: IInputToReduce) => IReducerResult;

export interface IInputToReduce {
    widgets: IWidgetPosition[];
    widgetsMeta: IWidgetMeta[];
    width: number;
    columns: string[];
    rows: string[];
    gap: number;
}

export interface IReducerResult {
    columns: string[];
    rows: string[];
    widgets: IWidgetPosition[];
}

export interface IWidgetPosition {
    position: string;
}

export interface ISmartPagesConfig {
    debug?: boolean;
    baseWidget?: Type<NgxSmartWidgetComponent>;
}
