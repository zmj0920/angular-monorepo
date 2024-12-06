import { ChangeDetectionStrategy, Component, Type } from '@angular/core';
import { FieldType, FieldTypeConfig, FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyFieldProps } from '@ngx-formly/ng-zorro-antd/form-field';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

interface CheckboxProps extends FormlyFieldProps {
  options: Array<{
    label: string;
    value: string | number | null | undefined;
    disabled: boolean;
    nzChecked: boolean;
  }>;
}

export interface FormlyMultiCheckboxFieldConfig extends FormlyFieldConfig<CheckboxProps> {
  type: 'multicheckbox' | Type<FormlyFieldMultiCheckboxComponent>;
}
@Component({
  selector: 'ng-formly-field-multicheckbox',
  template: `
    <nz-checkbox-wrapper
      [formControl]="formControl"
      [formlyAttributes]="field"
      ngDefaultControl
      (nzOnChange)="change(field, $event)"
    >
      <label
        nz-checkbox
        *ngFor="let op of props.options"
        [nzValue]="op.value"
        [nzDisabled]="op.disabled"
        [(nzChecked)]="op.nzChecked"
      >
        {{ op.label }}
      </label>
    </nz-checkbox-wrapper>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormlyFieldMultiCheckboxComponent extends FieldType<FieldTypeConfig<CheckboxProps>> {
  change(field: NzSafeAny, options: NzSafeAny) {
    this.formControl.patchValue(options);
    if (this.props.change) {
      this.props.change(field, options);
    }
  }
}
