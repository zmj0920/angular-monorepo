import { Component, TemplateRef, Type } from '@angular/core';
import { FieldType, FieldTypeConfig, FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyFieldProps } from '@ngx-formly/ng-zorro-antd/form-field';
import { NzSizeDSType } from 'ng-zorro-antd/core/types';

interface RateProps extends FormlyFieldProps {
  nzAllowClear?: boolean;
  nzAllowHalf?: boolean;
  nzAutoFocus?: boolean;
  nzCharacterName?: string;
  nzCount?: number;
  nzDisabled?: boolean;
  nzTooltips?: string[];
  nzCharacter: TemplateRef<{
    $implicit: number;
  }>;
  nzOnBlur?: (evt: FocusEvent) => void;
  nzOnFocus?: (evt: FocusEvent) => void;
  nzOnHoverChange?: (evt: number) => void;
  nzOnKeyDown?: (evt: KeyboardEvent) => void;
}

export interface FormlyRateFieldConfig extends FormlyFieldConfig<RateProps> {
  type: 'rate' | Type<FormlyFieldRateComponent>;
}

// [nzCount]="props.nzCount || 0"
@Component({
  selector: 'ng-formly-field-rate',
  template: `
    <nz-rate
      [formControl]="$any(formControl)"
      [formlyAttributes]="field"
      [nzDisabled]="props.nzDisabled || props.disabled || formControl.disabled"
      [nzTooltips]="props.nzTooltips || []"
      [nzAllowClear]="props.nzAllowClear !== false"
      [nzAllowHalf]="props.nzAllowHalf"
      [nzAutoFocus]="props.nzAutoFocus"
      [nzCharacter]="props.nzCharacter"
      [nzCount]="props.nzCount || 5"
      (nzOnKeyDown)="props.nzOnKeyDown?.($event)"
      (nzOnFocus)="props.nzOnFocus?.($event)"
      (nzOnBlur)="props.nzOnBlur?.($event)"
      (nzOnHoverChange)="props.nzOnHoverChange?.($event)"
      ngDefaultControl
    ></nz-rate>
    <!-- <nz-rate [formControl]="formControl" [formlyAttributes]="field" [ngModel]="value"></nz-rate> -->
  `
})
export class FormlyFieldRateComponent extends FieldType<FieldTypeConfig<RateProps>> {
  value = 0;
}
