

import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'ng-formly-field-unfold',
  template: `
    <div class="unfold-content-wrap">
      <span (click)="to.triggerUnfold()" class="unfold-content">
      {{to.content | translate}}
      </span>
      <i nz-icon nzType="caret-up" class="caret" *ngIf="model.unfold" theme="fill"></i>
      <i nz-icon nzType="caret-down" class="caret" *ngIf="!model.unfold" theme="fill"></i>
    </div>
  `,
  styles: [
    `.unfold-content {
        color: #5F80F0;
        cursor: pointer;
    }
    .caret {
      font-size: 10px;
      color: #8D9199;
    }
    ::ng-deep .unfold-content-wrap .ant-form-item-control {
      line-height: 12px;
    }`
  ]
})
export class FormlyFieldUnfoldComponent extends FieldType implements OnInit {
  ngOnInit() {
    setTimeout(() => {
      if (this.to.arrangement === 'transverse') {
        this.to.formlyLabelStyle = this.to.formlyLabelStyle || {lineHeight: '12px'};
      }
    });
  }
}
