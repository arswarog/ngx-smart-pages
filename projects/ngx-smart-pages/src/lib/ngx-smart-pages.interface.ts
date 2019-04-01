export interface IWidgetItem extends IWidgetConfig {
  widgetID: string;
  source: string;
  data?: any;
  position: string;
}

export interface IWidgetConfig {
  widgetID: string;
  fullwidth?: boolean;
}
