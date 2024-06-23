

import { Component, OnInit, TemplateRef } from '@angular/core';

import { FormRefSourceService } from '../directive/ng-form-ref.directive';
import { NgFieldRadioType } from '../ng-field.type';

@Component({
  selector: 'ng-formly-field-radio',
  template: `
    <div class="radio-group-wrap">
      <nz-radio-group [ngClass]="{'field-radio-group': to.align==='vertical'}"
        [formControl]="formControl" [formlyAttributes]="field">
        <span class="radio-wrap" *ngFor="let option of to.options">
          <label [nzDisabled]="option.disabled"
            nz-tooltip nzTooltipPlacement="top" nzTooltipTrigger="hover"
            [nzTooltipTitle]="(option.title ? option.title : '') | translate"
            [title]="to.align==='vertical' ? ((option.label ? option.label : option.value) | translate) : ''"
            nz-radio [nzValue]="option.label ? option.value : option.key">
            {{ (option.label ? option.label : option.value) | translate }}
          </label>
          <i nz-icon
            *ngIf="option.optionPopoverTitle || option.optionPopoverContent"
            nzType="question-circle"
            theme="fill"
            nz-popover
            class="radio-popover-icon"
            [ngClass]="{'radio-transverse-popover-icon': to.arrangement === 'transverse'}"
            nzPlacement="right"
            nzOverlayClassName="form-question-circle-container"
            [nzPopoverTitle]="option.optionPopoverTitleType==='string' ? (option.optionPopoverTitle | translate) : option.optionPopoverTitle"
            [nzPopoverContent]="option.optionPopoverContentType==='string' ? (option.optionPopoverContent | translate) : option.optionPopoverContent">
          </i>
        </span>
        <span class="custom-control-indicator"></span>
      </nz-radio-group>
    </div>
  `,
  styles: [
    `.radio-group-wrap {
      display: grid;
    }
    ::ng-deep .radio-group-wrap .ant-radio-input {
      width: 12px;
      height: 12px;
      line-height: 12px;
    }
    ::ng-deep .radio-group-wrap .ant-radio-inner {
      width: 12px;
      height: 12px;
      line-height: 12px;
    }
    ::ng-deep .radio-group-wrap .ant-radio-checked .ant-radio-inner:after {
      width: 8px;
      height: 8px;
      transform: scale(0.75);
      left: 1px;
      top: 1px;
    }
    ::ng-deep .radio-group-wrap span.ant-radio + * {
      padding-left: 5px;
      padding-right: 16px;
      font-size: 12px;
    }
    ::ng-deep .radio-group-wrap .ant-form-item-control {
      line-height: 18px;
    }
    .radio-group-wrap .field-radio-group {
      width: 100%;
    }
    .radio-group-wrap label {
      max-width: 404px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      line-height: 16px;
    }
    .radio-group-wrap .field-radio-group .radio-wrap {
      display: block;
      margin-right: 0;
    }
    ::ng-deep .radio-group-wrap .field-radio-group span.ant-radio {
      position: relative;
      top: -6px;
    }
    ::ng-deep .radio-group-wrap .field-radio-group span.ant-radio + * {
      width: calc(100% - 12px);
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      display: inline-block;
      padding-right: 0;
    }
    .radio-group-wrap .radio-popover-icon {
      position: relative;
      color: #BEC3CE;
      cursor: pointer;
      left: -25px;
      top: -3px;
    }
    .radio-group-wrap .field-radio-group .radio-popover-icon {
      left: -12px;
      top: -6px;
    }
    .radio-group-wrap .field-radio-group .radio-transverse-popover-icon {
      top: -7px;
    }
    ::ng-deep .radio-group-wrap .radio-popover-icon svg {
      width: 12px;
      height: 12px;
    }`
  ]
})
export class FormlyFieldRadioComponent extends NgFieldRadioType implements OnInit {
  constructor(
    private dataSource: FormRefSourceService
  ) {
    super();
  }

  ngOnInit() {
    this.to.align = this.to.align || 'horizontal';
    this.formatPopover();
    setTimeout(() => {
      if (this.to.arrangement === 'transverse') {
        this.to.formlyLabelStyle = this.to.formlyLabelStyle || {lineHeight: '18px'};
      }
    });
  }

  formatPopover() {
    this.to.options.forEach(option => {
      const title = this.setPopover(option.optionPopoverTitleRender, option.optionPopoverTitleType, option.optionPopoverTitle);
      option.optionPopoverTitleType = title.type;
      option.optionPopoverTitle = title.popover;
      const content = this.setPopover(option.optionPopoverContentRender, option.optionPopoverContentType, option.optionPopoverContent);
      option.optionPopoverContentType = content.type;
      option.optionPopoverContent = content.popover;
    });
  }

  setPopover(render: string, type: string, popover: string | TemplateRef<void>):
    {type: string, popover: string | TemplateRef<void>} {
    if (render) {
      const title = this.dataSource.getRender(render);
      if (title) {
        type = 'TemplateRef';
        popover = title;
      }
    } else if (popover) {
      type = this.isString(popover) ? 'string' : 'TemplateRef';
    }
    return {type, popover};
  }

  isString(str: string | TemplateRef<void>): boolean {
    return (typeof str === 'string') && str.constructor === String;
  }
}
