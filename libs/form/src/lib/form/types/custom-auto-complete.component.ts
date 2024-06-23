

import { Component } from '@angular/core';

import { TextInputAutocompleteMenuComponent } from '../components/text-input-autocomplete/text-input-autocomplete-menu.component';

@Component({
  selector: 'ng-custom-auto-complete',
  template: `
    <ul
      *ngIf="choices?.length > 0"
      #dropdownMenu
      class="dropdown-menu"
      [style.top.px]="position?.top"
      [style.left.px]="position?.left">
      <li
        *ngFor="let choice of choices; trackBy:trackById"
        [class.active]="activeChoice === choice"
        (click)="selectChoice.next(choice)">
        {{ choice }}
      </li>
    </ul>
  `,
  styles: [
    `.dropdown-menu {
      position: absolute;
      top: 100%;
      left: 0;
      min-width: 70px;
      max-width: 432px;
      z-index: 1000;
      margin: 0;
      padding: 0;
      text-align: left;
      list-style-type: none;
      background-color: #fff;
      -webkit-background-clip: padding-box;
      background-clip: padding-box;
      border-radius: 4px;
      outline: 0;
      box-shadow: 0 2px 8px rgba(0, 0, 0, .15);
    }
    .dropdown-menu li {
      clear: both;
      margin: 0;
      color: #5F6167;
      padding: 5px 12px;
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
      white-space: nowrap;
      cursor: pointer;
      transition: all .3s;
    }
    .dropdown-menu li:hover {
      background-color: #EAEEF5;
    }
    .dropdown-menu .active {
      background-color: #EAEEF5;
    }`
  ]
})
export class CustomAutoCompleteComponent extends TextInputAutocompleteMenuComponent {
}
