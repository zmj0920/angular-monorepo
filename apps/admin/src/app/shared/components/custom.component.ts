import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { FormRefSourceService } from '../directives';

@Component({
  selector: 'ng-formly-field-custom',
  template: `
    <div class="custom-item">
      <ng-template
        [ngTemplateOutlet]="getTemplate(props['render'])"
        [ngTemplateOutletContext]="{
          props: this.props,
          formControl: this.formControl,
          field: this.field
        }"
      >
        >
      </ng-template>
    </div>
  `,
})
export class FormlyFieldCustomComponent extends FieldType {
  constructor(private dataSource: FormRefSourceService) {
    super();
  }

  getTemplate(key: string) {
    return this.dataSource.getRender(key);
  }
}
