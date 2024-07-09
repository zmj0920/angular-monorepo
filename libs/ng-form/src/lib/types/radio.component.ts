import { Component, ChangeDetectionStrategy, Type } from '@angular/core';
import { FieldType, FieldTypeConfig, FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyFieldProps } from '@ngx-formly/ng-zorro-antd/form-field';
import { NzSizeLDSType } from 'ng-zorro-antd/core/types';

interface RadioButtonProps extends FormlyFieldProps {
  nzSize?: NzSizeLDSType;
}

export interface FormlyRadioButtonConfig extends FormlyFieldConfig<RadioButtonProps> {
  type: 'radio-button' | Type<FormlyFieldRadioButtonComponent>;
}

@Component({
  selector: 'formly-field-radio-button',
  template: `
    <nz-radio-group
      [formControl]="formControl"
      [nzSize]="props.nzSize || 'default'"
      (ngModelChange)="props.change && props.change(field, $event)"
    >
      <label
        nz-radio-button
        *ngFor="let option of props.options | formlySelectOptions : field | async"
        [nzValue]="option.value"
        [nzDisabled]="option.disabled"
      >
        {{ option.label }}
      </label>
    </nz-radio-group>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormlyFieldRadioButtonComponent extends FieldType<FieldTypeConfig<RadioButtonProps>> {}
