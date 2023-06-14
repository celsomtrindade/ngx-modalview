import { InjectionToken } from '@angular/core';

export const DefaultNgxModalOptionConfig = new InjectionToken<NgxModalOptions>('default-ngx-modal.config');

export interface NgxModalOptions {
  closeOnEscape: boolean;
  closeOnClickOutside: boolean;
  bodyClass: string;
  wrapperDefaultClasses: string;
  wrapperClass: string;
  draggableClass: string;
  animationDuration: number;
  autoFocus: boolean;
  draggable: boolean;
}

export type NgxModalOptionsOverrides = Partial<NgxModalOptions>;

export const defaultNgxModalOptions: NgxModalOptions = {
  closeOnEscape: false,
  closeOnClickOutside: false,
  bodyClass: 'modal-open',
  wrapperDefaultClasses: 'modal fade-anim',
  wrapperClass: 'in',
  draggableClass: 'draggable',
  animationDuration: 300,
  autoFocus: false,
  draggable: false,
};
