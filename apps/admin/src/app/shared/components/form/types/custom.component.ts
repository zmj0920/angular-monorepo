import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { FormRefSourceService } from '../ng-form-ref.directive';

@Component({
  selector: 'ng-formly-field-custom',
  template: `
    <ng-template
      [ngTemplateOutlet]="getTemplate(props['render'])"
      [ngTemplateOutletContext]="{
        props: props,
        formControl: formControl,
        field: field
      }"
    >
      >
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormlyFieldCustomComponent extends FieldType {
  constructor(private dataSource: FormRefSourceService) {
    super();
  }

  getTemplate(key: string) {
    return this.dataSource.getRender(key);
  }
}
