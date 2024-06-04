import { AbstractControl } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';


export interface FormFieldConfig extends FormlyFieldConfig {
  validators?: {
    [key: string]: { expression: (control: AbstractControl, field: FormFieldConfig) => boolean, message: string | (() => string) };
  };
}
