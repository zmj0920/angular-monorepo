

import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';

export class FormUtils {
  static markAsAllDirty(control: AbstractControl) {
    if (control instanceof FormControl && !control.dirty) {
      control.markAsDirty();
      control.updateValueAndValidity();
    } else if (control instanceof FormArray) {
      control.controls.forEach(item => {
        this.markAsAllDirty(item);
      });
    } else if (control instanceof FormGroup) {
      Object.keys(control.controls).forEach(name => {
        this.markAsAllDirty(control.controls[name]);
      });
    }
  }

  static hasPristine(control: AbstractControl) {
    if (control instanceof FormControl && control.pristine) {
      return true;
    } else if (control instanceof FormArray
      && (control.pristine
      || control.controls.find(item => FormUtils.hasPristine(item)))) {
      return true;
    } else if (control instanceof FormGroup
      && (control.pristine
        || Object.keys(control.controls).find(name => FormUtils.hasPristine(control.controls[name])))) {
      return true;
    }
    return false;
  }

  static checkSubmitDisabled(control: AbstractControl) {
    if (control instanceof FormControl && control.invalid && control.dirty) {
      return true;
    } else if (control instanceof FormArray
      && (control.pristine
        || control.controls.find(item => this.checkSubmitDisabled(item)))) {
      return true;
    } else if (control instanceof FormGroup
      && (Object.keys(control.controls).find(name => this.checkSubmitDisabled(control.controls[name])))) {
      return true;
    }
    return false;
  }
}
