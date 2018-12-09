/// Public interfaces

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

export interface ISmartWidget {
    uuid: string;
    title: string;
}

export interface ISmartPagesConfig {
    debug?: boolean;
}
