import { CommonModule } from '@angular/common';
import { ApplicationRef, ComponentFactoryResolver, Injector, ModuleWithProviders, NgModule } from '@angular/core';
import { NgxModalHolderComponent } from './ngx-modal-holder.component';
import { NgxModalWrapperComponent } from './ngx-modal-wrapper.component';
import { NgxModalService, NgxModalServiceConfig } from './ngx-modal.service';
import { NgxModalServiceFactory } from './ngx-modal-service.factory';
import { defaultNgxModalOptions, DefaultNgxModalOptionConfig, NgxModalOptions } from './ngx-modal-options';
import { DraggableDirective } from './ngx-modal-draggable.directive';

@NgModule({
  declarations: [NgxModalHolderComponent, NgxModalWrapperComponent, DraggableDirective],
  providers: [
    NgxModalService,
    {
      provide: DefaultNgxModalOptionConfig,
      useValue: defaultNgxModalOptions,
    },
  ],
  imports: [CommonModule],
})
export class NgxModalView {
  static forRoot(
    config: NgxModalServiceConfig,
    defaultModalOptions?: NgxModalOptions
  ): ModuleWithProviders<NgxModalView> {
    return {
      ngModule: NgxModalView,
      providers: [
        { provide: NgxModalServiceConfig, useValue: config },
        {
          provide: NgxModalService,
          useFactory: NgxModalServiceFactory,
          deps: [ComponentFactoryResolver, ApplicationRef, Injector, NgxModalServiceConfig],
        },
        {
          provide: DefaultNgxModalOptionConfig,
          useValue: defaultModalOptions || defaultNgxModalOptions,
        }
      ],
    };
  }

  constructor() { }
}
