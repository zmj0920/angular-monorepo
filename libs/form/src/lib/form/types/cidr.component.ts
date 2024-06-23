

import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { NgFieldCidrType } from '../ng-field.type';

@Component({
  selector: 'ng-formly-field-cidr',
  template: `
    <input nz-input [hidden]="true"
      [formlyAttributes]="field" [formControl]="formControl">
    <div class="app-formly-field-cidr">
      <div class="input-wrap"
        [ngClass]="{'wrap-border': !isError && isFocus, 'wrap-error-border': isError && !isFocus,
        'wrap-error-border-shadow': isError && isFocus}">
        <input nz-input class="change-border" [(ngModel)]="ips[0]"
          [ngClass]="{'error-border': ipsError[0], 'input-disabled': ipsDisabled(0)}"
          (ngModelChange)="inputChangeEvent($event, 0)" (click)="getFocus(0)" (blur)="getBlur(0)"
          [disabled]="ipsDisabled(0)" (keydown)="onKeydown($event, 0)" (paste)="onPaste($event, 0)"
          (keyup)="onKeyup($event, 0)">
          <span class="partition">.</span>
        <input nz-input class="change-border" [(ngModel)]="ips[1]"
          [ngClass]="{'error-border': ipsError[1], 'input-disabled': ipsDisabled(1)}"
          (ngModelChange)="inputChangeEvent($event, 1)" (click)="getFocus(1)" (blur)="getBlur(1)"
          [disabled]="ipsDisabled(1)" (keydown)="onKeydown($event, 1)" (paste)="onPaste($event, 1)"
          (keyup)="onKeyup($event, 1)">
          <span class="partition">.</span>
        <input nz-input class="change-border" [(ngModel)]="ips[2]"
          [ngClass]="{'error-border': ipsError[2], 'input-disabled': ipsDisabled(2)}"
          (ngModelChange)="inputChangeEvent($event, 2)" (click)="getFocus(2)" (blur)="getBlur(2)"
          [disabled]="ipsDisabled(2)" (keydown)="onKeydown($event, 2)" (paste)="onPaste($event, 2)"
          (keyup)="onKeyup($event, 2)">
          <span class="partition">.</span>
        <input nz-input class="change-border" [(ngModel)]="ips[3]"
          [ngClass]="{'error-border': ipsError[3], 'input-disabled': ipsDisabled(3)}"
          (ngModelChange)="inputChangeEvent($event, 3)" (click)="getFocus(3)" (blur)="getBlur(3)"
          [disabled]="ipsDisabled(3)" (keydown)="onKeydown($event, 3)" (paste)="onPaste($event, 3)"
          (keyup)="onKeyup($event, 3)">
          <span class="partition partition-end">/</span>
        <input nz-input class="change-border" [(ngModel)]="ips[4]"
          [ngClass]="{'error-border': ipsError[4], 'input-disabled': ipsDisabled(4)}"
          (ngModelChange)="inputChangeEvent($event, 4)" (click)="getFocus(4)" (blur)="getBlur(4)"
          [disabled]="ipsDisabled(4)" (keydown)="onKeydown($event, 4)" (paste)="onPaste($event, 4)"
          (keyup)="onKeyup($event, 4)">
        <ng-icon *ngIf="isShowClear" [type]="'clear'" [color]="'#BEC3CE'" [size]="'12px'" (click)="clearData()"></ng-icon>
      </div>
    </div>
  `,
  styles: [
    `.app-formly-field-cidr .input-wrap {
      border: 1px solid #d9d9d9;
      border-radius: 4px;
      transition: all 0.3s;
      width: 312px;
      height: 32px;
    }
    .app-formly-field-cidr .input-wrap ng-icon {
      margin-left: 18px;
      top: 10px;
      line-height: 1;
      position: absolute;
      cursor: pointer;
    }
    ::ng-deep .app-formly-field-cidr .input-wrap ng-icon:hover svg g {
      fill: #8C9099;
    }
    .app-formly-field-cidr .error-border {
      border-color: #f5222d;
    }
    .app-formly-field-cidr .error-border:focus {
      box-shadow: 0 0 0 2px rgba(238,107,99,0.2);
    }
    .app-formly-field-cidr .fixed-width {
      width: 56px;
      margin-right: 4px;
      text-align: center;
    }
    .app-formly-field-cidr .change-border {
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
    .app-formly-field-cidr .change-border:hover {
      box-shadow: none;
    }
    .app-formly-field-cidr .change-border:focus {
      box-shadow: none;
    }
    .app-formly-field-cidr .wrap-border {
      border-color: #7a5fe3;

    }
    .app-formly-field-cidr .wrap-error-border {
      border-color: #EE6B63;
    }
    .app-formly-field-cidr .wrap-error-border-shadow {
      border-color: #EE6B63;
      box-shadow: 0 0 0 2px rgba(238,107,99,0.2);
    }
    .app-formly-field-cidr .input-disabled {
      border-bottom-color: #D4D4DA;
      background-color: rgba(0, 0, 0, 0);
      color: #8D9199;
    }
    .app-formly-field-cidr .partition {
      margin-left: 10px;
      margin-right: -6px;
      position: relative;
      top: 1px;
    }
    .app-formly-field-cidr .partition-end {
      top: 5px;
    }`
  ]
})
export class FormlyFieldCidrComponent extends NgFieldCidrType implements OnInit, OnDestroy {
  onDestroy$ = new Subject<void>();
  ips = ['', '', '', '', ''];
  ipsError = [false, false, false, false, false];
  isFocus = false;
  ipsFocus = [false, false, false, false, false];
  isError = false;

