import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyWrapperFormFieldComponent } from '../../shared/components';

@Component({
  selector: 'app-custom-form',
  templateUrl: './custom-form.component.html',
  styleUrl: './custom-form.component.scss',
})
export class CustomFormComponent {
  form = new FormGroup({});
  model = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'input',
      type: 'input',
      templateOptions: {
        label: 'Input',
        placeholder: 'Input placeholder',
        required: true,
      },
      validation: {
        messages: {
          required: '请输入姓名',
        },
      },
    },
    {
      key: 'textarea',
      type: 'textarea',
      templateOptions: {
        label: 'Textarea',
        placeholder: 'Textarea placeholder',
        required: true,
      },
      validation: {
        messages: {
          required: '请输入',
        },
      },
    },
    {
      key: 'checkbox',
      type: 'checkbox',
      templateOptions: {
        label: 'Checkbox',
      },
    },
    {
      key: 'select',
      type: 'select',
      templateOptions: {
        label: 'Select',
        placeholder: 'Select placeholder',
        required: true,
        options: [
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
          { label: 'Option 3', value: '3' },
        ],
        change: (field, e) => {
         console.log(field)
         console.log(e)
        },
      },
      validation: {
        messages: {
          required: '请输入选择',
        },
      },
    },
    {
      key: 'radio',
      type: 'radio',
      templateOptions: {
        label: 'Radio',
        required: true,
        options: [
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
        ],
      },
      validation: {
        messages: {
          required: '请输入选择',
        },
      },
    },
    {
      key: 'custom',
      type: 'input',
      templateOptions: {
        label: 'custom',
        placeholder: 'Input placeholder',
        required: true,
      },
      validation: {
        messages: {
          required: '请输入姓名',
        },
      },
      wrappers:['custom']
    },
    
  ];

  onSubmit() {
    if (this.form.valid) {
      alert(JSON.stringify(this.model, null, 2));
    }
  }
}
