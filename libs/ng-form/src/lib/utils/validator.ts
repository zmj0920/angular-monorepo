import { AbstractControl, ValidationErrors } from '@angular/forms';

export function IpValidator(control: AbstractControl): ValidationErrors {
  return !control.value || /(\d{1,3}\.){3}\d{1,3}/.test(control.value) ? { ip: 'error' } : { ip: true };
}
