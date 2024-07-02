import { Component, Type } from '@angular/core';
import { FieldType, FieldTypeConfig, FormlyFieldConfig, FormlyFieldProps } from '@ngx-formly/core';

interface PasswordFieldProps extends FormlyFieldProps {}

export interface FormlyPasswordFieldConfig extends FormlyFieldConfig<PasswordFieldProps> {
  type: 'password' | Type<FormlyFieldPasswordComponent>;
}

@Component({
  selector: 'ng-formly-field-password',
  template: `
    <nz-input-group [nzSuffix]="suffixTemplate">
      <input
        [formlyAttributes]="field"
        [formControl]="formControl"
        [type]="passwordVisible ? 'text' : 'password'"
        nz-input
        placeholder="input password"
        [(ngModel)]="password"
      />
    </nz-input-group>
    <ng-template #suffixTemplate>
      <span
        nz-icon
        [nzType]="passwordVisible ? 'eye-invisible' : 'eye'"
        (click)="passwordVisible = !passwordVisible"
      ></span>
    </ng-template>
  `,
  styles: [
    `
      i {
        cursor: pointer;
      }
    `
  ]
})
export class FormlyFieldPasswordComponent extends FieldType<FieldTypeConfig<PasswordFieldProps>> {
  passwordVisible = false;
  password?: string;
}
