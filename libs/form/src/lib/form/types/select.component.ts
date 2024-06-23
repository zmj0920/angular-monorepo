

import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NgI18nService } from 'ng-galaxy-esd/i18n';
import { TranslateService } from '@ngx-translate/core';
import { NzOptionComponent } from 'ng-zorro-antd/select';

import { NgFieldSelectType, SelectOption } from '../ng-field.type';

@Component({
  selector: 'ng-formly-field-select',
  template: `
    <div class="app-formly-field-select">
      <nz-spin [nzSpinning]="loading" [nzSize]="'small'">
      <nz-select *ngIf="to.multiple; else singleSelect" nzMode="multiple" [formControl]="formControl"
      [nzAllowClear]="to.allowClear" [class.is-invalid]="showError" [formlyAttributes]="field"
      [ngClass]="{'multiple-select': hasScorll}" [nzOptionOverflowSize]="to.optionOverflowSize"
      [nzPlaceHolder]="(to.placeholder || '') | translate" [nzFilterOption]="filterOption">
        <nz-option nzCustomContent nzDisabled=true *ngIf="to.multiple && to.allowCheckAll">
          <div class="app-formly-field-select-all">
            <label #selectAllElement class="select-all" nz-checkbox [(ngModel)]="checked" (ngModelChange)="handleSelectAllStatus(checked)">{{select_all | translate}}</label>
          </div>
        </nz-option>
        <ng-container *ngFor="let item of to.options | formlySelectOptions:field | async">
          <nz-option-group *ngIf="item.group" nzLabel="{{item.translate ? (item.label | translate) : item.label}}">
            <nz-option nzCustomContent *ngFor="let child of item.group" [nzValue]="child.value" [nzLabel]="child.translate ? (child.label | translate) : child.label"
            [nzDisabled]="child.disabled">
              <span ng-select-option-tooltip
                *ngIf="child.tooltipTitle"
                [ngSelectOptionToolTipTitle]="child.tooltipTitle | translate">
                {{ child.translate ? (child.label | translate) : child.label }}
              </span>
              <span class="app-formly-field-select-option"
                *ngIf="!child.tooltipTitle">
                {{ child.translate ? (child.label | translate) : child.label }}
              </span>
          </nz-option>
          </nz-option-group>
          <nz-option nzCustomContent *ngIf="!item.group" [nzValue]="item.value" [nzLabel]="item.translate ? (item.label | translate) : item.label" [nzDisabled]="item.disabled">
            <span ng-select-option-tooltip
              *ngIf="item.tooltipTitle"
              [ngSelectOptionToolTipTitle]="item.tooltipTitle | translate">
              {{ item.translate ? (item.label | translate) : item.label }}
            </span>
            <span class="app-formly-field-select-option"
              *ngIf="!item.tooltipTitle">
              {{ item.translate ? (item.label | translate) : item.label }}
            </span>
          </nz-option>
        </ng-container>
      </nz-select>
      <ng-template #singleSelect>
        <nz-select
          [nzFilterOption]="filterOption"
          [formControl]="formControl"
          [nzAllowClear]="to.allowClear"
          [nzShowSearch]="to.showSearch"
          [nzPlaceHolder]="(to.placeholder || '') | translate"
          [class.is-invalid]="showError"
          [formlyAttributes]="field">
          <ng-container *ngFor="let item of to.options | formlySelectOptions:field | async">
            <nz-option-group *ngIf="item.group" nzLabel="{{item.translate ? (item.label | translate) : item.label}}">
              <nz-option nzCustomContent *ngFor="let child of item.group" [nzValue]="child.value" [nzLabel]="child.label | translate"
              [nzDisabled]="child.disabled">
                <span ng-select-option-tooltip
                  *ngIf="child.tooltipTitle"
                  [ngSelectOptionToolTipTitle]="child.tooltipTitle | translate">
                  {{ child.translate ? (child.label | translate) : child.label }}
                </span>
                <span class="app-formly-field-select-option"
                  *ngIf="!child.tooltipTitle">
                  {{ child.translate ? (child.label | translate) : child.label }}
                </span>
            </nz-option>
            </nz-option-group>
            <nz-option nzCustomContent *ngIf="!item.group" [nzValue]="item.value" [nzLabel]="item.translate ? (item.label | translate) : item.label"
            [nzDisabled]="item.disabled">
              <span ng-select-option-tooltip
                *ngIf="item.tooltipTitle"
                [ngSelectOptionToolTipTitle]="item.tooltipTitle | translate">
                {{ item.translate ? (item.label | translate) : item.label }}
              </span>
              <span class="app-formly-field-select-option"
                *ngIf="!item.tooltipTitle">
                {{ item.translate ? (item.label | translate) : item.label }}
              </span>
            </nz-option>
          </ng-container>
        </nz-select>
      </ng-template>
      </nz-spin>
    </div>
  `,
  styles: [
    `::ng-deep .app-formly-field-select > .ant-form-item-control {
      line-height: 1;
    }
    ::ng-deep .app-formly-field-select .has-error .ant-select-selection {
      border-color: #f5222d;
    }
    ::ng-deep .app-formly-field-select .ant-select-open .ant-select-selection {
      box-shadow: none;
    }
    ::ng-deep .app-formly-field-select nz-select-top-control {
      max-height: 85px;
      overflow-y: auto;
    }
    ::ng-deep .app-formly-field-select .multiple-select .ant-select-clear {
      right: 17px;
    }
    ::ng-deep .app-formly-field-select .anticon-loading {
      display: block;
    }
    .app-formly-field-select-all {
      cursor: auto;
      margin-left: -12px;
      margin-top: -5px;
      margin-bottom: -5px;
      height: 32px;
      width: calc(100% + 45px);
      padding-left: 12px;
      border-bottom: 1px solid #e8e8e8;
      line-height: 32px;
    }
    .app-formly-field-select-option {
      width: 100%;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      display: inline-block;
      line-height: 14px;
      max-width: 100%;
      position: relative;
      top: 4px;
    }`
  ]
})
export class FormlyFieldSelectComponent extends NgFieldSelectType implements OnInit, OnDestroy {
  checked!: boolean;
  onDestroy$ = new Subject<void>();
  langUnsubscribe$ = new Subject<void>();
  optionDisabledVals: any[] = [];
  optionVals: any[] = [];
  select_all!: string;
  hasScorll = false;

