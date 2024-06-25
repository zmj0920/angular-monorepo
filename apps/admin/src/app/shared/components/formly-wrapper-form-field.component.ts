import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'formly-wrapper-nz-form-field',
  template: `
    <nz-form-item>
      <ng-container *ngIf="props['label']">
        <nz-form-label
          [nzTooltipTitle]="props['nzTooltipTitle'] ? nzTooltipTitle : undefined"
          nzTooltipIcon="info-circle"
          [nzRequired]="props['required']"
          [nzFor]="id"
        >
          {{ props['label'] }}
        </nz-form-label>
        <ng-template #nzTooltipTitle>
          {{ props['nzTooltipTitle'] }}
        </ng-template>
      </ng-container>
      <nz-form-control
        [nzValidateStatus]="errorState"
        nzExtra="nzExtra"
        [nzErrorTip]="errorTpl"
      >
        <ng-container #fieldComponent></ng-container>
        <ng-template #errorTpl let-control>
          <formly-validation-message
            [field]="field"
          ></formly-validation-message>
        </ng-template>
        <ng-template #nzExtra>
          {{ props['nzExtra'] }}
        </ng-template>
      </nz-form-control>
    </nz-form-item>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyWrapperFormFieldComponent extends FieldWrapper {
  get errorState() {
    return this.showError ? 'error' : '';
  }
}
