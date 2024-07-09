import { ChangeDetectionStrategy, Component, TemplateRef, Type } from '@angular/core';
import { FieldType, FieldTypeConfig, FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyFieldProps } from '@ngx-formly/ng-zorro-antd/form-field';
import { NzSizeDSType } from 'ng-zorro-antd/core/types';
import { FormRefSourceService } from '@angular-monorepo/ng-form';
import { isTemplateRef } from 'ng-zorro-antd/core/util';

interface SwitchProps extends FormlyFieldProps {
  nzDisabled?: boolean;
  nzLoading?: boolean;
  nzControl?: boolean;
  nzCheckedChildren?: string;
  _nzCheckedChildren?: string | TemplateRef<void>;
  nzUnCheckedChildren?: string;
  _nzUnCheckedChildren?: string | TemplateRef<void>;
  nzSize?: NzSizeDSType;
}

export interface FormlySwitchFieldConfig extends FormlyFieldConfig<SwitchProps> {
  type: 'switch' | Type<FormlyFieldSwitchComponent>;
}

@Component({
  selector: 'ng-formly-field-switch',
  template: `
    <nz-switch
      [formControl]="formControl"
      [formlyAttributes]="field"
      [nzCheckedChildren]="props._nzCheckedChildren || ''"
      [nzUnCheckedChildren]="props._nzUnCheckedChildren || ''"
      [nzDisabled]="props.nzDisabled || props.disabled || formControl.disabled"
      [nzSize]="props.nzSize || 'default'"
      [nzLoading]="props.nzLoading"
      [nzControl]="props.nzControl"
    ></nz-switch>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormlyFieldSwitchComponent extends FieldType<FieldTypeConfig<SwitchProps>> {
  constructor(private dataSource: FormRefSourceService) {
    super();
  }
  ngOnInit(): void {
    if (this.props['nzCheckedChildren']) {
      const nzCheckedChildren = this.getTemplate(this.props.nzCheckedChildren);
      this.props['_nzCheckedChildren'] = isTemplateRef(nzCheckedChildren)
        ? nzCheckedChildren
        : this.props.nzCheckedChildren;
    }
    if (this.props['nzUnCheckedChildren']) {
      const nzUnCheckedChildren = this.getTemplate(this.props.nzUnCheckedChildren);
      this.props['_nzUnCheckedChildren'] = isTemplateRef(nzUnCheckedChildren)
        ? nzUnCheckedChildren
        : this.props.nzUnCheckedChildren;
    }
  }

  getTemplate(key: string) {
    return this.dataSource.getRender(key);
  }
}
