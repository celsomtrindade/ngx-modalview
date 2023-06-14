import {
  Component,
  ComponentFactoryResolver,
  ElementRef,
  OnDestroy,
  Type,
  ViewChild,
  ViewContainerRef, ComponentRef, Injector,
} from '@angular/core';
import { NgxModalComponent } from './ngx-modal.component';

/**
 * The modal backdrop wrapping wrapper to the modal
 */
@Component({
  selector: 'ngx-modal-wrapper',
  template: `
    <div #wrapper [ngClass]="modalClasses" [ngStyle]="{ display: 'block' }" role="dialog">
      <ng-template #viewContainer></ng-template>
    </div>
  `,
})
export class NgxModalWrapperComponent implements OnDestroy {
  /**
   * Target viewContainer to insert modal content component
   */
  @ViewChild('viewContainer', { read: ViewContainerRef, static: true }) viewContainer;

  /**
   * Link wrapper DOM element
   */
  @ViewChild('wrapper', { read: ElementRef, static: true })
  wrapper: ElementRef;

  /**
   * Wrapper modal and fade classes
   */
  modalClasses = 'modal fade-anim';

  /**
   * Dialog content componet
   * @type {NgxModalComponent}
   */
  content: NgxModalComponent<any, any>;

  /**
   * Click outside callback
   */
  clickOutsideCallback: (event: MouseEvent) => void;

  /**
   * Constructor
   * @param {ComponentFactoryResolver} resolver
   */
  constructor(private resolver: ComponentFactoryResolver) {}

  /**
   * Adds content modal component to wrapper
   * @param {Type<NgxModalComponent>} component
   * @return {NgxModalComponent}
   */
  addComponent<T, T1>(component: Type<NgxModalComponent<T, T1>>): {ref: ComponentRef<NgxModalComponent<T, T1>>, component: NgxModalComponent<T, T1>} {
    const factory = this.resolver.resolveComponentFactory(component);
    const injector = Injector.create([], this.viewContainer.injector);
    const componentRef = factory.create(injector);
    this.viewContainer.insert(componentRef.hostView);
    this.content = <NgxModalComponent<T, T1>>componentRef.instance;
    this.content.wrapper = this.wrapper;
    return {ref: componentRef, component: this.content};
  }

  /**
   * Configures the function to call when you click on background of a modal but not the contents
   * @param callback
   */
  onClickOutsideModalContent(callback: () => void) {
    const containerEl = this.wrapper.nativeElement;

    this.clickOutsideCallback = (event: MouseEvent) => {
      if (event.target === containerEl) {
        callback();
      }
    };

    containerEl.addEventListener('click', this.clickOutsideCallback, false);
  }

  ngOnDestroy() {
    if (this.clickOutsideCallback) {
      const containerEl = this.wrapper.nativeElement;
      containerEl.removeEventListener('click', this.clickOutsideCallback, false);
      this.clickOutsideCallback = null;
    }
  }
}
