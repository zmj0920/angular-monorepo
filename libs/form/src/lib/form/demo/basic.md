---
order: 1
title:
  zh-CN: 基本用法
  en-US: Basic Usage
---

## zh-CN
在页面生成表单。
需要在templateOptions中设置arrangement: 'transverse'，以水平方式显示元素

## en-US
Generate the form on the page.
Need to set up 'arrangement: transverse' in the templateOptions, display elements in horizontal way

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
      }
    }
  }, {
    key: 'description',
    type: 'textarea',
    defaultValue: '',
    templateOptions: {
      label: 'Description',
      placeholder: 'please input the description',
      arrangement: 'transverse',
    }
  }];

  constructor() { }

  ngOnInit() { }

  onSubmit(model) {
    this.result = JSON.stringify(model);
  }
}