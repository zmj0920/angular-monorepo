---
order: 5
title:
  zh-CN: 验证
  en-US: Validators
---

## zh-CN
Form元素验证

## en-US
Form element validation

```ts
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions } from '@ngx-formly/core';
import { NgFormlyFieldConfig } from 'ng-galaxy-esd/form';

@Component({
  selector: 'app-demo-form-validators',
  template: `
    <form nz-form [formGroup]="form" (ngSubmit)="onSubmit(model)">
      <formly-form
        [model]="model"
        [fields]="fields"
        [options]="options"
        [form]="form">
      </formly-form>
      <button nz-button nzType="primary" [nzType]="'primary'" [disabled]="form.invalid">
        Submit
      </button>
    </form>
    <div>{{result}}</div>
  `,
  styles: []
})
export class DemoFormValidatorsComponent implements OnInit {
  result: string;
  model = {};
  options = <FormlyFormOptions>{};
  form = new FormGroup({});
  fields: NgFormlyFieldConfig[] = [{
    key: 'name',
    type: 'input',
    templateOptions: {
      label: 'Name',
      placeholder: 'please input the name',
      required: true,
      arrangement: 'transverse',
    },
    validators: {
      required: {
        expression: (c) => {
          if (c.value === null) {
            return false;
          }
          return true;
        },
        message: () => 'please input the name.',
      },
      maxLength: {
        expression: (c) => {
          if (c.value === null || c.value.length <= 5) {
            return true;
          }
          return false;
        },
        message: () => 'More than 5 characters',
      },
      valid: {
        expression: (c) => {
          const pattern = /(^[1-9]+\d*$)/;
          return pattern.test(c.value);
        },
        message: () => 'Please enter a number'
      },
    }
  }];

  constructor() { }

  ngOnInit() { }

  onSubmit(model) {
    this.result = JSON.stringify(model);
  }
}