  get loading() {
    return this.to.loading || false;
  }

  constructor(
    private el: ElementRef,
    private ngI18nService: NgI18nService,
    private translateService: TranslateService
  ) {
    super();
  }

  ngOnInit() {
    this.to.showSearch = this.to.showSearch === undefined ? true : this.to.showSearch;
    if (!this.to.optionOverflowSize) {
      this.to.optionOverflowSize = this.to.multiple && this.to.allowCheckAll ? 9 : 8;
    }
    if (this.to.multiple) {
      this.select_all = this.ngI18nService.getData('form').select_all;
      this.multipleSelectChange();
      this.translateService.onLangChange.pipe(takeUntil(this.langUnsubscribe$)).subscribe(() => {
        this.select_all = this.ngI18nService.getData('form').select_all;
        this.multipleSelectChange();
      });
      this.formControl.valueChanges.pipe(
        takeUntil(this.onDestroy$),
        tap(val => {
          let count = 0;
          val.forEach((item: any) => {
            if (!this.optionDisabledVals.includes(item)) {
              count += 1;
            }
          });
          this.getOptionVals();
          if (count && count === this.optionVals.length) {
            this.checked = true;
          } else {
            this.checked = false;
          }
          this.multipleSelectChange();
        }),
      ).subscribe();
    }
  }

  // get option value
  getOptionVals() {
    const vals: any = [];
    this.optionDisabledVals = [];
    this.to.options.forEach(item => {
      if (item['group']) {
        item['group'].forEach((child: SelectOption) => {
          if (!child['disabled']) {
            vals.push(child['value']);
          } else {
            this.optionDisabledVals.push(child['value']);
          }
        });
      } else {
        if (!item['disabled']) {
          vals.push(item['value']);
        } else {
          this.optionDisabledVals.push(item['value']);
        }
      }
    });
    this.optionVals = vals;
  }

  handleSelectAllStatus(isSelectAll: boolean) {
    if (this.to.multiple) {
      let vals = [];
      if (isSelectAll) {
        this.getOptionVals();
        vals = this.optionVals ? this.optionVals : [];
      }
      this.field.formControl!.setValue(vals);
      this.field.formControl!.markAsDirty();
    }
  }

  multipleSelectChange() {
    setTimeout(() => {
      const multipleSelect = this.el.nativeElement.querySelector('nz-select-top-control');
      if (multipleSelect && (multipleSelect.scrollHeight > multipleSelect.clientHeight)) {
        this.hasScorll = true;
      } else {
        this.hasScorll = false;
      }
    }, 500);
  }

  filterOption(input?: string, option?: NzOptionComponent) {
    return input && option?.nzLabel?.toLowerCase().includes(input.toLowerCase()) && !option?.nzDisabled;
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
    this.langUnsubscribe$.next();
    this.langUnsubscribe$.complete();
  }
}
