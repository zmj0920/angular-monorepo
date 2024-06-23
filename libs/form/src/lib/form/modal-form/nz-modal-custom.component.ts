

import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';

@Component({
  templateUrl: './nz-modal-custom.component.html',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
})
export class NzModalCustomComponent implements OnInit {
  @Input() model!: object;
  @Input() fields!: FormlyFieldConfig[];
  @Input() options!: FormlyFormOptions;
  @Input() form!: FormGroup | FormArray;
  @Input() tabs?: Array<{
    label: string;
    fields: FormlyFieldConfig[];
  }>;
  @Input() type!: string;
  @Input() errorMessage?: string;
  @Input() showMessage?: boolean;
  formArray?: FormArray;
  optionsArray?: FormlyFormOptions[];

  ngOnInit() {
    if (this.tabs?.length) {
      this.formArray = this.form as FormArray;
      this.optionsArray = this.options as FormlyFormOptions[];
    }
  }
}
