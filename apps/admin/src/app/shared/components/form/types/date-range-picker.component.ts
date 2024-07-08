import { ChangeDetectionStrategy, Component, TemplateRef, Type } from '@angular/core';
import { FieldType, FieldTypeConfig, FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyFieldProps } from '@ngx-formly/ng-zorro-antd/form-field';
import { FunctionProp, NzSafeAny, NzStatus } from 'ng-zorro-antd/core/types';
import {
  CompatibleDate,
  DisabledTimeFn,
  NzDateMode,
  NzDatePickerSizeType,
  PresetRanges,
  SupportTimeOptions
} from 'ng-zorro-antd/date-picker';

interface DateRangePickerProps extends FormlyFieldProps {
  nzMode: NzDateMode;
  nzAutoFocus: boolean;
  nzDisabled: boolean;
  nzBorderless: boolean;
  nzInputReadOnly: boolean;
  nzInline: boolean;
  nzPlaceHolder: string | string[];
  nzFormat: string;
  nzAllowClear: boolean;
  nzBackdrop: boolean;
  nzDisabledDate: (current: Date) => boolean;
  nzPopupStyle: Object;
  nzDropdownClassName: string;
  nzSize: NzDatePickerSizeType;
  placeholder: string;
  nzSuffixIcon: string;
  nzShowTime?: SupportTimeOptions | boolean;
  nzShowToday: boolean;
  nzShowNow: boolean;
  nzOnOk?: (nativeDate: CompatibleDate | null) => void;
  nzDisabledTime?: DisabledTimeFn;
  nzDateRender: string | TemplateRef<NzSafeAny> | FunctionProp<string | TemplateRef<Date>> | undefined;
  nzRenderExtraFooter: string | TemplateRef<NzSafeAny> | FunctionProp<string | TemplateRef<NzSafeAny>> | undefined;
  nzOnOpenChange?: (open: boolean) => void;
  nzStatus: NzStatus;
  nzRanges?: PresetRanges;
  nzSeparator: string | TemplateRef<NzSafeAny>;
  nzOnCalendarChange?: (evt: (Date | null)[]) => void;
  nzDefaultPickerValue?: CompatibleDate | null;
}

export interface FormlyDateRangePickerFieldConfig extends FormlyFieldConfig<DateRangePickerProps> {
  type: 'date-range-picker' | Type<FormlyFieldDateRangePickerComponent>;
}

@Component({
  selector: 'nz-formly-date-range-picker',
  template: `
    <nz-range-picker
      style="width: 100%"
      [formControl]="$any(formControl)"
      [formlyAttributes]="field"
      [nzMode]="props.nzMode"
      [nzAllowClear]="props.nzAllowClear"
      [nzAutoFocus]="props.nzAutoFocus"
      [nzBackdrop]="props.nzBackdrop"
      [nzDisabled]="props.nzDisabled || props.disabled || formControl.disabled"
      [nzDisabledDate]="props.nzDisabledDate"
      [nzPopupStyle]="props.nzPopupStyle"
      [nzDropdownClassName]="props.nzDropdownClassName"
      [nzSize]="props.nzSize"
      [nzFormat]="props.nzFormat"
      [nzInputReadOnly]="props.nzInputReadOnly"
      [nzPlaceHolder]="props.nzPlaceHolder || props.placeholder"
      [nzBorderless]="props.nzBorderless"
      [nzSuffixIcon]="props.nzSuffixIcon"
      [nzRenderExtraFooter]="props.nzRenderExtraFooter"
      [nzInline]="props.nzInline"
      (nzOnOpenChange)="props.nzOnOpenChange && props.nzOnOpenChange($event)"
      [nzStatus]="props.nzStatus"
      [nzShowToday]="props.nzShowToday"
      [nzShowNow]="props.nzShowNow"
      [nzDateRender]="props.nzDateRender"
      [nzDefaultPickerValue]="props.nzDefaultPickerValue || null"
      (nzOnOpenChange)="props.nzOnOpenChange && props.nzOnOpenChange($event)"
      [nzSeparator]="props.nzSeparator || '~'"
      [nzRanges]="props.nzRanges"
      (nzOnOk)="props.nzOnOk && props.nzOnOk($event)"
      (nzOnCalendarChange)="props.nzOnCalendarChange && props.nzOnCalendarChange($event)"
      [nzShowTime]="props.nzShowTime"
      [nzDisabledTime]="props.nzDisabledTime"
      ngDefaultControl
    ></nz-range-picker>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormlyFieldDateRangePickerComponent extends FieldType<FieldTypeConfig<DateRangePickerProps>> {
  // override defaultOptions = {
  //   props: {
  //     nzAllowClear: true,
  //     nzDisabled: false,
  //     nzPopupStyle: {},
  //     nzInputReadOnly: false,
  //     nzSeparator: '~',
  //     nzSuffixIcon: 'calendar'
  //   }
  // };
}
