

import { Component, ViewChild, ViewContainerRef, ViewEncapsulation, TemplateRef } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';
import { OnInit, OnDestroy } from '@angular/core';
import { takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AbstractControl, FormControl } from '@angular/forms';

import { FormRefSourceService } from '../directive/ng-form-ref.directive';

@Component({
  selector:  'ng-formly-wrapper-form-field',
  templateUrl: './panel-wrapper.component.html',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
})

export class FormlyWrapperFormFieldComponent extends FieldWrapper implements OnInit, OnDestroy {
  @ViewChild('fieldComponent', { read: ViewContainerRef, static: true }) override fieldComponent!: ViewContainerRef;
  onDestroy$ = new Subject<void>();

  get validateStatus(): string {
    if (this.formControl instanceof FormControl) {
      if (this.formControl.dirty && this.formControl.invalid) {
        return 'error';
      }
      return '';
    }
    return '';
  }

  constructor(
    private dataSource: FormRefSourceService,
  ) {
    super();
  }

  ngOnInit() {
    this.formControl.valueChanges.pipe(
      takeUntil(this.onDestroy$),
      tap(val => {
        if (this.props['checkPath']) {
          let paths = [];
          if (Array.isArray(this.props['checkPath'])) {
            paths = this.props['checkPath'];
          } else {
            paths.push(this.props['checkPath']);
          }
          paths.forEach(path => {
            if(this.formControl && this.formControl.parent){
              const controls = this.formControl.parent.controls as {[key: string]: AbstractControl};
              const checkControl = controls[path];
              if (!checkControl?.dirty) {
                checkControl.markAsUntouched();
              }
            }
          
          });
        }
      }),
    ).subscribe();

    if (this.props['popoverTitleRender']) {
      const title = this.dataSource.getRender(this.props['popoverTitleRender']);
      if (title) {
        this.props['popoverTitleType'] = 'TemplateRef';
        this.props['popoverTitle'] = title;
      }
    } else if (this.props['popoverTitle']) {
      if (this.isString(this.props['popoverTitle'])) {
        this.props['popoverTitleType'] = 'string';
      } else {
        this.props['popoverTitleType'] = 'TemplateRef';
      }
    }

    if (this.props['popoverContentRender']) {
      const content = this.dataSource.getRender(this.props['popoverContentRender']);
      if (content) {
        this.props['popoverContentType'] = 'TemplateRef';
        this.props['popoverContent'] = content;
      }
    } else if (this.props['popoverTitle']) {
      if (this.isString(this.props['popoverTitle'])) {
        this.props['popoverContentType'] = 'string';
      } else {
        this.props['popoverContentType']= 'TemplateRef';
      }
    }
  }

  transPlaceholder() {
    if (!this.props['placeholderTmp'] && this.props['placeholder']?.includes('.')) {
      this.props['placeholderTmp'] = this.props.placeholder;
    }
    if (this.props['placeholderTmp']) {
      this.props.placeholder = this.props['placeholderTmp'];
    }
  }

  isString(str: string | TemplateRef<any>): boolean {
    return (typeof str === 'string') && str.constructor === String;
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
