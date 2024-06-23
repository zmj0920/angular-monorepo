---
order: 3
title:
  zh-CN: 隐藏属性
  en-US: Hidden
---

## zh-CN
使用hideExpression

## en-US
Using hideExpression

```ts
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions } from '@ngx-formly/core';
import { NgFormlyFieldConfig } from 'ng-galaxy-esd/form';

@Component({
  selector: 'app-demo-form-hide',
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
export class DemoFormHideComponent implements OnInit {
  result: string;
  model = {};
  options = <FormlyFormOptions>{};
  form = new FormGroup({});
  fields: NgFormlyFieldConfig[] = [
    {
      key: 'name',
      type: 'input',
      templateOptions: {
        label: 'Name',
        arrangement: 'transverse',
        placeholder: 'Type in here to display the hidden field',
      },
    },
    {
      key: 'like',
      type: 'checkbox',
      templateOptions: {
        label: 'Like',
        arrangement: 'transverse',
      },
      hideExpression: '!model.name',
    }];

  constructor() { }

  ngOnInit() { }

  onSubmit(model) {
    this.result = JSON.stringify(model);
  }
}