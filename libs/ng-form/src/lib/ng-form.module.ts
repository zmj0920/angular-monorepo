import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { FormlySelectModule } from '@ngx-formly/core/select';

import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzPipesModule } from 'ng-zorro-antd/pipes';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzCascaderModule } from 'ng-zorro-antd/cascader';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzRateModule } from 'ng-zorro-antd/rate';

import { FormRefSourceService, NgFormRefDirective } from '@angular-monorepo/ng-form';
//自定义表单
import {
  WrapperComponent,
  FormlyFieldAlertComponent,
  FormlyFieldCascaderComponent,
  FormlyFieldCustomComponent,
  FormlyFieldDatePickerComponent,
  FormlyFieldDateRangePickerComponent,
  FormlyFieldMultiCheckboxComponent,
  FormlyFieldPasswordComponent,
  FormlyFieldRadioButtonComponent,
  FormlyFieldSliderComponent,
  FormlyFieldSwitchComponent,
  FormlyFieldTextComponent,
  FormlyFieldTimePickerComponent,
  FormlyFieldRateComponent,
  FormlyFieldTreeSelectComponent
} from './index';
import { IpValidator } from './utils/validator';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';

export function requiredValidationMessage(err: any, field: FormlyFieldConfig) {
  return `This field is required`;
}

export function minlengthValidationMessage(err: any, field: FormlyFieldConfig) {
  return `Should have atleast ${field.templateOptions?.minLength} characters`;
}

export function maxlengthValidationMessage(err: any, field: FormlyFieldConfig) {
  return `This value should be less than ${field.templateOptions?.maxLength} characters`;
}

export function minValidationMessage(err: any, field: FormlyFieldConfig) {
  return `This value should be more than ${field.templateOptions?.min}`;
}

export function maxValidationMessage(err: any, field: FormlyFieldConfig) {
  return `This value should be less than ${field.templateOptions?.max}`;
}

@NgModule({
  declarations: [
    NgFormRefDirective,
    WrapperComponent,
    FormlyFieldCustomComponent,
    FormlyFieldAlertComponent,
    FormlyFieldDatePickerComponent,
    FormlyFieldMultiCheckboxComponent,
    FormlyFieldSwitchComponent,
    FormlyFieldTextComponent,
    FormlyFieldPasswordComponent,
    FormlyFieldSliderComponent,
    FormlyFieldRadioButtonComponent,
    FormlyFieldDateRangePickerComponent,
    FormlyFieldTimePickerComponent,
    FormlyFieldCascaderComponent,
    FormlyFieldRateComponent,
    FormlyFieldTreeSelectComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FormlySelectModule,
    NzFormModule,
    ReactiveFormsModule,
    NzAlertModule,
    NzAutocompleteModule,
    NzButtonModule,
    NzCheckboxModule,
    NzInputModule,
    NzInputNumberModule,
    NzModalModule,
    NzPopoverModule,
    NzProgressModule,
    NzRadioModule,
    NzSelectModule,
    NzSliderModule,
    NzSpinModule,
    NzTableModule,
    NzTabsModule,
    NzToolTipModule,
    NzUploadModule,
    NzPipesModule,
    NzIconModule,
    NzDatePickerModule,
    NzSwitchModule,
    NzTimePickerModule,
    NzCascaderModule,
    NzRateModule,
    NzTreeSelectModule,
    FormlyModule.forChild({
      validators: [{ name: 'ip', validation: IpValidator }],
      validationMessages: [
        { name: 'required', message: requiredValidationMessage },
        { name: 'minlength', message: minlengthValidationMessage },
        { name: 'maxlength', message: maxlengthValidationMessage },
        { name: 'min', message: minValidationMessage },
        { name: 'max', message: maxValidationMessage }
      ],
      types: [
        {
          name: 'custom',
          component: FormlyFieldCustomComponent,
          wrappers: ['panel']
        },
        {
          name: 'alert',
          component: FormlyFieldAlertComponent,
          wrappers: ['panel']
        },
        {
          name: 'date-picker',
          component: FormlyFieldDatePickerComponent,
          wrappers: ['panel']
        },
        {
          name: 'date-range-picker',
          component: FormlyFieldDateRangePickerComponent,
          wrappers: ['panel']
        },
        {
          name: 'time-picker',
          component: FormlyFieldTimePickerComponent,
          wrappers: ['panel']
        },

        {
          name: 'multicheckbox',
          component: FormlyFieldMultiCheckboxComponent,
          wrappers: ['panel']
        },
        {
          name: 'switch',
          component: FormlyFieldSwitchComponent,
          wrappers: ['panel']
        },
        {
          name: 'text',
          component: FormlyFieldTextComponent,
          wrappers: ['panel']
        },
        {
          name: 'password',
          component: FormlyFieldPasswordComponent,
          wrappers: ['panel']
        },
        {
          name: 'slider',
          component: FormlyFieldSliderComponent,
          wrappers: ['panel']
        },
        {
          name: 'radio-button',
          component: FormlyFieldRadioButtonComponent,
          wrappers: ['panel']
        },
        {
          name: 'cascader',
          component: FormlyFieldCascaderComponent,
          wrappers: ['panel']
        },
        {
          name: 'rate',
          component: FormlyFieldRateComponent,
          wrappers: ['panel']
        },
        {
          name: 'tree-select',
          component: FormlyFieldTreeSelectComponent,
          wrappers: ['panel']
        }
      ],
      wrappers: [
        {
          name: 'panel',
          component: WrapperComponent
        }
      ]
    })
  ],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, NzFormModule, FormlyModule, NgFormRefDirective],
  providers: [FormRefSourceService]
})
export class NgFormModule {}
