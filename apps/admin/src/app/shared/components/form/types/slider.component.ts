import { Component, Type } from '@angular/core';
import { FieldType, FieldTypeConfig, FormlyFieldConfig, FormlyFieldProps } from '@ngx-formly/core';
import { NzMarks, NzSliderComponent, NzSliderShowTooltip, NzSliderValue } from 'ng-zorro-antd/slider';

interface SliderFieldProps extends FormlyFieldProps {
  nzDisabled?: boolean;
  nzDots?: boolean;
  nzIncluded?: boolean;
  nzMarks?: NzMarks | null;
  nzMax?: number;
  nzMin?: number;
  nzRange?: boolean;
  nzStep?: number | null;
  nzTipFormatter?: (value: number) => string;
  ngModel?: number | number[];
  nzVertical?: boolean;
  nzReverse?: boolean;
  nzTooltipVisible?: NzSliderShowTooltip;
  nzDefaultValue?: NzSliderValue;
  nzTooltipPlacement?:
    | 'top'
    | 'left'
    | 'right'
    | 'bottom'
    | 'topLeft'
    | 'topRight'
    | 'bottomLeft'
    | 'bottomRight'
    | 'leftTop'
    | 'leftBottom'
    | 'rightTop'
    | 'rightBottom'
    | Array<string>;
  nzOnAfterChange?: (evt: number[] | number, field: FormlyFieldConfig<SliderFieldProps>) => void;
}

export interface FormlySliderFieldConfig extends FormlyFieldConfig<SliderFieldProps> {
  type: 'slider' | Type<FormlyFieldSliderComponent>;
}

@Component({
  selector: 'ng-formly-field-slider',
  template: `
    <div nz-row>
      <div nz-col nzSpan="12">
        <nz-slider
          [formControl]="formControl"
          [formlyAttributes]="field"
          [nzMax]="props.nzMax || 100"
          [nzMin]="props.nzMin || 0"
          [(ngModel)]="value"
          [formlyAttributes]="field"
          [nzRange]="props.nzRange"
          [nzDefaultValue]="props.nzDefaultValue"
          [nzDisabled]="props.nzDisabled || props.disabled || formControl.disabled"
          [nzDots]="props.nzDots"
          [nzIncluded]="props.nzIncluded"
          [nzMax]="props.nzMax"
          [nzMin]="props.nzMin"
          [nzStep]="props.nzStep"
          [nzTipFormatter]="props.nzTipFormatter"
          [nzVertical]="props.nzVertical"
          [nzReverse]="props.nzReverse"
          [nzTooltipPlacement]="$any(props.nzTooltipPlacement)"
          [nzTooltipVisible]="props.nzTooltipVisible || 'default'"
          (nzOnAfterChange)="props.nzOnAfterChange?.($event, field)"
        ></nz-slider>
      </div>
      <div nz-col nzSpan="4">
        <nz-input-number
          [nzMax]="props.nzMax || 100"
          [nzMin]="props.nzMin || 0"
          [nzStep]="props.nzStep"
          [ngStyle]="{ marginLeft: '16px' }"
          [(ngModel)]="value"
          [nzDisabled]="props.nzDisabled || props.disabled || formControl.disabled"
        ></nz-input-number>
      </div>
    </div>
  `,
  styles: [``]
})
export class FormlyFieldSliderComponent extends FieldType<FieldTypeConfig<SliderFieldProps>> {
  value!: number;
}
