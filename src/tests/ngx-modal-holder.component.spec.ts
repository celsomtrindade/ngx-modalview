'use strict';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { setTimeout } from 'timers';
import { NgxModalHolderComponent } from '../ngx-modal/ngx-modal-holder.component';
import { DefaultNgxModalOptionConfig, defaultNgxModalOptions } from '../ngx-modal/ngx-modal-options';
import { NgxModalWrapperComponent } from '../ngx-modal/ngx-modal-wrapper.component';
import { NgxModalServiceConfig } from '../ngx-modal/ngx-modal.service';
import { AlertComponent } from './mocks/basic-alert';

@NgModule({
  imports: [CommonModule],
  declarations: [AlertComponent, NgxModalWrapperComponent],
})
export class FakeTestAlertModule {}

describe('SimpleModalHolder', () => {
  let component: NgxModalHolderComponent;
  let fixture: ComponentFixture<NgxModalHolderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FakeTestAlertModule],
      declarations: [NgxModalHolderComponent],
      providers: [
        {
          provide: DefaultNgxModalOptionConfig,
          useValue: defaultNgxModalOptions
        }
      ]
    });

    // create component and test fixture
    fixture = TestBed.createComponent(NgxModalHolderComponent);

    // get test component from the fixture
    component = fixture.componentInstance;
  });

  /**
   * Sanity check - it can be created
   */
  it('should be injected successfully', () => {
    expect(component).toBeDefined();
  });

  /**
   * Sanity check - API is as expected
   */
  it('should have a method called addModal', () => {
    expect(typeof component.addModal).toBe('function');
  });

  it('should have a method called removeModal', () => {
    expect(typeof component.removeModal).toBe('function');
  });

  it('should have a method called removeAllModals', () => {
    expect(typeof component.removeAllModals).toBe('function');
  });

  /**
   * Function tests
   */
  it('should add a modal to the modals array when adding', () => {
    expect(component.modals).toHaveLength(0);
    component.addModal(AlertComponent, { title: 'Alert title!' });
    expect(component.modals).toHaveLength(1);
  });

  it('should remove a modal to the modals array when removing', () => {
    expect.assertions(1);
    component.addModal(AlertComponent, { title: 'Alert title!' });
    const modal = component.modals[0];
    return component.removeModal(modal).then(() => {
      expect(component.modals).toHaveLength(0);
    });
  });

  it('should remove a modal to the modals array when removing', () => {
    expect.assertions(1);
    component.addModal(AlertComponent, { title: 'Alert title!' });
    const modal = component.modals[0];
    return component.removeModal(modal).then(() => {
      expect(component.modals).toHaveLength(0);
    });
  });

  it('should remove all modals when asked', () => {
    expect.assertions(2);
    component.addModal(AlertComponent, { title: 'Alert title1!' });
    component.addModal(AlertComponent, { title: 'Alert title2' });
    component.addModal(AlertComponent, { title: 'Alert title3!' });
    component.addModal(AlertComponent, { title: 'Alert title4' });
    expect(component.modals.length).toBe(4);
    return component.removeAllModals().then(() => {
      expect(component.modals).toHaveLength(0);
    });
  });

  it('should add a class to the body when a modal is added', () => {
    expect.assertions(1);
    component.addModal(
      AlertComponent,
      { title: 'Alert title!' },
      { animationDuration: 1 }
    );
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        expect(document.body.classList.contains('modal-open')).toBeTruthy();
        resolve(1);
      }, 2);
    });
  });

  it('should not remove class id modals are still showing ', () => {
    expect.assertions(1);
    component.addModal(AlertComponent, { title: 'Alert title!' });
    component.addModal(AlertComponent, { title: 'Alert title2!' });
    const modal = component.modals[1];
    return component.removeModal(modal).then(() => {
      expect(document.body.classList.contains('modal-open')).toBeTruthy();
    });
  });

  it('should remove class if removing last modal ', () => {
    expect.assertions(1);
    component.addModal(AlertComponent, { title: 'Alert title!' });
    const modal = component.modals[0];
    return component.removeModal(modal).then(() => {
      expect(document.body.classList.contains('modal-open')).toBeFalsy();
    });
  });
});
