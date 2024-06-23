

import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

import { FormRefSourceService } from '../directive/ng-form-ref.directive';

@Component({
  selector: 'ng-formly-field-custom',
  template: `
    <div class="custom-item">
      <ng-template
        [ngTemplateOutlet]="getTemplate(to.render)"
        [ngTemplateOutletContext]="{to: to, formControl: formControl, field: field}">
      </ng-template>
    </div>
  `,
  styles: [
    `.custom-item {
        line-height: 1;
      }
    `
  ]
})
export class FormlyFieldCustomComponent extends FieldType {

  constructor(
    private dataSource: FormRefSourceService,
  ) {
    super();
  }

  getTemplate(key: string) {
    return this.dataSource.getRender(key);
  }
}
