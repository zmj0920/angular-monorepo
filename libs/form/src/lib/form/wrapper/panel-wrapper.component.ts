

import { Component, ViewChild, ViewContainerRef, ViewEncapsulation, TemplateRef } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';
import { OnInit, OnDestroy } from '@angular/core';
import { takeUntil, tap } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { AbstractControl, FormControl } from '@angular/forms';
// import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';

import { FormRefSourceService } from '../directive/ng-form-ref.directive';

@Component({
  selector:  'ng-formly-wrapper-form-field',
  templateUrl: './panel-wrapper.component.html',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
})

export class FormlyWrapperFormFieldComponent extends FieldWrapper implements OnInit, OnDestroy {
  @ViewChild('fieldComponent', { read: ViewContainerRef, static: true }) fieldComponent!: ViewContainerRef;
  onDestroy$ = new Subject<void>();
  langSubscribe$!: Subscription;

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
    private translate: TranslateService,
  ) {
    super();
  }

  ngOnInit() {
    this.transPlaceholder();
    this.langSubscribe$ = this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
      this.transPlaceholder();
    });

    this.formControl.valueChanges.pipe(
      takeUntil(this.onDestroy$),
      tap(val => {
        if (this.to.checkPath) {
          let paths = [];
          if (Array.isArray(this.to.checkPath)) {
            paths = this.to.checkPath;
          } else {
            paths.push(this.to.checkPath);
          }
          paths.forEach(path => {
            const controls = this.formControl.parent.controls as {[key: string]: AbstractControl};
            const checkControl = controls[path];
            if (!checkControl?.dirty) {
              checkControl.markAsUntouched();
            }
          });
        }
      }),
    ).subscribe();

    if (this.to.popoverTitleRender) {
      const title = this.dataSource.getRender(this.to.popoverTitleRender);
      if (title) {
        this.to.popoverTitleType = 'TemplateRef';
        this.to.popoverTitle = title;
      }
    } else if (this.to.popoverTitle) {
      if (this.isString(this.to.popoverTitle)) {
        this.to.popoverTitleType = 'string';
      } else {
        this.to.popoverTitleType = 'TemplateRef';
      }
    }

    if (this.to.popoverContentRender) {
      const content = this.dataSource.getRender(this.to.popoverContentRender);
      if (content) {
        this.to.popoverContentType = 'TemplateRef';
        this.to.popoverContent = content;
      }
    } else if (this.to.popoverTitle) {
      if (this.isString(this.to.popoverTitle)) {
        this.to.popoverContentType = 'string';
      } else {
        this.to.popoverContentType = 'TemplateRef';
      }
    }
  }

  transPlaceholder() {
    if (!this.to.placeholderTmp && this.to.placeholder?.includes('.')) {
      this.to.placeholderTmp = this.to.placeholder;
    }
    if (this.to.placeholderTmp) {
      this.to.placeholder = this.translate.instant(this.to.placeholderTmp);
    }
  }

  isString(str: string | TemplateRef<any>): boolean {
    return (typeof str === 'string') && str.constructor === String;
  }

  ngOnDestroy(): void {
    if (this.langSubscribe$) {
      this.langSubscribe$.unsubscribe();
    }
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
