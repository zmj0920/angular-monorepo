import { Component, EventEmitter, TemplateRef, Type } from '@angular/core';
import { FieldType, FieldTypeConfig, FormlyFieldConfig, FormlyFieldProps } from '@ngx-formly/core';
import { FunctionProp, NzSafeAny, NzStatus } from 'ng-zorro-antd/core/types';
import {
  CompatibleDate,
  DisabledTimeFn,
  NzDateMode,
  NzDatePickerSizeType,
  PresetRanges,
  SupportTimeOptions
} from 'ng-zorro-antd/date-picker';
import { NzPlacement } from 'ng-zorro-antd/date-picker/date-picker.component';

interface DateProps extends FormlyFieldProps {
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
  nzShowTime: SupportTimeOptions | boolean;
  nzShowToday: boolean;
  nzShowNow: boolean;
  nzOnOk?: (nativeDate: CompatibleDate | null) => void;
  nzDisabledTime: DisabledTimeFn;
  nzDateRender: string | TemplateRef<NzSafeAny> | FunctionProp<string | TemplateRef<Date>> | undefined;
  nzRenderExtraFooter: string | TemplateRef<NzSafeAny> | FunctionProp<string | TemplateRef<NzSafeAny>> | undefined;
  nzOnOpenChange?: (open: boolean) => void;
  nzStatus: NzStatus;
  nzRanges?: PresetRanges;
  nzPlacement: NzPlacement;
}

export interface FormlyDatePickerFieldConfig extends FormlyFieldConfig<DateProps> {
  type: 'date' | Type<FormlyFieldDatePickerComponent>;
}

@Component({
  selector: 'ng-formly-field-date-picker',
  template: `
    <nz-date-picker
      style="width: 100%"
      [formControl]="formControl"
      [formlyAttributes]="field"
      [nzMode]="props.nzMode || 'date'"
      [nzAllowClear]="props.nzAllowClear"
      [nzAutoFocus]="props.nzAutoFocus"
      [nzBackdrop]="props.nzBackdrop"
      [nzPopupStyle]="props.nzPopupStyle"
      [nzSize]="props.nzSize"
      [nzDisabled]="props.nzDisabled || props.disabled || formControl.disabled"
      [nzBorderless]="props.nzBorderless"
      [nzPlaceHolder]="props.nzPlaceHolder || props.placeholder"
      [nzInline]="props.nzInline"
      [nzStatus]="props.nzStatus"
      [nzShowTime]="props.nzShowTime"
      [nzShowToday]="props.nzShowToday"
      [nzShowNow]="props.nzShowNow"
      [nzPlacement]="props.nzPlacement || 'bottomLeft'"
      (nzOnOk)="props.nzOnOk && props.nzOnOk($event)"
      (nzOnOpenChange)="props.nzOnOpenChange && props.nzOnOpenChange($event)"
      [nzRenderExtraFooter]="props.nzRenderExtraFooter"
      [nzDateRender]="props.nzDateRender"
      [nzSuffixIcon]="props.nzSuffixIcon"
      [nzDisabledDate]="props.nzDisabledDate"
      [nzDropdownClassName]="props.nzDropdownClassName"
      [nzFormat]="props.nzFormat"
      [nzInputReadOnly]="props.nzInputReadOnly"
      [nzDisabledTime]="props.nzDisabledTime"
      [nzRanges]="(props.nzRanges && props.nzRanges) || undefined"
    ></nz-date-picker>
  `
})
export class FormlyFieldDatePickerComponent extends FieldType<FieldTypeConfig<DateProps>> {}
