---
order: 2
title:
  zh-CN: 表达式属性
  en-US: Expression Properties
---

## zh-CN
使用expressionProperties

## en-US
Using expressionProperties

```ts
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions } from '@ngx-formly/core';
import { NgFormlyFieldConfig } from 'ng-galaxy-esd/form';

@Component({
  selector: 'app-demo-form-expression',
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
export class DemoFormExpressionComponent implements OnInit {
  result: string;
  model = {};
  options = <FormlyFormOptions>{};
  form = new FormGroup({});
  fields: NgFormlyFieldConfig[] = [
    {
      key: 'text',
      type: 'input',
      templateOptions: {
        label: 'Text',
        arrangement: 'transverse',
        placeholder: 'Type here to see the other field become enabled...',
      },
    },
    {
      key: 'text2',
      type: 'input',
      templateOptions: {
        label: 'Hey!',
        arrangement: 'transverse',
        placeholder: 'This one is disabled if there is no text in the other input',
      },
      expressionProperties: {
        'templateOptions.disabled': '!model.text',
      },
    }];

  constructor() { }

  ngOnInit() { }

  onSubmit(model) {
    this.result = JSON.stringify(model);
  }
}