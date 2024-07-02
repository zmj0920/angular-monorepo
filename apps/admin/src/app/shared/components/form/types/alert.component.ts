import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { NzConfigService } from 'ng-zorro-antd/core/config';

@Component({
  selector: 'formly-field-alert',
  template: `
    <div class="formly-alert">
      <nz-alert
        [nzType]="props['nzType']"
        [nzShowIcon]="props['nzShowIcon']"
        [nzMessage]="props['nzMessage']"
        [nzDescription]="props['nzDescription']"
        [formlyAttributes]="field"
      ></nz-alert>
    </div>
  `,
  styles: [
    `
      ::ng-deep .formly-alert .ant-alert-message {
        color: rgba(0, 0, 0, 0.6);
      }
    `
  ]
})
export class FormlyFieldAlertComponent extends FieldType implements OnInit {
  constructor(private nzConfigService: NzConfigService) {
    super();
  }
  ngOnInit(): void {
    if (this.props['nzShowIcon'] === undefined) {
      this.props['nzShowIcon'] = this.nzConfigService.getConfigForComponent('alert')?.nzShowIcon;
    }
    this.props['nzType'] = this.props['nzType'] || 'info';
  }
}
