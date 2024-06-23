

import { Component, OnInit } from '@angular/core';

import { NgFieldCheckboxType } from '../ng-field.type';

@Component({
  selector: 'ng-formly-field-checkbox',
  template: `
    <div class="app-formly-field-checkbox">
      <label nz-checkbox [formlyAttributes]="field" [formControl]="formControl">
        <span>
          {{ (to.label || '') | translate }}
          <ng-container *ngIf="to.required && to.hideRequiredMarker !== true">*</ng-container>
        </span>
        <span class="custom-control-indicator"></span>
      </label>
    </div>
  `,
  styles: [
    `::ng-deep .app-formly-field-checkbox .ant-form-item-control {
      line-height: 18px;
    }`
  ]
})
export class FormlyFieldCheckboxComponent extends NgFieldCheckboxType implements OnInit {
  ngOnInit() {
    setTimeout(() => {
      if (this.to.arrangement === 'transverse') {
        this.to.formlyLabelStyle = this.to.formlyLabelStyle || {lineHeight: '18px'};
      }
    });
  }
}
