import { ChangeDetectionStrategy, Component, Type } from '@angular/core';
import { FieldType, FieldTypeConfig, FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyFieldProps } from '@ngx-formly/ng-zorro-antd/form-field';
interface PasswordFieldProps extends FormlyFieldProps {
  nzPlaceHolder: string | undefined;
}

export interface FormlyPasswordFieldConfig extends FormlyFieldConfig<PasswordFieldProps> {
  type: 'password' | Type<FormlyFieldPasswordComponent>;
}

@Component({
  selector: 'ng-formly-field-password',
  template: `
    <nz-input-group [nzSuffix]="suffixTemplate">
      <input
        nz-input
        [formlyAttributes]="field"
        [formControl]="formControl"
        [type]="passwordVisible ? 'text' : 'password'"
        [placeholder]="props.nzPlaceHolder || props.placeholder"
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
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormlyFieldPasswordComponent extends FieldType<FieldTypeConfig<PasswordFieldProps>> {
  passwordVisible = false;
}
