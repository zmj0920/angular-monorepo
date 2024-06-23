

import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'ng-formly-field-image',
  template: `
    <div class="text">
      <img [src]="formControl.value" [ngStyle]="{'max-wdith': to.maxWidth || '100px', 'max-height': to.maxHeight || '100px'}">
    </div>
  `,
  styles: [
    `.text {
        line-height: 1;
    }`
  ]
})
export class FormlyFieldImageComponent extends FieldType {
}
