

import { Component, DoCheck, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormlyFieldConfig, FormlyTemplateOptions } from '@ngx-formly/core';
import { Observable } from 'rxjs';
import * as _ from 'lodash-es';

import { NgFieldMultiCheckboxType } from '../ng-field.type';

@Component({
  selector: 'ng-formly-field-multicheckbox',
  template: `
    <div class="app-formly-field-multi-checkbox">
      <label nz-checkbox *ngFor="let option of to.options; let i = index;" [formlyAttributes]="field"
      [formControl]="formControl.get(option.key)" [nzDisabled]="option.disabled">
        <span>
          {{ option.label | translate }}
          <ng-container *ngIf="to.required && to.hideRequiredMarker !== true">*</ng-container>
        </span>
        <span class="custom-control-indicator"></span>
      </label>
    </div>
  `,
  styles: [
    `::ng-deep .app-formly-field-multi-checkbox .ant-form-item-control {
      line-height: 18px;
    }`
  ]
})
export class FormlyFieldMultiCheckboxComponent extends NgFieldMultiCheckboxType implements OnInit, DoCheck {
  optionsTmp: FormlyTemplateOptions = [];

  prePopulate(field: FormlyFieldConfig) {
    if (field.formControl || !field.templateOptions) {
      return;
    }
    if (!(field.templateOptions.options instanceof Observable)) {
      const model = field.parent!.model[field.key + ''] || {};
      const controlGroupConfig = field.templateOptions.options!.reduce((previous, option) => {
        previous[option.key] = new FormControl(model ? model[option.key] : undefined);
        return previous;
      }, {});

      field.formControl = new FormGroup(
        controlGroupConfig,
        field.validators ? field.validators.validation : undefined,
        field.asyncValidators ? field.asyncValidators.validation : undefined,
      );
    } else {
      throw new Error(`[Formly Error] You cannot pass an Observable to a multicheckbox yet.`);
    }
  }

  ngOnInit() {
    setTimeout(() => {
      if (this.to.arrangement === 'transverse') {
        this.to.formlyLabelStyle = this.to.formlyLabelStyle || {lineHeight: '18px'};
      }
    });
  }

  ngDoCheck() {
    if (this.field?.formControl && !(this.field.templateOptions!.options instanceof Observable) &&
      !_.isEqual(this.field.templateOptions!.options, this.optionsTmp)) {
      const model = this.field.model[this.field.key + ''] || {};
      Object.keys((this.field.formControl as FormGroup).controls).forEach(key => {
        (this.field.formControl as FormGroup).removeControl(key);
      });
      this.field.templateOptions!.options!.forEach(option => {
        (this.field.formControl as FormGroup).setControl(option.key,
          new FormControl(model ? model[option.key] : undefined));
      });
      this.optionsTmp = this.field.templateOptions!.options!.filter(f => f);
    }
  }
}
