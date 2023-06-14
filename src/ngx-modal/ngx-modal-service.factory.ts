import { ApplicationRef, ComponentFactoryResolver, Injector } from '@angular/core';
import { NgxModalService, NgxModalServiceConfig } from './ngx-modal.service';

/**
 * Modal service factory. Creates modal service with options
 * @param { ComponentFactoryResolver } resolver
 * @param { ApplicationRef } applicationRef
 * @param { Injector } injector
 * @param { NgxModalServiceConfig } options
 * @return { NgxModalService }
 */
export function NgxModalServiceFactory(
  resolver: ComponentFactoryResolver,
  applicationRef: ApplicationRef,
  injector: Injector,
  options: NgxModalServiceConfig
): NgxModalService {
  return new NgxModalService(resolver, applicationRef, injector, options);
}
