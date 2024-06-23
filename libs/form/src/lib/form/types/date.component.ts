

import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'ng-formly-field-date',
  template: `
    <nz-date-picker [formlyAttributes]="field" [formControl]="formControl"></nz-date-picker>
  `,
})
export class FormlyFieldDateComponent extends FieldType {
}
