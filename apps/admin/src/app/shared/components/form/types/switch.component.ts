import { Component, TemplateRef, Type } from '@angular/core';
import { FieldType, FieldTypeConfig, FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyFieldProps } from '@ngx-formly/ng-zorro-antd/form-field';
import { NzSizeDSType } from 'ng-zorro-antd/core/types';

interface SwitchProps extends FormlyFieldProps {
  nzDisabled?: boolean;
  nzLoading?: boolean;
  nzControl?: boolean;
  nzCheckedChildren?: string | TemplateRef<void>;
  nzUnCheckedChildren?: string | TemplateRef<void>;
  nzSize?: NzSizeDSType;
}

export interface FormlySwitchFieldConfig extends FormlyFieldConfig<SwitchProps> {
  type: 'switch' | Type<FormlyFieldSwitchComponent>;
}

@Component({
  selector: 'ng-formly-field-switch',
  template: `
    <nz-switch
      [formControl]="formControl"
      [formlyAttributes]="field"
      [nzCheckedChildren]="props.nzCheckedChildren || ''"
      [nzUnCheckedChildren]="props.nzUnCheckedChildren || ''"
      [nzDisabled]="props.nzDisabled || props.disabled || formControl.disabled"
      [nzSize]="props.nzSize || 'default'"
      [nzLoading]="props.nzLoading"
      [nzControl]="props.nzControl"
    ></nz-switch>
  `
})
export class FormlyFieldSwitchComponent extends FieldType<FieldTypeConfig<SwitchProps>> {}
