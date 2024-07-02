import {
  AfterRenderPhase,
  Component,
  ElementRef,
  Input,
  afterRender,
  booleanAttribute,
  numberAttribute,
  output
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';

function trimString(value: string | undefined) {
  return value?.trim() ?? '';
}

@Component({
  selector: 'app-custom-form',
  templateUrl: './custom-form.component.html',
  styleUrl: './custom-form.component.scss'
  // standalone: true  //独立组件
})
export class CustomFormComponent {
  // alias别名
  onNameChange = output<string>({
    alias: 'ngxNameChange'
  });
  // @Input({required: true}) value = 0; //必须始终具有值
  // transform 函数来在 Angular 设置输入时更改输入的值。
  @Input({ transform: (val: any) => trimString(val), alias: 'sliderValue' })
  label = '';
  // booleanAttribute 模拟了标准 HTML 布尔属性 的行为，属性的 存在表示 "true" 值。然而，Angular 的
  // booleanAttribute 将字面字符串 "false" 视为布尔值 false。
  // numberAttribute 尝试将给定值解析为数字，如果解析失败则产生 NaN。
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input({ transform: numberAttribute }) number = 0;
  // afterRender 和 afterNextRender 必须在 注入上下文中调用，通常是在组件的构造函数中。
  // afterNextRender	当所有组件都已渲染到 DOM 时运行一次。
  // afterRender	每次所有组件都渲染到 DOM 时运行。
  inputValue?: string;
  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};

  fields: FormlyFieldConfig[] = [
    {
      key: 'Alert',
      type: 'alert',
      props: {
        nzType: 'success',
        nzMessage: 'Success Text'
      }
    },
    {
      key: 'password',
      type: 'password',
      templateOptions: {
        label: 'Password',
        placeholder: 'Password placeholder',
        required: true,
        nzTooltipIcon: {
          type: 'info-circle',
          theme: 'twotone'
        },
        nzTooltipTitle: 'custom_template',
        nzExtra: '说明'
      },
      validation: {
        messages: {
          required: '请输入密码'
        }
      }
    },
    {
      key: 'input',
      type: 'input',
      templateOptions: {
        label: 'Input',
        placeholder: 'Input placeholder',
        required: true,
        nzTooltipIcon: {
          type: 'info-circle',
          theme: 'twotone'
        },
        nzTooltipTitle: 'custom_template',
        nzHasFeedback: true,
        nzExtra: '说明'
      },
      wrappers: ['panel'],
      validation: {
        messages: {
          required: '请输入姓名'
        }
      }
    },
    {
      key: 'number',
      type: 'input',
      templateOptions: {
        label: 'number',
        placeholder: 'Input placeholder',
        type: 'number',
        required: true
      },
      // validators: {
      //   required: {
      //     expression: (c: { value: any }) => {
      //       if (!c.value) {
      //         return false;
      //       }
      //       return true;
      //     },
      //     message: () => 'This field is required',
      //   },
      //   maxAge: {
      //     expression: (c: { value: number }) => {
      //       if (c.value && c.value > 40) {
      //         return false;
      //       }
      //       return true;
      //     },
      //     message: () => 'This value should be less than 40',
      //   },
      //   minAge: {
      //     expression: (c: { value: number }) => {
      //       if (c.value && c.value < 18) {
      //         return false;
      //       }
      //       return true;
      //     },
      //     message: () => 'This value should be more than 18',
      //   },
      // },
      validation: {
        messages: {
          required: '请输入'
        }
      }
    },
    {
      key: 'textarea',
      type: 'textarea',
      templateOptions: {
        label: 'Textarea',
        placeholder: 'Textarea placeholder',
        required: true
      },
      validation: {
        messages: {
          required: '请输入'
        }
      }
    },
    {
      key: 'checkbox',
      type: 'multicheckbox',
      defaultValue: ['red'],
      templateOptions: {
        label: 'Checkbox',
        required: true,
        change: (f, v: any) => {
          if (v) {
            console.log(v);
          }
        },
        options: [
          {
            value: 'blue',
            label: 'blue'
            // disabled: true,
          },
          {
            value: 'red',
            label: 'red',
            nzChecked: true
          }
        ]
      },
      validation: {
        messages: {
          required: '请输选择'
        }
      }
    },
    {
      key: 'select',
      type: 'select',
      defaultValue: ['1'],
      templateOptions: {
        label: 'Select',
        placeholder: 'Select placeholder',
        required: true,
        multiple: true,
        options: [
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
          { label: 'Option 3', value: '3' }
        ],
        change: (field, e) => {
          console.log(field);
          console.log(e);
        }
      },
      validation: {
        messages: {
          required: '请输入选择'
        }
      }
    },
    {
      key: 'radio',
      type: 'radio',
      defaultValue: '1',
      templateOptions: {
        label: 'Radio',
        required: true,
        options: [
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' }
        ]
      },
      validation: {
        messages: {
          required: '请输入选择'
        }
      }
    },
    {
      key: 'custom',
      type: 'custom',
      defaultValue: '1223',
      templateOptions: {
        label: 'custom',
        placeholder: 'Input placeholder',
        required: true,
        render: 'textarea'
        // [nzTooltipTitle]	配置提示信息	string | TemplateRef<void>
        // [nzExtra]	用于显示表单额外提示信息	string | TemplateRef<void>

        // [nzTooltipIcon]	配置提示信息的图标	string | NzFormTooltipIcon
        // captchaTooltipIcon: NzFormTooltipIcon = {
        //   type: 'info-circle',
        //   theme: 'twotone'
        // };

        // [nzHasFeedback]	配合 nzValidateStatus 属性使用，展示校验状态图标	boolean	false
      },
      validation: {
        messages: {
          required: '请输入姓名'
        }
      }
    },
    {
      key: 'date-picker',
      type: 'date-picker',
      defaultValue: '2024-07-08T07:23:33.791Z',
      props: {
        label: 'date-picker',
        nzMode: 'week',
        required: true
      }
    },
    {
      key: 'switch',
      type: 'switch',
      defaultValue: true,
      props: {
        label: 'switch',
        required: true
      },
      expressionProperties: {
        'props.disabled': '!model.input' //动态禁用
      }
    },
    {
      key: 'text',
      type: 'text',
      defaultValue: '12121',
      props: {
        label: 'text',
        format: 'input'
      }
      //hideExpression: '!model.input', //动态隐藏
    },
    {
      key: 'slider',
      type: 'slider',
      props: {
        label: 'Slider',
        required: true
      },
      validation: {
        messages: {
          required: '请输入范围'
        }
      }
    }
  ];

  constructor(elementRef: ElementRef) {
    // 可以选择性地指定一个 phase。该阶段让你可以控制 DOM 操作的顺序，在 写操作之前进行 读操作，以最小化 布局抖动。
    // afterRender(
    //   () => {
    //     // Focus the first input element in this component.
    //     elementRef.nativeElement.querySelector('input')?.focus();
    //   },
    //   { phase: AfterRenderPhase.Read }
    // );
  }

  onSubmit() {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();
    if (this.form.valid) {
      alert(JSON.stringify(this.model, null, 2));
    }
  }
}
