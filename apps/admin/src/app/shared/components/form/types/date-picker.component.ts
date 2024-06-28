import { Component, Type } from '@angular/core';
import {
  FieldType,
  FieldTypeConfig,
  FormlyFieldConfig,
  FormlyFieldProps,
} from '@ngx-formly/core';

interface DateProps extends FormlyFieldProps {
  nzMode: 'date' | 'week' | 'month' | 'quarter' | 'year';
  nzAutoFocus: boolean;
  nzDisabled: boolean;
  nzBorderless: boolean;
  nzInputReadOnly: boolean;
  nzInline: boolean;
  nzPlaceHolder: string;
  nzFormat: string;
  nzDateRender: string;
  
}

export interface FormlyRadioFieldConfig extends FormlyFieldConfig<DateProps> {
  type: 'date' | Type<FormlyFieldDatePickerComponent>;
}

@Component({
  selector: 'ng-formly-field-date-picker',
  template: `
    <nz-date-picker
      [formlyAttributes]="field"
      [formControl]="formControl"
      [nzMode]="props['nzMode'] || 'date'"
      [nzAllowClear]
      [nzAutoFocus]
      [nzDisabled]
    ></nz-date-picker>
  `,
})
export class FormlyFieldDatePickerComponent extends FieldType<
  FieldTypeConfig<DateProps>
> {}
