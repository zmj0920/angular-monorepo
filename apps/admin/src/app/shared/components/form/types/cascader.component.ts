import { ChangeDetectionStrategy, Component, TemplateRef, Type } from '@angular/core';
import { FieldType, FieldTypeConfig, FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyFieldProps } from '@ngx-formly/ng-zorro-antd/form-field';
import { NzCascaderOption, NzShowSearchOptions } from 'ng-zorro-antd/cascader';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

interface CascaderProps extends FormlyFieldProps {
  nzAllowClear?: boolean;
  nzAutoFocus?: boolean;
  nzBackdrop?: boolean;
  nzChangeOn?: (option: any, index: number) => boolean;
  nzChangeOnSelect?: boolean;
  nzColumnClassName?: string;
  nzDisabled?: boolean;
  nzExpandIcon?: string | TemplateRef<NzSafeAny>;
  nzExpandIconName?: string;
  nzExpandTrigger?: 'click' | 'hover';
  nzLabelProperty?: string;
  nzLabelRender?: TemplateRef<any>;
  nzLabelRenderName?: string;
  nzLoadData?: (option: any, index?: number) => PromiseLike<any>;
  nzMenuClassName?: string;
  nzMenuStyle?: object;
  nzNotFoundContent?: string | TemplateRef<NzSafeAny>;
  nzNotFoundContentName?: string;
  nzOptionRender?: TemplateRef<{ $implicit: NzCascaderOption; index: number }>;
  nzOptionRenderName?: string;
  nzPlaceHolder?: string;
  nzShowArrow?: boolean;
  nzShowInput?: boolean;
  nzShowSearch?: boolean | NzShowSearchOptions;
  nzSize?: 'large' | 'small' | 'default';
  nzSuffixIcon?: string | TemplateRef<NzSafeAny>;
  nzSuffixIconName?: string;
  nzValueProperty?: string;
  nzClear?: (field: FormlyFieldConfig) => void;
  nzVisibleChange?: (evt: boolean) => void;
  nzSelectionChange?: (evt: NzCascaderOption[]) => void;
}

export interface FormlyCascaderConfig extends FormlyFieldConfig<CascaderProps> {
  type: 'cascader' | Type<FormlyFieldCascaderComponent>;
}

// [nzShowInput]="props.nzShowInput"

@Component({
  selector: 'nz-formly-cascader',
  template: `
    <nz-cascader
      [formControl]="formControl"
      [formlyAttributes]="field"
      [nzOptions]="props.options || []"
      [nzAllowClear]="props.nzAllowClear"
      [nzBackdrop]="props.nzBackdrop || false"
      [nzChangeOn]="props.nzChangeOn"
      [nzExpandIcon]="props.nzExpandIcon || ''"
      [nzLabelRender]="props.nzLabelRender || null"
      [nzLoadData]="props.nzLoadData"
      [nzLabelProperty]="props.nzLabelProperty || 'label'"
      [nzPlaceHolder]="props.nzPlaceHolder || props.placeholder || 'Please select'"
      [nzMenuStyle]="props.nzMenuStyle || null"
      [nzMenuClassName]="props.nzMenuClassName"
      [nzDisabled]="props.nzDisabled || props.disabled || formControl.disabled"
      [nzExpandTrigger]="props.nzExpandTrigger || 'click'"
      [nzShowArrow]="props.nzShowArrow"
      [nzSuffixIcon]="props.nzSuffixIcon || ''"
      [nzChangeOnSelect]="props.nzChangeOnSelect"
      [nzColumnClassName]="props.nzColumnClassName"
      [nzAutoFocus]="props.nzAutoFocus"
      [nzShowSearch]="props.nzShowSearch || false"
      [nzSize]="props.nzSize || 'default'"
      [nzValueProperty]="props.nzValueProperty || 'value'"
      (nzClear)="props.nzClear?.(field)"
      (nzSelectionChange)="props.nzSelectionChange?.($event)"
      (nzVisibleChange)="props.nzVisibleChange?.($event)"
      [nzNotFoundContent]="props.nzNotFoundContent"
      [nzOptionRender]="props.nzOptionRender || null"
      [nzShowInput]="props.nzShowInput || true"
    ></nz-cascader>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormlyFieldCascaderComponent extends FieldType<FieldTypeConfig<CascaderProps>> {}
