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
import { FormRefSourceService } from '../ng-form-ref.directive';
import { isTemplateRef } from 'ng-zorro-antd/core/util';

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
  nzOnOpenChange?: (open: boolean) => void;
  nzStatus: NzStatus;
  nzRanges?: PresetRanges;
  nzOnCalendarChange?: (evt: (Date | null)[]) => void;
  nzDefaultPickerValue?: CompatibleDate | null;
  nzSeparator?: string;
  _nzSeparator?: string | TemplateRef<NzSafeAny>;
  nzDateRender?: string;
  _nzDateRender?: string | TemplateRef<NzSafeAny> | undefined;
  nzRenderExtraFooter?: string;
  _nzRenderExtraFooter?: string | TemplateRef<NzSafeAny> | undefined;
}

export interface FormlyDateRangePickerFieldConfig extends FormlyFieldConfig<DateRangePickerProps> {
  type: 'date-range-picker' | Type<FormlyFieldDateRangePickerComponent>;
}

@Component({
  selector: 'nz-formly-date-range-picker',
  template: `
    <nz-range-picker
      style="width: 100%"
      [formControl]="formControl"
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
      [nzInline]="props.nzInline"
      (nzOnOpenChange)="props.nzOnOpenChange && props.nzOnOpenChange($event)"
      [nzStatus]="props.nzStatus"
      [nzShowToday]="props.nzShowToday"
      [nzShowNow]="props.nzShowNow"
      [nzDefaultPickerValue]="props.nzDefaultPickerValue || null"
      (nzOnOpenChange)="props.nzOnOpenChange && props.nzOnOpenChange($event)"
      [nzRanges]="props.nzRanges"
      (nzOnOk)="props.nzOnOk && props.nzOnOk($event)"
      (nzOnCalendarChange)="props.nzOnCalendarChange && props.nzOnCalendarChange($event)"
      [nzShowTime]="props.nzShowTime"
      [nzDisabledTime]="props.nzDisabledTime"
      [nzDateRender]="props._nzDateRender"
      [nzSeparator]="props._nzSeparator || '~'"
      [nzRenderExtraFooter]="props._nzRenderExtraFooter"
      ngDefaultControl
    ></nz-range-picker>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormlyFieldDateRangePickerComponent extends FieldType<FieldTypeConfig<DateRangePickerProps>> {
  constructor(private dataSource: FormRefSourceService) {
    super();
  }
  ngOnInit(): void {
    if (this.props['nzSeparator']) {
      const nzSeparator = this.getTemplate(this.props.nzSeparator);
      this.props['_nzSeparator'] = isTemplateRef(nzSeparator) ? nzSeparator : this.props.nzSeparator;
    }
    if (this.props['nzRenderExtraFooter']) {
      const nzRenderExtraFooter = this.getTemplate(this.props.nzRenderExtraFooter);
      this.props['_nzRenderExtraFooter'] = isTemplateRef(nzRenderExtraFooter)
        ? nzRenderExtraFooter
        : this.props.nzRenderExtraFooter;
    }
    if (this.props['nzDateRender']) {
      const nzDateRender = this.getTemplate(this.props.nzDateRender);
      this.props['_nzDateRender'] = isTemplateRef(nzDateRender) ? nzDateRender : this.props.nzDateRender;
    }
  }

  getTemplate(key: string) {
    return this.dataSource.getRender(key);
  }
}
