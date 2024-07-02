

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzI18nModule } from 'ng-zorro-antd/i18n';
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
// import { TranslateModule } from '@ngx-translate/core';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
// import { NgCoreModule } from 'ng-galaxy-esd/core';
// import { NgI18nModule } from 'ng-galaxy-esd/i18n';
// import { NgIconModule } from 'ng-galaxy-esd/icon';
// import { NgTableModule } from 'ng-galaxy-esd/table';
import { NzFormModule } from 'ng-zorro-antd/form';
// import { NgCommonWidgetsModule } from 'ng-galaxy-esd/common/widgets';

import { NzModalCustomComponent } from './modal-form/nz-modal-custom.component';
import { NgModalFormService } from './ng-modal-form.service';
import { FormlyWrapperFormFieldComponent } from './wrapper/panel-wrapper.component';
import { FormlySelectOptionsPipe } from './pipe/select-options.pipe';
import { FormlyFieldCheckboxComponent } from './types/checkbox.component';
import { FormlyFieldInputComponent } from './types/input.component';
import { FormlyFieldMultiCheckboxComponent } from './types/multicheckbox.component';
import { FormlyFieldRadioComponent } from './types/radio.component';
import { FormlyFieldSelectComponent } from './types/select.component';
import { FormlyFieldSliderComponent } from './types/slider.component';
import { FormlyFieldPasswordComponent } from './types/password.component';
import { FormlyFieldUploadComponent } from './types/upload.component';
import { FormlyFieldUploadPictureComponent } from './types/upload-picture.component';
import { FormlyFieldUploadFileComponent } from './types/upload-file/upload-file.component';
import { FormlyFieldImageComponent } from './types/image.component';
import { FormlyFieldVerifyComponent } from './types/verify.component';
import { FormlyFieldUnfoldComponent } from './types/unfold.component';
import { FormlyFieldIPComponent } from './types/ip.component';
import { FormlyFieldMultipleInputComponent } from './types/multiple-input.component';
import { FormlyFieldTableComponent } from './types/table.component';
import { FormlyFieldCustomComponent } from './types/custom.component';
import { FormlyFieldCidrComponent } from './types/cidr.component';
import { NgFormRefDirective, FormRefSourceService } from './directive/ng-form-ref.directive';
import { CustomAutoCompleteComponent } from './types/custom-auto-complete.component';
import { TextInputAutocompleteDirective } from './components/text-input-autocomplete/text-input-autocomplete.directive';
import { TextInputAutocompleteContainerComponent } from './components/text-input-autocomplete/text-input-autocomplete-container.component';
import { TextInputAutocompleteMenuComponent } from './components/text-input-autocomplete/text-input-autocomplete-menu.component';


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
    FormlySelectOptionsPipe,
    FormlyWrapperFormFieldComponent,
    FormlyFieldCheckboxComponent,
    FormlyFieldInputComponent,
    FormlyFieldMultiCheckboxComponent,
    FormlyFieldRadioComponent,
    FormlyFieldSelectComponent,
    FormlyFieldSliderComponent,
    FormlyFieldPasswordComponent,
    FormlyFieldUploadComponent,
    FormlyFieldUploadPictureComponent,
    FormlyFieldUploadFileComponent,
    FormlyFieldImageComponent,
    FormlyFieldVerifyComponent,
    FormlyFieldUnfoldComponent,
    FormlyFieldIPComponent,
    FormlyFieldMultipleInputComponent,
    FormlyFieldTableComponent,
    FormlyFieldCustomComponent,
    FormlyFieldCidrComponent,
    NzModalCustomComponent,
    NgFormRefDirective,
    CustomAutoCompleteComponent,
    TextInputAutocompleteDirective,
    TextInputAutocompleteContainerComponent,
    TextInputAutocompleteMenuComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NzFormModule,
    ReactiveFormsModule,
    NzAlertModule,
    NzAutocompleteModule,
    NzButtonModule,
    NzCheckboxModule,
    NzI18nModule,
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
    // TranslateModule,
    // NgCoreModule,
    // NgI18nModule,
    // NgIconModule,
    // NgTableModule,
    // NgCommonWidgetsModule,
    FormlyModule.forRoot({
      validationMessages: [
        { name: 'required', message: requiredValidationMessage },
        { name: 'minlength', message: minlengthValidationMessage },
        { name: 'maxlength', message: maxlengthValidationMessage },
        { name: 'min', message: minValidationMessage },
        { name: 'max', message: maxValidationMessage }
      ],
      types: [
        // { name: 'checkbox', component: FormlyFieldCheckboxComponent, wrappers: ['form-field'] },
        { name: 'date', component: FormlyFieldDateComponent, wrappers: ['form-field'] },
        { name: 'input', component: FormlyFieldInputComponent, wrappers: ['form-field'] },
        { name: 'multicheckbox', component: FormlyFieldMultiCheckboxComponent, wrappers: ['form-field'] },
        { name: 'radio', component: FormlyFieldRadioComponent, wrappers: ['form-field'] },
        // { name: 'select', component: FormlyFieldSelectComponent, wrappers: ['form-field'] },
        { name: 'table', component: FormlyFieldTableComponent, wrappers: ['form-field'] },
        { name: 'custom', component: FormlyFieldCustomComponent, wrappers: ['form-field'] },
        { name: 'slider', component: FormlyFieldSliderComponent, wrappers: ['form-field'] },
        { name: 'textarea', component: FormlyFieldTextAreaComponent, wrappers: ['form-field'] },
        { name: 'text', component: FormlyFieldTextComponent, wrappers: ['form-field'] },
        { name: 'password', component: FormlyFieldPasswordComponent, wrappers: ['form-field'] },
        { name: 'upload', component: FormlyFieldUploadComponent, wrappers: ['form-field'] },
        { name: 'image', component: FormlyFieldImageComponent, wrappers: ['form-field'] },
        { name: 'upload-file', component: FormlyFieldUploadFileComponent, wrappers: ['form-field'] },
        { name: 'upload-picture', component: FormlyFieldUploadPictureComponent, wrappers: ['form-field'] },
        { name: 'verify', component: FormlyFieldVerifyComponent, wrappers: ['form-field'] },
        { name: 'unfold', component: FormlyFieldUnfoldComponent, wrappers: ['form-field'] },
        { name: 'ip', component: FormlyFieldIPComponent, wrappers: ['form-field'] },
        { name: 'multiple-input', component: FormlyFieldMultipleInputComponent, wrappers: ['form-field'] },
        // { name: 'alert', component: FormlyFieldAlertComponent, wrappers: ['form-field'] },
        { name: 'cidr', component: FormlyFieldCidrComponent, wrappers: ['form-field'] },
      ],
      wrappers: [
        { name: 'form-field', component: FormlyWrapperFormFieldComponent },
      ],
    }),
  ],
  exports: [
    CommonModule,
    NzFormModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyModule,
    NgFormRefDirective,
    TextInputAutocompleteDirective,
    TextInputAutocompleteContainerComponent,
    TextInputAutocompleteMenuComponent
  ],
  // entryComponents: [
  //   NzModalCustomComponent,
  //   CustomAutoCompleteComponent
  // ],
  providers: [
    FormRefSourceService,
    NgModalFormService,
  ],
})
export class NgFormModule { }
