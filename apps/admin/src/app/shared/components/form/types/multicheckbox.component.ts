import { Component } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { FormlyFieldProps } from '@ngx-formly/ng-zorro-antd/form-field';

interface CheckboxProps extends FormlyFieldProps {}
@Component({
  selector: 'ng-formly-field-multicheckbox',
  template: `
    <nz-checkbox-wrapper [formControl]="formControl" (nzOnChange)="change(field, $event)">
      <label
        nz-checkbox
        *ngFor="let op of $any(props.options)"
        [nzValue]="op.value"
        [nzDisabled]="op.disabled"
        [(nzChecked)]="op['nzChecked']"
      >
        {{ op.label }}
      </label>
    </nz-checkbox-wrapper>
  `
})
export class FormlyFieldMultiCheckboxComponent extends FieldType<FieldTypeConfig<CheckboxProps>> {
  change(field: any, options: any) {
    this.formControl.patchValue(options);
    if (this.props.change) {
      this.props.change(field, options);
    }
  }
}
