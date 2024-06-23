

import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { NgFieldIpType } from '../ng-field.type';

@Component({
  selector: 'ng-formly-field-ip',
  template: `
    <div class="app-formly-field-ip-wrap">
      <input nz-input [hidden]="true"
        [formlyAttributes]="field" [formControl]="formControl">
      <div *ngIf="to.IPType!=='wrap'" class="app-formly-field-ip">
        <input nz-input class="fixed-width" [(ngModel)]="ips[0]" [class.error-border]="ipsError[0]"
          (ngModelChange)="inputChangeEvent($event, 0)" [disabled]="ipsDisabled(0)"
          (keydown)="onKeydown($event, 0)" (keyup)="onKeyup($event, 0)" (paste)="onPaste($event, 0)">.
        <input nz-input class="fixed-width" [(ngModel)]="ips[1]" [class.error-border]="ipsError[1]"
          (ngModelChange)="inputChangeEvent($event, 1)" [disabled]="ipsDisabled(1)"
          (keydown)="onKeydown($event, 1)" (keyup)="onKeyup($event, 1)" (paste)="onPaste($event, 1)">.
        <input nz-input class="fixed-width" [(ngModel)]="ips[2]" [class.error-border]="ipsError[2]"
          (ngModelChange)="inputChangeEvent($event, 2)" [disabled]="ipsDisabled(2)"
          (keydown)="onKeydown($event, 2)" (keyup)="onKeyup($event, 2)" (paste)="onPaste($event, 2)">.
        <input nz-input class="fixed-width" [(ngModel)]="ips[3]" [class.error-border]="ipsError[3]"
          (ngModelChange)="inputChangeEvent($event, 3)" [disabled]="ipsDisabled(3)"
          (keydown)="onKeydown($event, 3)" (keyup)="onKeyup($event, 3)" (paste)="onPaste($event, 3)">
      </div>
      <div *ngIf="to.IPType==='wrap'">
        <div class="input-wrap"
          [ngClass]="{'wrap-border': !isError && isFocus, 'wrap-error-border': isError && !isFocus,
          'wrap-error-border-shadow': isError && isFocus}">
          <input nz-input class="change-border" [(ngModel)]="ips[0]" (keydown)="onKeydown($event, 0)" (paste)="onPaste($event, 0)"
            [ngClass]="{'error-border': ipsError[0], 'input-disabled': ipsDisabled(0)}" (keyup)="onKeyup($event, 0)"
            (ngModelChange)="inputChangeEvent($event, 0)" (click)="getFocus(0)" (blur)="getBlur(0)" [disabled]="ipsDisabled(0)">
            <span class="partition">.</span>
          <input nz-input class="change-border" [(ngModel)]="ips[1]" (keydown)="onKeydown($event, 1)" (paste)="onPaste($event, 1)"
            [ngClass]="{'error-border': ipsError[1], 'input-disabled': ipsDisabled(1)}" (keyup)="onKeyup($event, 1)"
            (ngModelChange)="inputChangeEvent($event, 1)" (click)="getFocus(1)" (blur)="getBlur(1)" [disabled]="ipsDisabled(1)">
            <span class="partition">.</span>
          <input nz-input class="change-border" [(ngModel)]="ips[2]" (keydown)="onKeydown($event, 2)" (paste)="onPaste($event, 2)"
            [ngClass]="{'error-border': ipsError[2], 'input-disabled': ipsDisabled(2)}" (keyup)="onKeyup($event, 2)"
            (ngModelChange)="inputChangeEvent($event, 2)" (click)="getFocus(2)" (blur)="getBlur(2)" [disabled]="ipsDisabled(2)">
            <span class="partition">.</span>
          <input nz-input class="change-border" [(ngModel)]="ips[3]" (keydown)="onKeydown($event, 3)" (paste)="onPaste($event, 3)"
            [ngClass]="{'error-border': ipsError[3], 'input-disabled': ipsDisabled(3)}" (keyup)="onKeyup($event, 3)"
            (ngModelChange)="inputChangeEvent($event, 3)" (click)="getFocus(3)" (blur)="getBlur(3)" [disabled]="ipsDisabled(3)">
          <ng-icon *ngIf="isShowClear" [type]="'clear'" [color]="'#BEC3CE'" [size]="'12px'" (click)="clearData()"></ng-icon>
        </div>
      </div>
    </div>
  `,
  styles: [
    `::ng-deep .app-formly-field-ip > .ant-form-item-control {
      line-height: 1;
    }
    .app-formly-field-ip-wrap .input-wrap {
      border: 1px solid #d9d9d9;
      border-radius: 4px;
      transition: all 0.3s;
      width: 256px;
      height: 32px;
    }
    .app-formly-field-ip-wrap .input-wrap ng-icon {
      margin-left: 18px;
      top: 10px;
      line-height: 1;
      position: absolute;
      cursor: pointer;
    }
    ::ng-deep .app-formly-field-ip-wrap .input-wrap ng-icon:hover svg g {
      fill: #8C9099;
    }
    .app-formly-field-ip-wrap .app-formly-field-ip-wrap .error-border {
      border-color: #f5222d;
    }
    .app-formly-field-ip-wrap .error-border:focus {
      box-shadow: 0 0 0 2px rgba(238,107,99,0.2);
    }
    .app-formly-field-ip-wrap .fixed-width {
      width: 56px;
      margin-right: 4px;
      text-align: center;
    }
    .app-formly-field-ip-wrap .change-border {
      border-top: 0;
      border-left: 0;
      border-right: 0;
      text-align: center;
      border-radius: 0;
      padding: 0;
      height: 23px;
      top: 4px;
      left: 8px;
      width: 48px;
    }
    .app-formly-field-ip-wrap .change-border:hover {
      box-shadow: none;
    }
    .app-formly-field-ip-wrap .change-border:focus {
      box-shadow: none;
    }
    .app-formly-field-ip-wrap .wrap-border {
      border-color: #7a5fe3;
      box-shadow: 0 0 0 2px rgba(82, 55, 213, 0.2);
    }
    .app-formly-field-ip-wrap .wrap-error-border {
      border-color: #EE6B63;
    }
    .app-formly-field-ip-wrap .wrap-error-border-shadow {
      border-color: #EE6B63;
      box-shadow: 0 0 0 2px rgba(238,107,99,0.2);
    }
    .app-formly-field-ip-wrap .input-disabled {
      border-bottom-color: #D4D4DA;
      background-color: rgba(0, 0, 0, 0);
      color: #8D9199;
    }
    .app-formly-field-ip-wrap .partition {
      margin-left: 10px;
      margin-right: -6px;
      position: relative;
      top: 1px;
    }`
  ]
})
export class FormlyFieldIPComponent extends NgFieldIpType implements OnInit, OnDestroy {
  onDestroy$ = new Subject<void>();
  ips = ['', '', '', ''];
  isError = false;
  ipsError = [false, false, false, false];
  isFocus = false;
  ipsFocus = [false, false, false, false];

