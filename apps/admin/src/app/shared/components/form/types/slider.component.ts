import { Component, Type } from '@angular/core';
import { FieldType, FieldTypeConfig, FormlyFieldConfig, FormlyFieldProps } from '@ngx-formly/core';
import { NzMarks, NzSliderComponent, NzSliderShowTooltip, NzSliderValue } from 'ng-zorro-antd/slider';
import { Subject, takeUntil, tap } from 'rxjs';

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
          [(ngModel)]="value"
          [nzMax]="props.nzMax || 100"
          [nzMin]="props.nzMin || 0"
          [nzDisabled]="props.nzDisabled || props.disabled || formControl.disabled"
          [nzRange]="props.nzRange || false"
          [nzStep]="props.nzStep || 1"
          [nzTooltipPlacement]="$any(props.nzTooltipPlacement) || 'top'"
          [nzTooltipVisible]="props.nzTooltipVisible || 'default'"
          [nzDots]="props.nzDots"
          [nzIncluded]="props.nzIncluded"
          [nzTipFormatter]="props.nzTipFormatter"
          [nzVertical]="props.nzVertical"
          [nzReverse]="props.nzReverse"
          (nzOnAfterChange)="props.nzOnAfterChange?.($event, field)"
          ngDefaultControl
          (ngModelChange)="formControl.setValue(value)"
          [nzDefaultValue]="value"
        ></nz-slider>
      </div>
      <div nz-col nzSpan="4">
        <nz-input-number
          [formControl]="formControl"
          [formlyAttributes]="field"
          [nzMax]="props.nzMax || 100"
          [nzMin]="props.nzMin || 0"
          [nzStep]="props.nzStep || 1"
          [ngStyle]="{ marginLeft: '16px' }"
          [nzDisabled]="props.nzDisabled || props.disabled || formControl.disabled"
        ></nz-input-number>
      </div>
    </div>
  `,
  styles: [``]
})
export class FormlyFieldSliderComponent extends FieldType<FieldTypeConfig<SliderFieldProps>> {
  value!: number;
  onDestroy$ = new Subject<void>();
  ngOnInit() {
    this.value = this.formControl.value || this.props.nzMin || 0;
    this.formControl.valueChanges
      .pipe(
        takeUntil(this.onDestroy$),
        tap(val => {
          this.value = val;
          this.formControl.markAsDirty();
        })
      )
      .subscribe();
  }
  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
