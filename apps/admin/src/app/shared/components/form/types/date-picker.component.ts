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
import { NzPlacement } from 'ng-zorro-antd/date-picker/date-picker.component';
import { FormRefSourceService } from '../ng-form-ref.directive';
import { isTemplateRef } from 'ng-zorro-antd/core/util';

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
  nzShowTime?: SupportTimeOptions | boolean;
  nzShowToday: boolean;
  nzShowNow: boolean;
  nzOnOk?: (nativeDate: CompatibleDate | null) => void;
  nzDisabledTime?: DisabledTimeFn;
  nzOnOpenChange?: (open: boolean) => void;
  nzStatus: NzStatus;
  nzRanges?: PresetRanges;
  nzPlacement: NzPlacement;
  nzDefaultPickerValue?: CompatibleDate | null;
  nzSuffixIcon?: string;
  _nzSuffixIcon?: string | TemplateRef<NzSafeAny>;
  nzDateRender?: string;
  _nzDateRender?: string | TemplateRef<NzSafeAny> | undefined;
  nzRenderExtraFooter?: string;
  _nzRenderExtraFooter?: string | TemplateRef<NzSafeAny> | undefined;
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
      [nzDisabledDate]="props.nzDisabledDate"
      [nzDropdownClassName]="props.nzDropdownClassName"
      [nzFormat]="props.nzFormat"
      [nzInputReadOnly]="props.nzInputReadOnly"
      [nzDisabledTime]="props.nzDisabledTime"
      [nzDefaultPickerValue]="props.nzDefaultPickerValue || null"
      [nzRanges]="(props.nzRanges && props.nzRanges) || undefined"
      [nzRenderExtraFooter]="props._nzRenderExtraFooter"
      [nzDateRender]="props._nzDateRender"
      [nzSuffixIcon]="props._nzSuffixIcon || ''"
    ></nz-date-picker>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormlyFieldDatePickerComponent extends FieldType<FieldTypeConfig<DateProps>> {
  constructor(private dataSource: FormRefSourceService) {
    super();
  }
  ngOnInit(): void {
    if (this.props['nzSuffixIcon']) {
      const nzSuffixIcon = this.getTemplate(this.props.nzSuffixIcon);
      this.props['_nzSuffixIcon'] = isTemplateRef(nzSuffixIcon) ? nzSuffixIcon : this.props.nzSuffixIcon;
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
