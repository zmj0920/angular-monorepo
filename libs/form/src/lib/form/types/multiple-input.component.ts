

import { Component, OnInit } from '@angular/core';
import { FieldArrayType } from '@ngx-formly/core';

@Component({
  selector: 'ng-formly-field-multiple-input',
  template: `
    <div class="app-formly-field-repeat">
      <div *ngFor="let field of field.fieldGroup; let i = index;" class="field-repeat">
        <formly-field class="fixed-width" [field]="field"></formly-field>
        <button nz-button nzType="primary" class="custom-btn" (click)="addItem()" *ngIf="i===0"
          [disabled]="to.limit && to.limit <= count">
          <i nz-icon nzType="plus" theme="outline"></i>
        </button>
        <button nz-button nzType="primary" class="custom-btn" (click)="remove(i)" *ngIf="i!==0">
          <i nz-icon nzType="minus" theme="outline"></i>
        </button>
      </div>
    </div>
  `,
  styles: [
    `::ng-deep .fixed-width .app-formly-field-input {
      width: 400px;
    }
    .custom-btn {
      width: 24px;
      height: 24px;
      padding: 0 !important;
      font-size: initial;
      line-height: 23px;
      position: absolute;
      top: 4px;
      left: 408px;
    }
    .field-repeat {
      position: relative;
    }
    ::ng-deep .app-formly-field-repeat .formly-item {
      margin-bottom: 6px;
    }
    ::ng-deep .app-formly-field-repeat .field-repeat:nth-last-child(1) .formly-item {
      margin-bottom: 24px;
    }
    ::ng-deep .app-formly-field-repeat .field-repeat:nth-last-child(1) .formly-invalid {
      margin-bottom: 6px !important;
    }
    `
  ]
})
export class FormlyFieldMultipleInputComponent extends FieldArrayType implements OnInit {

  get count(): number {
    return this.field.fieldGroup?.length || 0;
  }

  addItem(): void {
    this.add();
    if (this.field.fieldGroup?.length) {
      const item = this.field.fieldGroup[this.field.fieldGroup.length - 1];
      item.formControl!.markAsPristine();
    }
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.add();
      if (this.field.fieldGroup?.length) {
        const item = this.field.fieldGroup[this.field.fieldGroup.length - 1];
        item.formControl!.markAsPristine();
      }
      this.to.validationStyle = { display: 'none' } || this.to.validationStyle;
      this.to.formlyItemStyle = { marginBottom: '0' } || this.to.formlyItemStyle;
    });
  }
}
