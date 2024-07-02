import { Component, Type } from '@angular/core';
import { FieldType, FieldTypeConfig, FormlyFieldConfig, FormlyFieldProps } from '@ngx-formly/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

interface TextFieldProps extends FormlyFieldProps {
  ngClass?:
    | string
    | string[]
    | Set<string>
    | {
        [key: string]: NzSafeAny;
      };

  ngStyle?: {
    [key: string]: any;
  } | null;
  defaultText?: string;
  format: string;
}

export interface FormlyTextFieldConfig extends FormlyFieldConfig<TextFieldProps> {
  type: 'text' | Type<FormlyFieldTextComponent>;
}

@Component({
  selector: 'nz-formly-text',
  template: `
    <nz-form-text class="wrap-text" [formlyAttributes]="field" [ngClass]="props.ngClass" [ngStyle]="props.ngStyle">
      {{ text }}
    </nz-form-text>
  `,
  styles: [
    `
      .wrap-text {
        word-break: break-all;
      }
    `
  ]
})
export class FormlyFieldTextComponent extends FieldType<FieldTypeConfig<TextFieldProps>> {
  get text() {
    const value = this.formControl!.value;
    const format = this.props.format;
    if (this.props.format) {
      return this.model[format] || value || this.props.defaultText;
    } else {
      return value || this.props.defaultText;
    }
  }
}
