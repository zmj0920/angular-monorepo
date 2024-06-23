

import { Component, OnInit, ViewChild, OnDestroy, Renderer2 } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'ng-formly-field-slider',
  template: `
    <div class="app-formly-field-slider">
      <nz-row>
        <nz-col class="nz-slider-wrap">
          <nz-slider
            [nzDefaultValue]="data"
            [(ngModel)]="data"
            [nzDisabled]="to.disabled"
            (ngModelChange)="formControl.setValue(data)"
            [nzMin]="to.min" [nzMax]="to.max"></nz-slider>
        </nz-col>
        <div nz-col class="input-unit" [class.error-border-wrap]="formControl.dirty && formControl.invalid">
        <nz-input-number #inputElement
          (input)="onInput($event)"
          [nzStep]="to.step || 1"
          [formlyAttributes]="field"
          [formControl]="formControl"
          [nzMin]="to.min"
          [nzMax]="to.max" class="slider-input error-border"></nz-input-number>
          <span class="unit">{{to.unit}}</span>
        </div>
        <span class="range">{{to.min}} {{to.unit}} ~ {{to.max}} {{to.unit}}</span>
      </nz-row>
    </div>
  `,
  styles: [
    `.app-formly-field-slider .nz-slider-wrap {
      margin-bottom: 4px;
      width: calc(100% - 108px);
    }
    .app-formly-field-slider .slider-input {
      width: 58px;
      margin-left: 8px;
      border-color: #d4d4da;
    }
    ::ng-deep .app-formly-field-slider .slider-input input {
      padding-left: 0;
      text-align: center;
    }
    ::ng-deep .app-formly-field-slider .slider-input .ant-input-number-handler-wrap {
      width: 17px;
    }
    ::ng-deep .app-formly-field-slider .slider-input .ant-input-number-handler-wrap .anticon {
      left: 1px;
    }
    .app-formly-field-slider .unit {
      margin-left: 5px;
    }
    .app-formly-field-slider .range {
      line-height: normal;
      position: absolute;
      left: 5px;
      top: 25px;
      color: #8D9199;
    }
    .app-formly-field-slider .input-unit {
      width: auto;
    }
    .app-formly-field-slider .input-unit .ant-input-number-disabled {
      background-color: #f5f7fa;
      color: #71757d;
    }
    .app-formly-field-slider .error-border-wrap .ant-input-number-focused{
      box-shadow: 0 0 0 2px rgba(245, 34, 45, 0.2);
    }
    .app-formly-field-slider .error-border-wrap .error-border {
      border-color: #f5222d;
    }
    .app-formly-field-slider .error-border-wrap .error-border:focus {
      box-shadow: 0 0 0 2px rgba(245, 34, 45, 0.2);
    }`
  ]
})
export class FormlyFieldSliderComponent extends FieldType implements OnInit, OnDestroy {
  @ViewChild('inputElement', { static: true })
  nzInputElement: any;
  data!: number;
  onDestroy$ = new Subject<void>();

  constructor(
    private renderer: Renderer2,
  ) {
    super();
  }

  ngOnInit() {
    this.data = this.formControl.value || this.to.min;
    this.formControl.valueChanges.pipe(
      takeUntil(this.onDestroy$),
      tap(val => {
        this.data = val === '' ? this.to.min : val;
        this.formControl.markAsDirty();
      }),
    ).subscribe();

    const inputEle = this.nzInputElement.elementRef.nativeElement.children[1].children[0];
    this.renderer.listen(inputEle, 'blur', (event) => {
      this.formControl.markAsDirty();
    });
  }

  onInput(e: Event) {
    const value = (e.target as HTMLInputElement).value;
    this.formControl.markAsDirty();
    const valueBefore = this.field.formControl!.value;
    this.field.formControl!.setValue(valueBefore);
    if (!value || value === '-' || value === '.') {
      this.field.formControl!.setValue(value);
    } else if (value.split('.').length === 2 &&
      value.charAt(value.length - 1) === '.' && !isNaN(Number(value.split('.')[0]))) {
      this.field.formControl!.setValue(value);
    } else if (value[0] === '-' && value.split('-').length === 2 &&
      !isNaN(Number(value.split('-')[1]))) {
      if (value.includes('.') && value.charAt(value.length - 1) === '0') {
        this.field.formControl!.setValue(value);
      } else {
        this.setNumberValue(value);
      }
    } else if (!isNaN(Number(value))) {
      if (value.includes('.') && value.charAt(value.length - 1) === '0') {
        this.field.formControl!.setValue(value);
      } else {
        this.setNumberValue(value);
      }
    }
  }

  setNumberValue(value: string) {
    const intValue = Number(value);
    if (intValue > Number.MAX_SAFE_INTEGER) {
      this.field.formControl!.setValue(Number.MAX_SAFE_INTEGER);
    } else if (intValue < Number.MIN_SAFE_INTEGER) {
      this.field.formControl!.setValue(Number.MIN_SAFE_INTEGER);
    } else {
      this.field.formControl!.setValue(intValue);
    }
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
