

import { Component } from '@angular/core';
import { ɵc } from '@ngx-formly/core';

@Component({
  selector:  'ng-formly-validation-message',
  template: `{{ ((errorMessage$ | async) || '') | translate }}`
})
export class FormlyValidationMessageComponent extends ɵc { }
