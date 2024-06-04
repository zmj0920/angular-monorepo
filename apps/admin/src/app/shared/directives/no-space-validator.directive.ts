import { Directive } from '@angular/core';
import { AbstractControl, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[ecsNoSpace]'
})
export class NoSpaceValidatorDirective implements Validator {

  constructor() { }

  static noSpace(control: AbstractControl) {
    if (/\s+/.test(control.value)) {
      return { noSpace: true };
    }
    return null;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return NoSpaceValidatorDirective.noSpace(control);
  }

}
