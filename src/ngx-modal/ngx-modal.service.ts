import { ApplicationRef, ComponentFactoryResolver, EmbeddedViewRef, Injectable, Injector, Optional, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { NgxModalHolderComponent } from './ngx-modal-holder.component';
import { NgxModalComponent } from './ngx-modal.component';
import { NgxModalOptionsOverrides } from './ngx-modal-options';

export class NgxModalServiceConfig {
  container: HTMLElement | string = null;
}

@Injectable()
export class NgxModalService {
  /**
   * Placeholder of modals
   * @type {NgxModalHolderComponent}
   */
  private modalHolderComponent: NgxModalHolderComponent;

  /**
   * HTML container for modals
   * type {HTMLElement | string}
   */
  private _container;

  constructor(
    private resolver: ComponentFactoryResolver,
    private applicationRef: ApplicationRef,
    private injector: Injector,
    @Optional() config: NgxModalServiceConfig
  ) {
    if (config) {
      this.container = config.container as any;
    }
  }

  /**
   * Accessor for contain - will auto generate from string
   * if needed or default to the root element if nothing was set
   */
  private set container(c) {
    this._container = c;
  }

  private get container(): HTMLElement {
    if (typeof this._container === 'string') {
      this._container = document.getElementById(this._container);
    }

    if (!this._container && this.applicationRef['components'].length) {
      const componentRootViewContainer = this.applicationRef['components'][0];
      this.container = (componentRootViewContainer.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    }

    if (!this._container || typeof this._container === 'string') {
      this._container = document.getElementsByTagName('body')[0];
    }

    return this._container;
  }

  /**
   * Creates and add to DOM modal holder component.
   * 
   * @returns {NgxModalHolderComponent}
   */
  private createSimpleModalHolder(): NgxModalHolderComponent {
    const componentFactory = this.resolver.resolveComponentFactory(NgxModalHolderComponent);
    const componentRef = componentFactory.create(this.injector);
    const componentRootNode = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

    this.applicationRef.attachView(componentRef.hostView);

    componentRef.onDestroy(() => {
      this.applicationRef.detachView(componentRef.hostView);
    });

    this.container.appendChild(componentRootNode);

    return componentRef.instance;
  }

  /**
   * Adds modal
   *
   * @param {Type<NgxModalComponent<T, T1>>} component
   * @param {T?} data
   * @param {NgxModalOptionsOverrides?} options
   *
   * @returns {Observable<T1>}
   */
  public addModal<T, T1>(
    component: Type<NgxModalComponent<T, T1>>,
    data?: T,
    options?: NgxModalOptionsOverrides
  ): Observable<T1> {
    if (!this.modalHolderComponent) {
      this.modalHolderComponent = this.createSimpleModalHolder();
    }
    return this.modalHolderComponent.addModal<T, T1>(component, data, options);
  }

  /**
   * Hides and removes modal from DOM, resolves promise when fully removed
   *
   * @param {NgxModalComponent} component
   *
   * @returns {Promise<{}>}
   */
  public removeModal(component: NgxModalComponent<any, any>): Promise<{}> {
    if (!this.modalHolderComponent) {
      return Promise.resolve({});
    }
    return this.modalHolderComponent.removeModal(component);
  }

  /**
   * Closes all modals, resolves promise when they're fully removed
   *
   * @returns {Promise<{}>}
   */
  public removeAll(): Promise<{}> {
    if (!this.modalHolderComponent) {
      return Promise.resolve({});
    }
    return this.modalHolderComponent.removeAllModals();
  }
}