  get isShowClear() {
    const ipsDisabled = this.to.ipsDisabled || [];
    return (!ipsDisabled.length || ipsDisabled.some(item => !item)) && this.formControl.value;
  }

  constructor(
    private el: ElementRef
  ) {
    super();
  }

  ngOnInit() {
    if (this.field.formControl!.value) {
      this.ips = this.field.formControl!.value.split('.');
    }
    this.formControl.valueChanges.pipe(
      takeUntil(this.onDestroy$),
      tap(val => {
        if (val) {
          this.ips = val.split('.');
        }
      }),
    ).subscribe();
  }

  ipsDisabled(i: number): boolean {
    if (this.to.disabled) {
      return true;
    }
    if (this.to.ipsDisabled && this.to.ipsDisabled.length) {
      return this.to.ipsDisabled[i];
    }
    return this.to[`ip${i}Disabled`];
  }

  onPaste(event: Event, index: number): void {
    this.ips[index] = '';
  }

  getIps(data: string, index: number): void {
    const ips = data.split('.');
    const inputs = this.el.nativeElement.querySelectorAll('input');
    let j = 0;
    for (let i = index; i < 4; i += 1) {
      if (j < ips.length) {
        this.ips[i] = ips[j];
        inputs[i + 1].focus();
      }
      j += 1;
    }
  }

  onKeydown(event: Event & {keyCode: number}, index: number): void {
    if ([110, 190].includes(event.keyCode)) {
      this.setFocus(index);
      event.preventDefault();
    }
  }

  onKeyup(event: Event & {keyCode: number}, index: number): void {
    if (this.ips[index].length >= 3 && event.keyCode >= 48 && event.keyCode <= 105) {
      this.setFocus(index);
    }
  }

  private setFocus(index: number) {
    const inputs = this.el.nativeElement.querySelectorAll('input');
    if (inputs[index + 2]) {
      inputs[index + 2].focus();
    }
  }

  inputChangeEvent(data: string, index: number): void {
    this.getIps(data, index);
    this.checkIPPattern();
  }

  checkIPPattern() {
    if (this.to.ipsPattern?.length) {
      for (let i = 0; i <= 3; i += 1) {
        if (this.to.ipsPattern && this.to.ipsPattern.length) {
          this.to[`ip${i}Pattern`] = this.to.ipsPattern[i];
        }
        if (this.to[`ip${i}Pattern`] && this.to[`ip${i}Pattern`].test(this.ips[i])) {
          this.ipsError[i] = false;
        } else if (this.to[`ip${i}Pattern`]) {
          this.ipsError[i] = true;
        }
      }
    }
    this.isError = false;
    const filterError = this.ipsError.filter(item => item);
    if (filterError.length) {
      this.isError = true;
    }
    const filter = this.ips.filter(item => item !== '');
    if (filter.length) {
      this.field.formControl!.setValue(this.ips.join('.'));
    } else {
      this.field.formControl!.setValue(null);
    }
    if (this.formControl.invalid) {
      this.formControl.markAsDirty();
    } else {
      this.formControl.markAsUntouched();
    }
  }

  getBlur(num: number): void {
    this.ipsFocus[num] = false;
    const blurFilter = this.ipsFocus.filter(item => !item);
    if (blurFilter.length === this.ipsFocus.length) {
      this.isFocus = false;
    } else {
      this.isFocus = true;
    }
  }

  getFocus(num: number): void {
    this.ipsFocus = [false, false, false, false];
    this.ipsFocus[num] = true;
    const focusFilter = this.ipsFocus.filter(item => !item);
    if (focusFilter.length === this.ipsFocus.length) {
      this.isFocus = false;
    } else {
      this.isFocus = true;
    }
  }

  clearData() {
    if (this.to.ipsDisabled?.length) {
      this.to.ipsDisabled.forEach((item, index) => {
        if (!item) {
          this.ips[index] = '';
        }
      });
    } else {
      this.ips = ['', '', '', ''];
    }
    this.checkIPPattern();
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
