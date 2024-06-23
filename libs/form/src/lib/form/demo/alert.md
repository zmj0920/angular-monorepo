---
order: 6
title:
  zh-CN: 警告提示用法
  en-US: Alert Usage
---

## zh-CN
在fields中配置type:alert,实现警告提示功能
<div>nzType: success、info、warning、error</div>

## en-US
Configuration in the fields 'type: alert'
<div>nzType: success、info、warning、error</div>

```ts
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions } from '@ngx-formly/core';
import { NgFormlyFieldConfig } from 'ng-galaxy-esd/form';

@Component({
  selector: 'app-demo-form',
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
export class DemoFormComponent implements OnInit {
  result: string;
  model = {};
  options = <FormlyFormOptions>{};
  form = new FormGroup({});
  fields: NgFormlyFieldConfig[] = [{
    key: 'msg1',
    type: 'alert',
    templateOptions: {
      nzType: 'success',
      nzMessage: 'Success Text',
    },
    hideExpression: 'model.isShow!=="show"'
  }, {
    key: 'msg1',
    type: 'alert',
    templateOptions: {
      nzType: 'info',
      nzMessage: 'Info Text',
    },
    hideExpression: 'model.isShow!=="show"'
  }, {
    key: 'msg1',
    type: 'alert',
    templateOptions: {
      nzType: 'warning',
      nzMessage: 'Warning Text',
    },
    hideExpression: 'model.isShow!=="show"'
  }, {
    key: 'msg1',
    type: 'alert',
    templateOptions: {
      nzType: 'error',
      nzMessage: 'Error Text',
    },
    hideExpression: 'model.isShow!=="show"'
  }, {
    key: 'isShow',
    type: 'radio',
    defaultValue: 'show',
    templateOptions: {
      label: 'Show Alert',
      arrangement: 'transverse',
      options: [
        {
          label: 'show',
          value: 'show'
        },
        {
          label: 'hide',
          value: 'hide'
        }
      ]
    }
  }];

  constructor() { }

  ngOnInit() { }

  onSubmit(model) {
    this.result = JSON.stringify(model);
  }
}