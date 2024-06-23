

import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'ng-text-input-autocomplete-menu',
  template: `
    <ul
      *ngIf="choices?.length > 0"
      #dropdownMenu
      class="dropdown-menu"
      [style.top.px]="position?.top"
      [style.left.px]="position?.left">
      <li
        *ngFor="let choice of choices; trackBy:trackById"
        [class.active]="activeChoice === choice">
        <a
          href="javascript:;"
          (click)="selectChoice.next(choice)">
          {{ choice }}
        </a>
      </li>
    </ul>
  `,
  styles: [
    `
      .dropdown-menu {
        display: block;
        max-height: 200px;
        overflow-y: auto;
      }
    `
  ]
})
export class TextInputAutocompleteMenuComponent {
  @ViewChild('dropdownMenu', { static: false }) dropdownMenuElement!: ElementRef<HTMLUListElement>;
  position!: { top: number; left: number };
  selectChoice = new Subject();
  activeChoice!: any;
  searchText!: string;
  choiceLoadError!: any;
  choiceLoading = false;
  private _choices!: any[];
  trackById = (index: number, choice: any) =>
    typeof choice.id !== 'undefined' ? choice.id : choice

  set choices(choices: any[]) {
    this._choices = choices;
    if (choices.indexOf(this.activeChoice) === -1 && choices.length > 0) {
      this.activeChoice = choices[0];
    }
  }

  get choices() {
    return this._choices;
  }

  @HostListener('document:keydown.ArrowDown', ['$event'])
  onArrowDown(event: KeyboardEvent) {
    event.preventDefault();
    const index = this.choices.indexOf(this.activeChoice);
    if (this.choices[index + 1]) {
      this.scrollToChoice(index + 1);
    }
  }

  @HostListener('document:keydown.ArrowUp', ['$event'])
  onArrowUp(event: KeyboardEvent) {
    event.preventDefault();
    const index = this.choices.indexOf(this.activeChoice);
    if (this.choices[index - 1]) {
      this.scrollToChoice(index - 1);
    }
  }

  @HostListener('document:keydown.Enter', ['$event'])
  onEnter(event: KeyboardEvent) {
    if (this.choices.indexOf(this.activeChoice) > -1) {
      event.preventDefault();
      this.selectChoice.next(this.activeChoice);
    }
  }

  private scrollToChoice(index: number) {
    this.activeChoice = this._choices[index];

    if (this.dropdownMenuElement) {
      const ulPosition = this.dropdownMenuElement.nativeElement.getBoundingClientRect();
      const li = this.dropdownMenuElement.nativeElement.children[index];
      const liPosition = li.getBoundingClientRect();

      if (
        liPosition.top < ulPosition.top ||
        liPosition.bottom > ulPosition.bottom
      ) {
        li.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest'
        });
      }
    }
  }
}
