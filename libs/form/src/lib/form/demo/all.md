---
order: 7
title:
  zh-CN: 可用表单元素
  en-US: Available Form elements
---

## zh-CN
显示可用的form元素

## en-US
Displays the available form elements

```ts
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions } from '@ngx-formly/core';
import { NgFormlyFieldConfig } from 'ng-galaxy-esd/form';

@Component({
  selector: 'app-demo-form-all',
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
    <ng-template ngFormRef="custom_template">
      <span>custom template</span>
    </ng-template>
    <ng-template ngFormRef="textarea"
      let-to="to" let-control="formControl" let-field="field">
      <nz-form-control>
        <textarea [ngStyle]="{'margin-bottom': '0'}" nz-input
          placeholder="{{ to.placeholder | translate }}"
          [formControl]="control" [cols]="to.cols" [rows]="to.rows || 4"
          class="form-control" [formlyAttributes]="field"></textarea>
      </nz-form-control>
    </ng-template>
    <ng-template ngFormRef="custom_action" let-item="item" let-index="index">
      <span>action-{{item.name}}</span>
    </ng-template>

    <ng-template ngFormRef="titleTemplateRender"><i nz-icon nzType="close"></i> Title</ng-template>
    <ng-template ngFormRef="contentTemplateRender"><i nz-icon nzType="check"></i> Content</ng-template>
    <ng-template ngFormRef="radioTitleTemplateRender">Title Render</ng-template>
    <ng-template ngFormRef="radioContentTemplateRender">Content Render</ng-template>
  `,
  styles: []
})
export class DemoFormAllComponent implements OnInit {
  result: string;
  model = {};
  options = <FormlyFormOptions>{};
  form = new FormGroup({});
  fields: NgFormlyFieldConfig[] = [{
    key: 'msg',
    type: 'alert',
    templateOptions: {
      nzType: 'info',
      nzMessage: 'Info Text',
    }
  }, {
    key: 'name',
    type: 'input',
    templateOptions: {
      label: 'Name',
      placeholder: 'Type $ to search...',
      required: true,
      arrangement: 'transverse',
      autoCompleteTriggerCharacter: '$',
      prompt: 'please input the name.',
      popoverTitle: 'title',
      popoverContent: 'content',
      autoCompleteExpression: (value) => {
        const items = [
          '${CICD_GIT_REPO_NAME}',
          '${CICD_GIT_URL}',
          '${CICD_GIT_COMMIT}',
          '${CICD_GIT_REF}',
          '${CICD_GIT_BRANCH}'
        ];
        return items.filter(item =>
          item.toLowerCase().includes(value.toLowerCase())
        );
      }
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
      popoverTitleRender: 'titleTemplateRender',
      popoverContentRender: 'contentTemplateRender',
    }
  }, {
    type: 'slider',
    key: 'slider',
    defaultValue: 6,
    templateOptions: {
        label: 'Slider',
        required: true,
        min: 1,
        max: 10,
        unit: 'GiB',
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
        message: () => 'please input number.',
      },
      valid: {
        expression: (c) => {
          return c.value > 5;
        },
        message: () => 'Please enter greater than 5.',
      }
    },
  }, {
    key: 'select1',
    type: 'select',
    defaultValue: '',
    templateOptions: {
      prompt: 'Please select a Hero',
      label: 'Select',
      allowClear: true,
      arrangement: 'transverse',
      options: [
        { label: 'Please select a Hero', value: '', disabled: true },
        { label: 'Iron Man', value: 'iron_man' },
        { label: 'Captain America', value: 'captain_america' },
        { label: 'Black Widow', value: 'black_widow' },
        { label: 'Hulk', value: 'hulk' },
        { label: 'Captain Marvel', value: 'captain_marvel' },
      ],
    },
  }, {
    key: 'select2',
    type: 'select',
    defaultValue: 'iron_man',
    templateOptions: {
      label: 'Select with custom name/value/group',
      arrangement: 'transverse',
      options: [
        { label: 'Iron Man', id: 'iron_man', gender: 'Male' },
        { label: 'Captain America', id: 'captain_america', gender: 'Male' },
        { label: 'Black Widow', id: 'black_widow', gender: 'Female' },
        { label: 'Hulk', id: 'hulk', gender: 'Male' },
        { label: 'Captain Marvel', id: 'captain_marvel', gender: 'Female' },
      ],
      groupProp: 'gender',
      valueProp: 'id',
      labelProp: 'label',
    },
  }, {
    key: 'multiselect',
    type: 'select',
    defaultValue: ['iron_man', 'captain_america'],
    templateOptions: {
      label: 'Multi-select',
      arrangement: 'transverse',
      multiple: true,
      required: true,
      allowClear: true,
      allowCheckAll: true,
      options: [
        { label: 'Iron Man', value: 'iron_man' },
        { label: 'Captain America', value: 'captain_america' },
        { label: 'Black Widow', value: 'black_widow', disabled: true},
        { label: 'Hulk', value: 'hulk' },
        { label: 'Captain Marvel', value: 'captain_marvel' },
      ]
    }
  }, {
    key: 'password',
    validators: {
      fieldMatch: {
        expression: (control) => {
          const value = control.value;
          return value.passwordConfirm === value.password
            || (!value.passwordConfirm || !value.password);
        },
        message: 'A matching confirmation password is required.',
        errorPath: 'passwordConfirm',
      },
    },
    fieldGroup: [
      {
        key: 'password',
        type: 'password',
        defaultValue: 'test@passw0rd',
        templateOptions: {
          label: 'Password',
          placeholder: 'Please enter your password',
          required: true,
          arrangement: 'transverse',
          checkPath: 'passwordConfirm',
          prompt: 'Please enter the password'
        },
        validators: {
          required: {
            expression: (c) => c.value !== '',
            message: () => 'Please enter your password',
          },
          valid: {
            expression: (c) => {
              if (c.value === null) {
                return true;
              }
              if (c.value.length < 8) {
                return false;
              }
              const pattern = /(?!^(\d+|[a-zA-Z]+|[~!@#$%+(=\-)^&*?]+)$)^[\w~!@#$%\+\(=\-\)\^&*?]+$/;
              return pattern.test(c.value);
            },
            message: () => 'Please enter your password correctly',
          },
        },
      },
      {
        key: 'passwordConfirm',
        type: 'password',
        defaultValue: 'test@passw0rd',
        templateOptions: {
          label: 'Confirm Password',
          placeholder: 'Please re-enter your password',
          required: true,
          arrangement: 'transverse'
        },
        validators: {
          required: {
            expression: (c) => c.value !== '',
            message: () => 'A matching confirmation password is required.',
          },
        },
      },
    ],
  }, {
    key: 'age',
    type: 'input',
    defaultValue: 40,
    templateOptions: {
      label: 'Age',
      type: 'number',
      required: true,
      placeholder: 'please input the age',
      arrangement: 'transverse',
      step: 1,
      nzMin: 1,
      nzMax: 40,
      disabled: false
    },
    validators: {
      required: {
        expression: (c) => {
          if (!c.value) {
            return false;
          }
          return true;
        },
        message: () => 'This field is required',
      },
      maxAge: {
        expression: (c) => {
          if (c.value && c.value > 40) {
            return false;
          }
          return true;
        },
        message: () => 'This value should be less than 40',
      },
      minAge: {
        expression: (c) => {
          if (c.value && c.value < 18) {
            return false;
          }
          return true;
        },
        message: () => 'This value should be more than 18',
      }
    }
  }, {
    key: 'ip',
    type: 'ip',
    defaultValue: '192.168.56.21',
    templateOptions: {
      label: 'IP',
      arrangement: 'transverse',
      placeholder: 'Please enter the IP',
      prompt: 'Please enter the IP',
      required: true,
      ipsDisabled: [true, false, false, false],
      ipsPattern: [/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/,
        /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/,
        /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/,
        /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/]
    },
    validators: {
      required: {
        expression: (c) => {
          if (c.value === null) {
            return false;
          }
          return true;
        },
        message: () => 'Please enter the IP.',
      },
      ips: {
        expression: (c, field) => {
          if (!c.value) {
            return true;
          }
          const ips = c.value.split('.');
          const ipFilter = field.templateOptions.ipsPattern.filter((item, index) => {
            return !item.test(ips[index]);
          });
          if (ipFilter.length) {
            return false;
          }
          return true;
        },
        message: () => 'Enter IP incorrectly.',
      },
    },
  },
  {
    key: 'ip1',
    type: 'ip',
    defaultValue: '192.168.56.21',
    templateOptions: {
      label: 'IP',
      arrangement: 'transverse',
      IPType: 'wrap',
      placeholder: 'Please enter the IP',
      required: true,
      ipsDisabled: [false, false, false, false],
      ipsPattern: [/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/,
        /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/,
        /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/,
        /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/]
    },
    validators: {
      required: {
        expression: (c) => {
          if (c.value === null) {
            return false;
          }
          return true;
        },
        message: () => 'Please enter the IP.',
      },
      ips: {
        expression: (c, field) => {
          if (!c.value) {
            return true;
          }
          const ips = c.value.split('.');
          const ipFilter = field.templateOptions.ipsPattern.filter((item, index) => {
            return !item.test(ips[index]);
          });
          if (ipFilter.length) {
            return false;
          }
          return true;
        },
        message: () => 'Enter IP incorrectly.',
      },
    },
  }, {
    key: 'cidr',
    type: 'cidr',
    defaultValue: '192.168.56.21/20',
    templateOptions: {
      label: 'cidr',
      arrangement: 'transverse',
      placeholder: 'Please enter the cidr',
      required: true,
      ipsDisabled: [false, false, false, false, false],
      ipsPattern: [/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/,
        /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/,
        /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/,
        /^(\d{1,2}|1\d\d|2[0-4]\d|250)$/,
        /^([2-9]|[1-2]\d)$/]
    },
    validators: {
      required: {
        expression: (c) => {
          if (c.value === null) {
            return false;
          }
          return true;
        },
        message: () => 'Please enter the cidr.',
      },
      ips: {
        expression: (c, field) => {
          if (!c.value) {
            return true;
          }
          const ips = c.value.replace(/\//g, '.').split('.');
          const ipFilter = field.templateOptions.ipsPattern.filter((item, index) => {
            return !item.test(ips[index]);
          });
          if (ipFilter.length) {
            return false;
          }
          return true;
        },
        message: () => 'Enter IP incorrectly.',
      }
    },
  }, {
    key: 'repeat',
    type: 'multiple-input',
    templateOptions: {
      label: 'Address(Limit: 3)',
      required: true,
      limit: 3,
      arrangement: 'transverse',
    },
    fieldArray: {
      fieldGroup: [
        {
          type: 'input',
          key: 'investmentName',
          templateOptions: {
            required: true,
            placeholder: 'Please enter the content',
          },
          validators: {
            required: {
              expression: (c) => {
                if (c.value === null) {
                  return false;
                }
                return true;
              },
              message: () => 'Please enter the content.',
            },
            valid: {
              expression: (c) => {
                const pattern = /^[\u4E00-\u9FA5a-zA-Z0-9-_.:]*$/;
                return pattern.test(c.value);
              },
              message: () => 'Incorrect input.',
            }
          },
        }
      ],
    },
  }, {
    key: 'file',
    type: 'upload',
    templateOptions: {
      required: true,
      arrangement: 'transverse',
      label: 'File',
    },
    validators: {
      required: {
        expression: (c) => {
          if (!c.value) {
            return false;
          }
          return true;
        },
        message: () => 'Please select a file',
      }
    }
  }, {
      key: 'preview',
      type: 'upload-picture',
      // defaultValue: [{
      //   name: 'haha.png',
      //   data: 'data:image/png;base64,...
      // }],
      templateOptions: {
        arrangement: 'transverse',
        label: 'Preview',
        nzLimit: 2,
        invalidIndex: [],
        prompt: 'It is recommended to upload PNG images'
      },
      hooks: {
        onInit: field => {
          field.templateOptions.loading = true;
          setTimeout(() => {
            field.formControl.setValue([{
              name: 'haha.png',
              data: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
            }]);
            field.templateOptions.loading = false;
          }, 2000);
        }
      },
      validators: {
        imageType: {
          expression: (c, field) => {
            if (c.value) {
              field.templateOptions.invalidIndex = [];
              for (let i = 0; i < c.value.length; i += 1) {
                const type = c.value[i].name.split('.').pop().toLowerCase();
                if (type !== 'png') {
                  field.templateOptions.invalidIndex.push(i);
                }
              }
            }
            if (field.templateOptions.invalidIndex.length) {
              return false;
            }
            return true;
          },
          message: () => 'Please upload PNG picture',
        }
      }
  }, {
    key: 'icon',
    type: 'upload-picture',
    templateOptions: {
      arrangement: 'transverse',
      label: 'Icon',
      nzLimit: 1,
      invalidIndex: [],
      uploadType: 'icon',
      prompt: 'It is recommended to upload PNG icon'
    },
    hooks: {
      onInit: field => {
        field.templateOptions.loading = true;
        setTimeout(() => {
          field.formControl.setValue([{
            name: 'haha.png',
            data: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
          }]);
          field.templateOptions.loading = false;
        }, 2000);
      }
    },
    validators: {
      imageType: {
        expression: (c, field) => {
          if (c.value) {
            field.templateOptions.invalidIndex = [];
            for (let i = 0; i < c.value.length; i += 1) {
              const type = c.value[i].name.split('.').pop().toLowerCase();
              if (type !== 'png') {
                field.templateOptions.invalidIndex.push(i);
              }
            }
          }
          if (field.templateOptions.invalidIndex.length) {
            return false;
          }
          return true;
        },
        message: () => 'Please upload PNG picture',
      }
    }
  }, {
    key: 'upload_file',
    type: 'upload-file',
    templateOptions: {
      required: true,
      arrangement: 'transverse',
      label: 'Upload File',
      placeholder: 'Please select a file',
      btnName: 'select file',
      disabled: false,
      prompt: 'Maximum file 10M'
    },
    validators: {
      required: {
        expression: (c) => {
          if (!c.value) {
            return false;
          }
          return true;
        },
        message: () => 'Please select a file',
      },
      maxSize: {
        expression: (c) => {
          const size = c.value ? c.value.size : 0;
          if (c.value && size >= 10 * 1024 * 1024) {
            return false;
          }
          return true;
        },
        message: () => 'Maximum file 10M',
      },
      checkPNG: {
        expression: (c) => {
          let name = '';
          if (c.value) {
            name = c.value.name.toLowerCase();
          }
          if (c.value && !name.endsWith('.png')) {
            return false;
          }
          return true;
        },
        message: () => 'Please upload PNG file',
      }
    }
  }, {
    key: 'num',
    type: 'radio',
    defaultValue: 'one',
    templateOptions: {
      prompt: 'Please select a num',
      label: 'Num',
      arrangement: 'transverse',
      options: [
        {
          label: 'one',
          value: 'one'
        },
        {
          label: 'two',
          value: 'two',
          optionPopoverTitle: 'title',
          optionPopoverContent: 'content'
        },
        {
          label: 'three',
          value: 'three',
          optionPopoverTitleRender: 'radioTitleTemplateRender',
          optionPopoverContentRender: 'radioContentTemplateRender'
        }
      ]
    }
  }, {
    key: 'like',
    type: 'checkbox',
    templateOptions: {
      label: 'Like',
      arrangement: 'transverse',
    }
  }, {
    key: 'color',
    type: 'multicheckbox',
    defaultValue: {'blue': true},
    templateOptions: {
      label: 'Num',
      arrangement: 'transverse',
      options: [
        {
          key: 'blue',
          label: 'blue'
        },
        {
          key: 'red',
          label: 'red'
        }
      ]
    }
  },
  {
    key: 'table',
    type: 'table',
    templateOptions: {
      defaultSort: 'created_at',
      column: [{
        name: 'Name',
        key: 'name',
      },
      {
        name: 'Time',
        key: 'created_at',
      },
      {
        name: 'Custom Action',
        key: 'action',
        render: 'custom_action',
      }],
      dataSet: [
        { id: 1, name: 'a1', created_at: '2020-08-01 20:00:00' },
        { id: 2, name: 'a2', created_at: '2020-08-01 20:00:01' },
      ],
    }
  },
  {
    key: 'custom',
    type: 'custom',
    templateOptions: {
      render: 'custom_template',
    }
  },
  {
    key: 'custom1',
    type: 'custom',
    templateOptions: {
      label: 'customParams',
      placeholder: 'please input the textarea',
      arrangement: 'transverse',
      render: 'textarea',
      required: true,
    },
    validators: {
      required: {
        expression: (c) => {
          if (c.value === null) {
            return false;
          }
          return true;
        },
        message: () => 'please input the textarea.',
      }
    }
  },
  {
    key: 'unfold',
    type: 'unfold',
    defaultValue: false,
    templateOptions: {
      content: 'Advanced Options',
    },
    hooks: {
      onInit: field => {
        const options = field.templateOptions;
        options.triggerUnfold = () => {
          field.formControl.setValue(!field.model.unfold);
        };
      }
    }
  }, {
    key: 'verify',
    type: 'verify',
    templateOptions: {
      btnName: 'verify',
      btnDisabled: false,
      loading: false,
      verifyResult: '',
      verifyStatus: '',
      param: {}
    },
    hooks: {
      onInit: field => {
        const options = field.templateOptions;
        options.verifyData = () => {
          options.btnName = 'verifying';
          options.verifyStatus = '';
          options.verifyResult = '';
          options.btnDisabled = true;
          options.loading = true;
          setTimeout(() => {
            options.btnName = 'verify';
            options.verifyStatus = 'success';
            options.verifyResult = 'pass';
            options.btnDisabled = false;
            options.loading = false;
          }, 2000);
        };
      }
    }
  }];

  constructor() { }

  ngOnInit() { }

  onSubmit(model) {
    this.result = JSON.stringify(model);
  }
}