  get isShowClear() {
    const ipsDisabled = this.to.ipsDisabled || [];
    return (!ipsDisabled.length || ipsDisabled.some(item => !item)) && this.formControl.value;
  }

  constructor(
    private el: ElementRef,
  ) {
    super();
  }

  ngOnInit() {
    if (this.field.formControl!.value) {
      let ip = this.field.formControl!.value;
      ip = ip.replace(/\//g, '.');
      this.ips = ip.split('.');
    }

    this.formControl.valueChanges.pipe(
      takeUntil(this.onDestroy$),
      tap(val => {
        if (val) {
          val = val.replace(/\//g, '.');
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
    return false;
  }

  onPaste(event: Event, index: number): void {
    this.ips[index] = '';
  }

  getIps(data: string, index: number): void {
    const ips = data.split('.');
    if (ips.length > 1) {
      const inputs = this.el.nativeElement.querySelectorAll('input');
      let j = 0;
      for (let i = index; i < 5; i += 1) {
        if (i === 3 && ips[j] && ips[j].includes('/')) {
          this.ips[i] = ips[j].split('/')[0];
        } else if (i === 4 && ips[j - 1] && ips[j - 1].includes('/')) {
          this.ips[i] = ips[j - 1].split('/')[1];
        } else if (i === 4 && ips[j] && ips[j].includes('/')) {
          this.ips[i] = ips[j].split('/')[0];
        } else if (ips[j]) {
          this.ips[i] = ips[j];
        }
        inputs[i + 1].focus();
        j += 1;
      }
    }
  }

  onKeydown(event: Event & {keyCode: number}, index: number): void {
    if ([110, 190].includes(event.keyCode)) {
      const inputs = this.el.nativeElement.querySelectorAll('input');
      if (inputs[index + 2] && index < 3) {
        inputs[index + 2].focus();
      }
      event.preventDefault();
    }
    if ([111, 191].includes(event.keyCode)) {
      const inputs = this.el.nativeElement.querySelectorAll('input');
      if (inputs[index + 2] && index === 3) {
        inputs[index + 2].focus();
      }
      event.preventDefault();
    }
  }

  onKeyup(event: Event & {keyCode: number}, index: number): void {
    if (this.ips[index].length >= 3 && event.keyCode >= 48 && event.keyCode <= 105) {
      const inputs = this.el.nativeElement.querySelectorAll('input');
      if (inputs[index + 2]) {
        inputs[index + 2].focus();
      }
    }
  }

  inputChangeEvent(data: string, index: number): void {
    this.getIps(data, index);
    this.checkIPPattern();
  }

  checkIPPattern() {
    if (this.to.ipsPattern?.length) {
      for (let i = 0; i <= 4; i += 1) {
        if (this.to.ipsPattern[i] && this.to.ipsPattern[i].test(this.ips[i])) {
          this.ipsError[i] = false;
        } else if (this.to.ipsPattern[i]) {
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
      const ips = [this.ips[0], this.ips[1], this.ips[2], this.ips[3]];
      const cidr = `${ips.join('.')}/${this.ips[4]}`;
      this.field.formControl!.setValue(cidr);
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
    this.ipsFocus = [false, false, false, false, false];
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
      this.ips = ['', '', '', '', ''];
    }
    this.checkIPPattern();
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
