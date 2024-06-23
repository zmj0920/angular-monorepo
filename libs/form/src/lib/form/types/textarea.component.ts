

import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'ng-formly-field-textarea',
  template: `
    <textarea [ngStyle]="{'margin-bottom': '0'}" nz-input
      placeholder="{{ (to.placeholder || '') | translate }}"
      [formControl]="formControl" [cols]="to.cols" [rows]="to.rows || 4"
      class="form-control" [class.is-invalid]="showError"
      [formlyAttributes]="field"></textarea>
  `,
})
export class FormlyFieldTextAreaComponent extends FieldType {
}
