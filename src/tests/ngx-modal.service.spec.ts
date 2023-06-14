'use strict';

import { TestBed, inject } from '@angular/core/testing';
import { ComponentFactoryResolver, ApplicationRef, Injector } from '@angular/core';
import { NgxModalServiceFactory } from '../ngx-modal/ngx-modal-service.factory';
import { NgxModalService, NgxModalServiceConfig } from '../ngx-modal/ngx-modal.service';
import { AlertComponent } from './mocks/basic-alert';
import { NgxModalHolderComponentMock } from './mocks/ngx-modal-holder.compoenent.mock';
import { DefaultNgxModalOptionConfig, defaultNgxModalOptions } from '../ngx-modal/ngx-modal-options';


const config: NgxModalServiceConfig = {
  container: document.body
};

describe('NgxModalService', () => {
  let modalService: NgxModalService;
  let createSimpleModalHolderMock;
  let simpleModalHolderComponentMock;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: NgxModalServiceConfig,
          useValue: config
        },
        {
          provide: NgxModalService,
          useFactory: NgxModalServiceFactory,
          deps: [ComponentFactoryResolver, ApplicationRef, Injector, NgxModalServiceConfig]
        },
        {
          provide: DefaultNgxModalOptionConfig,
          useValue: defaultNgxModalOptions
        }
      ]
    });
  });

  beforeEach(inject([NgxModalService], (simpleModalService: NgxModalService) => {
    modalService = simpleModalService;

    // mock the createSimpleModalHolder which generates the holder
    simpleModalHolderComponentMock = NgxModalHolderComponentMock();
    createSimpleModalHolderMock = jest.fn(() => simpleModalHolderComponentMock);
    modalService['createSimpleModalHolder'] = createSimpleModalHolderMock;
  }));


  /**
   * Sanity check - it can be created
   */
  it('should be injected successfully', () => {
    expect(modalService).toBeDefined();
  });

  /**
   * Sanity check - API is as expected
   */
  it('should have a method called addModal', () => {
    expect(typeof modalService.addModal).toBe('function');
  });

  it('should have a method called removeModal', () => {
    expect(typeof modalService.removeModal).toBe('function');
  });

  it('should have a method called removeAll', () => {
    expect(typeof modalService.removeAll).toBe('function');
  });

  it('attempts to generate a "holder" component [only] the first time you add a Modal', () => {
    modalService.addModal(AlertComponent, {title: 'Alert title!'});
    modalService.addModal(AlertComponent, {title: 'Alert2 title!'});

    expect(createSimpleModalHolderMock.mock.calls.length).toBe(1);
  });

  it('should try to remove modal if at least one was added', () => {
    modalService.addModal(AlertComponent, {title: 'Alert title!'});
    modalService.removeModal(<any>{});
    expect(simpleModalHolderComponentMock.addModal.mock.calls.length).toBe(1);
    expect(simpleModalHolderComponentMock.removeModal.mock.calls.length).toBe(1);
  });

  it('should not remove one if none was added', () => {
    modalService.removeModal(<any>{});
    expect(simpleModalHolderComponentMock.addModal.mock.calls.length).toBe(0);
    expect(simpleModalHolderComponentMock.removeModal.mock.calls.length).toBe(0);
  });

  it('should not trigger removals when removeAll is called', () => {
    modalService.removeAll();
    expect(simpleModalHolderComponentMock.removeModal.mock.calls.length).toBe(0);
  });


  it('should trigger removals when addModal is called at least once', () => {
    modalService.addModal(AlertComponent, {title: 'Alert title!'});
    modalService.removeAll();
    expect(simpleModalHolderComponentMock.removeAllModals.mock.calls.length).toBe(1);
  });



});
