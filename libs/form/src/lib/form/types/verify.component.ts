

import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'ng-formly-field-verify',
  template: `
    <div class="app-formly-field-verify">
      <button nz-button nzType="primary" [nzLoading]="to.loading"
      [disabled]="to.btnDisabled" (click)="to.verifyData()">{{to.btnName | translate}}</button>
      <span class="verify-result">
        <ng-icon *ngIf="to.verifyStatus === 'success'" [color]="'#52C51B'" [type]="'check-circle'" [size]="'12px'"></ng-icon>
        <ng-icon *ngIf="to.verifyStatus === 'error'" [color]="'#EE6B63'" [type]="'close-circle'" [size]="'12px'"></ng-icon>
      </span>
      <span>{{to.verifyResult | translate:to.param}}</span>
    </div>
  `,
  styles: [
    `::ng-deep .app-formly-field-verify .ant-form-item-control {
      line-height: 1;
    }
    .verify-result {
      width: 12px;
      height: 12px;
      display: inline-block;
      margin-bottom: -1px;
      margin-right: 4px;
      margin-left: 16px;
    }`
  ]
})
export class FormlyFieldVerifyComponent extends FieldType {
}
