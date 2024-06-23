

import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

import { CustomAutoCompleteComponent } from './custom-auto-complete.component';

@Component({
  selector: 'ng-formly-field-input',
  template: `
    <div class="app-formly-field-input">
      <ng-text-input-autocomplete-container *ngIf="to.type !== 'number' && to.autoCompleteExpression">
        <input
          type="text"
          nz-input
          placeholder="{{(to.placeholder || '') | translate}}"
          [formlyAttributes]="field"
          [formControl]="formControl"
          [menuComponent]="menuComponent"
          ngTextInputAutocomplete
          [findChoices]="findChoices"
          [searchRegexp]="searchRegexp"
          [nzAutocomplete]="auto"
          [triggerCharacter]="to.autoCompleteTriggerCharacter"
          [getChoiceLabel]="getChoiceLabel" />
      </ng-text-input-autocomplete-container>
      <nz-autocomplete #auto></nz-autocomplete>

      <input
        nz-input
        *ngIf="to.type !== 'number' && !to.autoCompleteExpression"
        placeholder="{{(to.placeholder || '') | translate}}"
        autocomplete="{{to.autocomplete || 'on'}}"
        [formlyAttributes]="field"
        [type]="to.type"
        [formControl]="formControl">

      <nz-input-number
        *ngIf="to.type === 'number'"
        class="input-lg"
        [formControl]="formControl"
        (input)="onInput($event)"
        [nzStep]="to.step"
        [nzMax]="to.nzMax"
        [nzMin]="to.nzMin"
        [nzPrecision]="to.precision"
        [nzPlaceHolder]="(to.placeholder || '') | translate"
        [formlyAttributes]="field"></nz-input-number>
    </div>
  `,
  styles: [
    `::ng-deep .app-formly-field-input > .ant-form-item-control {
      line-height: 1;
    }
    .app-formly-field-input .input-lg {
      width: 100%;
    }`
  ]
})
export class FormlyFieldInputComponent extends FieldType implements OnInit {
  searchRegexp!: RegExp;
  menuComponent = CustomAutoCompleteComponent;

  ngOnInit() {
    this.searchRegexp = /^[\s\S]*$/;
    this.to.step = this.to.step || 1;
    this.to.type = this.to.type || 'text';
    this.to.nzMax = this.to.nzMax === undefined ? Number.MAX_SAFE_INTEGER : this.to.nzMax;
    this.to.nzMin = this.to.nzMin === undefined ? Number.MIN_SAFE_INTEGER : this.to.nzMin;
    this.to.autoCompleteTriggerCharacter = this.to.autoCompleteTriggerCharacter || '$';
  }

  onInput(e: Event) {
    const value = (e.target as HTMLInputElement).value;
    if (this.to.type === 'number') {
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

  findChoices = (searchText: string) => {
    return this.to.autoCompleteExpression(searchText) || [];
  }

  getChoiceLabel(choice: string) {
    return `${choice}`;
  }
}
