import { ComponentRef, ElementRef, Injectable } from '@angular/core';
import { IWidgetConfig, IWidgetItem } from './ngx-smart-pages.interface';
import { Observable } from 'rxjs';

interface IPosition {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface IPrivateWidgetConfig extends IWidgetItem {
  component: any;
  componentRef: ComponentRef<any>;
}

@Injectable({
  providedIn: 'root',
})
export class NgxSmartPagesService {
  static availableWidgets: {
    [key: string]: IPrivateWidgetConfig;
  } = {};

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

  constructor() { }
}

export function SmartWidget(config: IWidgetConfig) {
  return (component: any) => {
    if (config.widgetID in NgxSmartPagesService.availableWidgets) {
      throw new Error(`Dashboard widget with "${config.widgetID}" already exists`);
    }

    NgxSmartPagesService.availableWidgets[config.widgetID] = Object.assign({
      source  : '',
      position: '',
    }, {
      ...config,
      component,
      componentRef: null,
    });

    return component;
  };
}
