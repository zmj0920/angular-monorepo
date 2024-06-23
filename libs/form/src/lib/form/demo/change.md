---
order: 4
title:
  zh-CN: 生命周期内数据更新
  en-US: lifecycle data update
---

## zh-CN
值变化触发方法

## en-US
Value change triggering method

```ts
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions } from '@ngx-formly/core';
import { takeUntil, tap } from 'rxjs/operators';
import { NgFormlyFieldConfig } from 'ng-galaxy-esd/form';

@Component({
  selector: 'app-demo-form-change',
  template: `
    <form nz-form [formGroup]="form">
      <formly-form
        [model]="model"
        [fields]="fields"
        [options]="options"
        [form]="form">
      </formly-form>
    </form>
    <div>{{result}}</div>
  `,
  styles: []
})
export class DemoFormChangeComponent implements OnInit {
  result: string;
  model = {};
  options = <FormlyFormOptions>{};
  form = new FormGroup({});
  fields: NgFormlyFieldConfig[] = [
    {
      key: 'hero',
      type: 'select',
      defaultValue: '',
      templateOptions: {
        required: true,
        label: 'Hero',
        options: [],
        arrangement: 'transverse',
      },
      hooks: {
        onInit: field => {
          field.templateOptions.loading = true;
          setTimeout(() => {
            field.templateOptions.options = [
              { label: 'Iron Man', value: 'iron_man' },
              { label: 'Captain America', value: 'captain_america' },
              { label: 'Black Widow', value: 'black_widow' },
              { label: 'Hulk', value: 'hulk' },
              { label: 'Captain Marvel', value: 'captain_marvel' }
            ];
            field.formControl.setValue('iron_man');
            field.templateOptions.loading = false;
          }, 5000);

          field.formControl.valueChanges.pipe(
            tap(item => {
              this.result=item;
            })
          ).subscribe();
        }
      }
    }
  ];

  constructor() { }

  ngOnInit() { }

}