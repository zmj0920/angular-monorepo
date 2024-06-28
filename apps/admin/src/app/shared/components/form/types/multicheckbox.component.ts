import { Component } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { FormlyFieldProps } from '@ngx-formly/ng-zorro-antd/form-field';

interface CheckboxProps extends FormlyFieldProps {
  // indeterminate?: boolean;
}

@Component({
  selector: 'ng-formly-field-multicheckbox',
  template: `
    <nz-checkbox-group
      [(ngModel)]="props.options"
      [formControl]="formControl"
      [formlyAttributes]="field"
      (ngModelChange)="props.change && props.change(field, $event)"
    ></nz-checkbox-group>
  `,
})
export class FormlyFieldMultiCheckboxComponent extends FieldType<
  FieldTypeConfig<CheckboxProps>
> {}
