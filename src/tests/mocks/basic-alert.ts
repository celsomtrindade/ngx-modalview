import { Component } from '@angular/core';
import { NgxModalComponent } from '../../ngx-modal/ngx-modal.component';

export interface AlertModel {
  title: string;
}

@Component({
  selector: 'alert',
  template: `<div class="modal-dialog">{{title}}</div>`,
})
export class AlertComponent extends NgxModalComponent<AlertModel, null> implements AlertModel {
  title: string;
  constructor() {
    super();
  }
}
