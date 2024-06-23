

import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'ng-formly-field-text',
  template: `
    <div class="app-formly-field-input">
      {{ formControl.value }}
    </div>
  `,
  styles: [
    `::ng-deep .app-formly-field-input > .ant-form-item-control {
      line-height: 12px;
    }`
  ]
})
export class FormlyFieldTextComponent extends FieldType implements OnInit {
  ngOnInit() {
    setTimeout(() => {
      if (this.to.arrangement === 'transverse') {
        this.to.formlyLabelStyle = this.to.formlyLabelStyle || {lineHeight: '12px'};
      }
    });
  }
}
