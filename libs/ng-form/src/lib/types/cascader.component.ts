import { ChangeDetectionStrategy, Component, TemplateRef, Type } from '@angular/core';
import { FieldType, FieldTypeConfig, FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyFieldProps } from '@ngx-formly/ng-zorro-antd/form-field';
import { NzCascaderOption, NzShowSearchOptions } from 'ng-zorro-antd/cascader';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { FormRefSourceService } from '@angular-monorepo/ng-form';
import { isTemplateRef } from 'ng-zorro-antd/core/util';

interface CascaderProps extends FormlyFieldProps {
  nzAllowClear?: boolean;
  nzAutoFocus?: boolean;
  nzBackdrop?: boolean;
  nzChangeOn?: (option: NzSafeAny, index: number) => boolean;
  nzChangeOnSelect?: boolean;
  nzColumnClassName?: string;
  nzDisabled?: boolean;
  nzExpandIconName?: string;
  nzExpandTrigger?: 'click' | 'hover';
  nzLabelProperty?: string;
  nzLabelRenderName?: string;
  nzLoadData?: (option: NzSafeAny, index?: number) => PromiseLike<NzSafeAny>;
  nzMenuClassName?: string;
  nzMenuStyle?: object;
  nzNotFoundContentName?: string;
  nzOptionRenderName?: string;
  nzPlaceHolder?: string;
  nzShowArrow?: boolean;
  nzShowInput?: boolean;
  nzShowSearch?: boolean | NzShowSearchOptions;
  nzSize?: 'large' | 'small' | 'default';
  nzSuffixIconName?: string;
  nzValueProperty?: string;
  nzClear?: (field: FormlyFieldConfig) => void;
  nzVisibleChange?: (evt: boolean) => void;
  nzSelectionChange?: (evt: NzCascaderOption[]) => void;
  nzLabelRender?: string;
  _nzLabelRender?: TemplateRef<NzSafeAny>;
  nzExpandIcon?: string;
  _nzExpandIcon?: string | TemplateRef<NzSafeAny>;
  nzSuffixIcon?: string;
  _nzSuffixIcon?: string | TemplateRef<NzSafeAny>;
  nzOptionRender?: string;
  _nzOptionRender?: TemplateRef<NzSafeAny>;
  nzNotFoundContent?: string;
  _nzNotFoundContent?: string | TemplateRef<NzSafeAny>;
}

export interface FormlyCascaderConfig extends FormlyFieldConfig<CascaderProps> {
  type: 'cascader' | Type<FormlyFieldCascaderComponent>;
}
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
      [nzShowInput]="props.nzShowInput || true"
      [nzLoadData]="props.nzLoadData"
      [nzLabelProperty]="props.nzLabelProperty || 'label'"
      [nzPlaceHolder]="props.nzPlaceHolder || props.placeholder || 'Please select'"
      [nzMenuStyle]="props.nzMenuStyle || null"
      [nzMenuClassName]="props.nzMenuClassName"
      [nzDisabled]="props.nzDisabled || props.disabled || formControl.disabled"
      [nzExpandTrigger]="props.nzExpandTrigger || 'click'"
      [nzShowArrow]="props.nzShowArrow"
      [nzChangeOnSelect]="props.nzChangeOnSelect"
      [nzColumnClassName]="props.nzColumnClassName"
      [nzAutoFocus]="props.nzAutoFocus"
      [nzShowSearch]="props.nzShowSearch || false"
      [nzSize]="props.nzSize || 'default'"
      [nzValueProperty]="props.nzValueProperty || 'value'"
      (nzClear)="props.nzClear?.(field)"
      (nzSelectionChange)="props.nzSelectionChange?.($event)"
      (nzVisibleChange)="props.nzVisibleChange?.($event)"
      [nzSuffixIcon]="props._nzSuffixIcon || ''"
      [nzExpandIcon]="props._nzExpandIcon || ''"
      [nzNotFoundContent]="props._nzNotFoundContent"
      [nzLabelRender]="props._nzLabelRender || null"
      [nzOptionRender]="props._nzOptionRender || null"
    ></nz-cascader>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormlyFieldCascaderComponent extends FieldType<FieldTypeConfig<CascaderProps>> {
  constructor(private dataSource: FormRefSourceService) {
    super();
  }

  ngOnInit(): void {
    if (this.props['nzSuffixIcon']) {
      const nzSuffixIcon = this.getTemplate(this.props.nzSuffixIcon);
      this.props['_nzSuffixIcon'] = isTemplateRef(nzSuffixIcon) ? nzSuffixIcon : this.props.nzSuffixIcon;
    }
    if (this.props['nzExpandIcon']) {
      const nzExpandIcon = this.getTemplate(this.props.nzExpandIcon);
      this.props['_nzExpandIcon'] = isTemplateRef(nzExpandIcon) ? nzExpandIcon : this.props.nzExpandIcon;
    }
    if (this.props['nzNotFoundContent']) {
      const nzNotFoundContent = this.getTemplate(this.props.nzNotFoundContent);
      this.props['_nzNotFoundContent'] = isTemplateRef(nzNotFoundContent)
        ? nzNotFoundContent
        : this.props.nzNotFoundContent;
    }
    if (this.props['nzLabelRender']) {
      const nzLabelRender = this.getTemplate(this.props.nzLabelRender);
      this.props['_nzLabelRender'] = isTemplateRef(nzLabelRender) ? nzLabelRender : undefined;
    }
    if (this.props['nzOptionRender']) {
      const nzOptionRender = this.getTemplate(this.props.nzOptionRender);
      this.props['_nzOptionRender'] = isTemplateRef(nzOptionRender) ? nzOptionRender : undefined;
    }
  }

  getTemplate(key: string) {
    return this.dataSource.getRender(key);
  }
}
