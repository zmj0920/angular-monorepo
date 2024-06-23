

import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'ng-formly-field-password',
  template: `
    <div class="app-formly-field-password">
      <input nz-input [formlyAttributes]="field" [type]="passwordType" placeholder="{{ (to.placeholder || '') | translate }}"
      autocomplete="new-password" readonly (focus)="removeReadonly($event)"
      [formControl]="formControl">
      <span class="password-eye" (click)="changePasswordType()">
        <ng-icon *ngIf="passwordType==='password'" [color]="'#CCCCCC'" [type]="'eye-invisible'" [size]="'12px'"></ng-icon>
        <ng-icon *ngIf="passwordType==='text'" [color]="'#CCCCCC'" [type]="'eye'" [size]="'12px'"></ng-icon>
      </span>
    </div>
  `,
  styles: [
    `::ng-deep .app-formly-field-password > .ant-form-item-control {
      line-height: 1;
    }
    .app-formly-field-password input {
      padding-right: 27px;
    }
    .password-eye {
      position: absolute;
      width: 12px;
      height: 10px;
      right: 10px;
      z-index: 100;
      cursor: pointer;
      top: 8px;
    }`
  ]
})
export class FormlyFieldPasswordComponent extends FieldType {
  passwordType = 'password';

  removeReadonly(event: any) {
    if (!this.field.templateOptions!.readonly) {
      event.target.readOnly = false;
    }
  }

  changePasswordType() {
    this.passwordType = this.passwordType === 'text'
      ? 'password'
      : 'text';
  }
}
