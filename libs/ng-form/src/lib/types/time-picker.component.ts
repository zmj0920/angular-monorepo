import { ChangeDetectionStrategy, Component, TemplateRef, Type } from '@angular/core';
import { FieldType, FieldTypeConfig, FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyFieldProps } from '@ngx-formly/ng-zorro-antd/form-field';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { FormRefSourceService } from '@angular-monorepo/ng-form';
import { isTemplateRef } from 'ng-zorro-antd/core/util';

interface TimePickerProps extends FormlyFieldProps {
  nzId?: string;
  ngModel?: Date;
  nzAddOnName?: string;
  nzAllowEmpty?: boolean;
  nzAutoFocus?: boolean;
  nzBackdrop?: boolean;
  nzClearText?: string;
  nzNowText?: string;
  nzOkText?: string;
  nzDefaultOpenValue?: Date;
  nzDisabled?: boolean;
  nzDisabledHours?: () => number[];
  nzDisabledMinutes?: (hour: number) => number[];
  nzDisabledSeconds?: (hour: number, minute: number) => number[];
  nzFormat?: string;
  nzHideDisabledOptions?: boolean;
  nzHourStep?: number;
  nzMinuteStep?: number;
  nzSecondStep?: number;
  nzSize?: 'large' | 'small' | 'default';
  nzStatus?: 'error' | 'warning';
  nzPlaceHolder: string;
  nzPopupClassName?: string;
  nzUse12Hours?: boolean;
  nzOpenChange?: (evt: boolean) => void;
  nzAddOn: string;
  _nzAddOn?: TemplateRef<NzSafeAny>;
  nzSuffixIcon?: string;
  _nzSuffixIcon?: string | TemplateRef<NzSafeAny>;
}

export interface FormlyTimePickerConfig extends FormlyFieldConfig<TimePickerProps> {
  type: 'time-picker' | Type<FormlyFieldTimePickerComponent>;
}

@Component({
  selector: 'nz-formly-time-picker',
  template: `
    <nz-time-picker
      style="width: 100%"
      [formControl]="formControl"
      [formlyAttributes]="field"
      [nzSize]="props.nzSize || 'default'"
      [nzPlaceHolder]="props.nzPlaceHolder || props.placeholder || 'Select a time'"
      [nzAddOn]="props._nzAddOn"
      [nzBackdrop]="props.nzBackdrop || false"
      [nzAllowEmpty]="props.nzAllowEmpty"
      [nzAutoFocus]="props.nzAutoFocus"
      [nzClearText]="props.nzClearText || 'clear'"
      [nzNowText]="props.nzNowText || 'Now'"
      [nzOkText]="props.nzOkText || 'Ok'"
      [nzDefaultOpenValue]="props.nzDefaultOpenValue"
      [nzDisabled]="props.nzDisabled || props.disabled || formControl.disabled"
      [nzDisabledHours]="props.nzDisabledHours"
      [nzDisabledMinutes]="props.nzDisabledMinutes"
      [nzDisabledSeconds]="props.nzDisabledSeconds"
      [nzFormat]="props.nzFormat || 'HH:mm:ss'"
      [nzHideDisabledOptions]="props.nzHideDisabledOptions"
      [nzHourStep]="props.nzHourStep || 1"
      [nzMinuteStep]="props.nzMinuteStep || 1"
      [nzSecondStep]="props.nzSecondStep || 1"
      [nzPopupClassName]="props.nzPopupClassName || ''"
      [nzUse12Hours]="props.nzUse12Hours"
      [nzStatus]="props.nzStatus || ''"
      [nzSuffixIcon]="props._nzSuffixIcon || ''"
      (nzOpenChange)=" props.nzOpenChange?.($event)"
    ></nz-time-picker>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormlyFieldTimePickerComponent extends FieldType<FieldTypeConfig<TimePickerProps>> {
  constructor(private dataSource: FormRefSourceService) {
    super();
  }
  ngOnInit(): void {
    if (this.props['nzSuffixIcon']) {
      const nzSuffixIcon = this.getTemplate(this.props.nzSuffixIcon);
      this.props['_nzSuffixIcon'] = isTemplateRef(nzSuffixIcon) ? nzSuffixIcon : this.props.nzSuffixIcon;
    }
    if (this.props['nzAddOn']) {
      const nzAddOn = this.getTemplate(this.props.nzAddOn);
      this.props['_nzAddOn'] = isTemplateRef(nzAddOn) ? nzAddOn : undefined;
    }
  }

  getTemplate(key: string) {
    return this.dataSource.getRender(key);
  }
}
