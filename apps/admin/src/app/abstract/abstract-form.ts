import { FormGroup } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { FormUtils } from './form-utils';
import { FormFieldConfig } from '@models/front-end/form-field-config';

export abstract class AbstractForm<V, T> {

  submitting = false;

  formGroup = new FormGroup({});

  onSubmitted = new EventEmitter<T>();

  abstract fields: FormFieldConfig[];

  protected constructor(public submitFn: (value: V) => Observable<T>) { }

  get submitDisabled() {
    return FormUtils.checkSubmitDisabled(this.formGroup);
  }

  submit() {
    if (this.formGroup.invalid) {
      FormUtils.markAsAllDirty(this.formGroup);
      return EMPTY;
    }

    this.submitting = true;

    return this.submitFn(this.formGroup.value).pipe(
      tap((t) => {
        this.onSubmitted.next(t);
        this.onSubmitted.complete();
      }),
      finalize(() => {
        this.submitting = false;
      })
    );
  }

}
