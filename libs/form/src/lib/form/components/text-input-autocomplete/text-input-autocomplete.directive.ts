

import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Injector,
  Input,
  OnDestroy,
  Output,
  ViewContainerRef
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { TextInputAutocompleteMenuComponent } from './text-input-autocomplete-menu.component';
import { Subject } from 'rxjs';

export interface ChoiceSelectedEvent {
  choice: any;
  insertedAt: {
    start: number;
    end: number;
  };
}

@Directive({
  selector:
    // eslint-disable-next-line @angular-eslint/directive-selector
    'textarea[ngTextInputAutocomplete],input[type="text"][ngTextInputAutocomplete]'
})
export class TextInputAutocompleteDirective implements OnDestroy {
  private PIXELS_PER_INCH = 96;
  private defaults: {[key: string]: number} = {
    'ch': 8,
    'ex': 7.15625,
    'em': 16,
    'rem': 16,
    'in': this.PIXELS_PER_INCH,
    'cm': this.PIXELS_PER_INCH / 2.54,
    'mm': this.PIXELS_PER_INCH / 25.4,
    'pt': this.PIXELS_PER_INCH / 72,
    'pc': this.PIXELS_PER_INCH / 6,
    'px': 1
  };
  private properties = [
    'direction',  // RTL support
    'boxSizing',
    'width',  // on Chrome and IE, exclude the scrollbar, so the mirror div wraps exactly as the textarea does
    'height',
    'overflowX',
    'overflowY',  // copy the scrollbar for IE
    'borderTopWidth',
    'borderRightWidth',
    'borderBottomWidth',
    'borderLeftWidth',
    'borderStyle',
    'paddingTop',
    'paddingRight',
    'paddingBottom',
    'paddingLeft',
    // https://developer.mozilla.org/en-US/docs/Web/CSS/font
    'fontStyle',
    'fontVariant',
    'fontWeight',
    'fontStretch',
    'fontSize',
    'fontSizeAdjust',
    'lineHeight',
    'fontFamily',
    'textAlign',
    'textTransform',
    'textIndent',
    'textDecoration',  // might not make a difference, but better be safe
    'letterSpacing',
    'wordSpacing',
    'tabSize',
    'MozTabSize'
  ];
  private win: {mozInnerScreenX: number} = window as any;
  private isBrowser = (typeof window !== 'undefined');
  private isFirefox = (this.isBrowser && this.win.mozInnerScreenX != null);

  /**
   * The character that will trigger the menu to appear
   */
  @Input() triggerCharacter = '@';

  /**
   * An optional keyboard shortcut that will trigger the menu to appear
   */
  @Input() keyboardShortcut!: (event: KeyboardEvent) => boolean;

  /**
   * The regular expression that will match the search text after the trigger character
   */
  @Input() searchRegexp = /^\w*$/;

  /**
   * Whether to close the menu when the host textarea loses focus
   */
  @Input() closeMenuOnBlur = false;

  /**
   * The menu component to show with available options.
   * You can extend the built in `TextInputAutocompleteMenuComponent` component to use a custom template
   */
  @Input() menuComponent = TextInputAutocompleteMenuComponent;

  /**
   * Called when the options menu is shown
   */
  @Output() menuShown = new EventEmitter();

  /**
   * Called when the options menu is hidden
   */
  @Output() menuHidden = new EventEmitter();

  /**
   * Called when a choice is selected
   */
  @Output() choiceSelected = new EventEmitter<ChoiceSelectedEvent>();

  /**
   * A function that accepts a search string and returns an array of choices. Can also return a promise.
   */
  @Input() findChoices!: (searchText: string) => any[] | Promise<any[]>;

  /**
   * A function that formats the selected choice once selected.
   */
  @Input() getChoiceLabel: (choice: any) => string = choice => choice;

  /* tslint:disable member-ordering */
  private menu:
    | {
        component: ComponentRef<TextInputAutocompleteMenuComponent>;
        triggerCharacterPosition: number;
        lastCaretPosition?: number;
      }
    | undefined;

  private menuHidden$ = new Subject();

  private usingShortcut = false;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,
    private injector: Injector,
    private elm: ElementRef
  ) {}

  @HostListener('keypress', ['$event.key'])
  onKeypress(key: string) {
    if (key === this.triggerCharacter) {
      this.usingShortcut = false;
      this.showMenu();
    }
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (this.keyboardShortcut && this.keyboardShortcut(event)) {
      this.usingShortcut = true;
      this.showMenu();
      this.onChange('');
    }
  }

  @HostListener('input', ['$event.target.value'])
  onChange(value: string) {
    if (this.menu) {
      if (
        value[this.menu.triggerCharacterPosition] !== this.triggerCharacter &&
        !this.usingShortcut
      ) {
        this.hideMenu();
      } else {
        const cursor = this.elm.nativeElement.selectionStart;
        if (cursor < this.menu.triggerCharacterPosition) {
          this.hideMenu();
        } else {
          if (this.usingShortcut && !this.menu) {
            value = this.triggerCharacter;
          }
          const offset = this.usingShortcut ? 0 : 1;
          const searchText = value.slice(
            this.menu.triggerCharacterPosition + offset,
            cursor
          );

          if (!searchText.match(this.searchRegexp)) {
            this.hideMenu();
          } else {
            this.menu.component.instance.searchText = searchText;
            this.menu.component.instance.choices = [];
            this.menu.component.instance.choiceLoadError = undefined;
            this.menu.component.instance.choiceLoading = true;
            this.menu.component.changeDetectorRef.detectChanges();
            Promise.resolve(this.findChoices(searchText))
              .then(choices => {
                if (this.menu) {
                  this.menu.component.instance.choices = choices;
                  this.menu.component.instance.choiceLoading = false;
                  this.menu.component.changeDetectorRef.detectChanges();
                }
              })
              .catch(err => {
                if (this.menu) {
                  this.menu.component.instance.choiceLoading = false;
                  this.menu.component.instance.choiceLoadError = err;
                  this.menu.component.changeDetectorRef.detectChanges();
                }
              });
          }
        }
      }
    }
  }

  @HostListener('blur')
  onBlur() {
    if (this.menu) {
      this.menu.lastCaretPosition = this.elm.nativeElement.selectionStart;

      if (this.closeMenuOnBlur === true) {
        this.hideMenu();
      }
    }
  }

  private parseUnit(str: string | number, out: [number, string] | null) {
    if (!out) {
      out = [ 0, ''];
    }
    str = String(str);
    const num = parseFloat(str);
    out[0] = num;
    const strObj = str.match(/[\d.\-\+]*\s*(.*)/);
    out[1] = strObj ? (strObj[1] || '') : '';
    return out;
  }

  private toPX(str: string | number): any {
    if (!str && str !== 0) {
      return null;
    }
    if (this.defaults[str]) {
      return this.defaults[str];
    }
    // detect number of units
    const parts = this.parseUnit(str, null);
    if (!isNaN(parts[0])) {
      if (parts[1]) {
        const px = this.toPX(parts[1]);
        return typeof px === 'number' ? parts[0] * px : null;
      } else {
        return parts[0];
      }
    }
    return null;
  }

  private getCaretCoordinates(element: any, position: any, options: any) {
    if (!this.isBrowser) {
      throw new Error('textarea-caret-position#getCaretCoordinates should only be called in a browser');
    }
    const debug = options && options?.debug || false;
    if (debug) {
      const el = document.querySelector('#input-textarea-caret-position-mirror-div');
      if (el) {
        el.parentNode?.removeChild(el);
      }
    }

    // The mirror div will replicate the textarea's style
    const div = document.createElement('div');
    div.id = 'input-textarea-caret-position-mirror-div';
    document.body.appendChild(div);

    const style: any = div.style;
    const computed = window.getComputedStyle ? window.getComputedStyle(element) : element.currentStyle;  // currentStyle for IE < 9
    const isInput = element.nodeName === 'INPUT';
    // Default textarea styles
    style.whiteSpace = 'pre-wrap';
    if (!isInput) {
      style.wordWrap = 'break-word';  // only for textarea-s
    }
    // Position off-screen
    style.position = 'absolute';  // required to return coordinates properly
    if (!debug) {
      style.visibility = 'hidden';  // not 'display: none' because we want rendering
    }
    // Transfer the element's properties to the div
    this.properties.forEach(function (prop) {
      if (isInput && prop === 'lineHeight') {
        // Special case for <input>s because text is rendered centered and line height may be != height
        if (computed.boxSizing === 'border-box') {
          const height = parseInt(computed.height, 10);
          const outerHeight =
            parseInt(computed.paddingTop, 10) +
            parseInt(computed.paddingBottom, 10) +
            parseInt(computed.borderTopWidth, 10) +
            parseInt(computed.borderBottomWidth, 10);
          const targetHeight = outerHeight + parseInt(computed.lineHeight, 10);
          if (height > targetHeight) {
            style.lineHeight = height - outerHeight + 'px';
          } else if (height === targetHeight) {
            style.lineHeight = computed.lineHeight;
          } else {
            style.lineHeight = '0';
          }
        } else {
          style.lineHeight = computed.height;
        }
      } else {
        style[prop] = computed[prop];
      }
    });
    if (this.isFirefox) {
      // Firefox lies about the overflow property for textareas: https://bugzilla.mozilla.org/show_bug.cgi?id=984275
      if (element.scrollHeight > parseInt(computed.height, 10)) {
        style.overflowY = 'scroll';
      }
    } else {
      style.overflow = 'hidden';  // for Chrome to not render a scrollbar; IE keeps overflowY = 'scroll'
    }
    div.textContent = element.value.substring(0, position);
    // The second special handling for input type="text" vs textarea:
    // spaces need to be replaced with non-breaking spaces - http://stackoverflow.com/a/13402035/1269037
    if (isInput) {
      div.textContent = div.textContent?.replace(/\s/g, '\u00a0') || '';
    }
    const span = document.createElement('span');
    // Wrapping must be replicated *exactly*, including when a long word gets
    // onto the next line, with whitespace at the end of the line before (#7).
    // The  *only* reliable way to do that is to copy the *entire* rest of the
    // textarea's content into the <span> created at the caret position.
    // For inputs, just '.' would be enough, but no need to bother.
    span.textContent = element.value.substring(position) || '.';  // || because a completely empty faux span doesn't render at all
    div.appendChild(span);
    const coordinates = {
      top: span.offsetTop + parseInt(computed['borderTopWidth'], 10),
      left: span.offsetLeft + parseInt(computed['borderLeftWidth'], 10),
      height: parseInt(computed['lineHeight'], 10)
    };
    if (debug) {
      span.style.backgroundColor = '#aaa';
    } else {
      document.body.removeChild(div);
    }
    return coordinates;
  }

  private showMenu() {
    if (!this.menu) {
      const menuFactory = this.componentFactoryResolver.resolveComponentFactory<
        TextInputAutocompleteMenuComponent
      >(this.menuComponent);
      this.menu = {
        component: this.viewContainerRef.createComponent(
          menuFactory,
          undefined,
          this.injector
        ),
        triggerCharacterPosition: this.elm.nativeElement.selectionStart
      };

      const lineHeight = this.getLineHeight(this.elm.nativeElement);
      const { top, left } = this.getCaretCoordinates(
        this.elm.nativeElement,
        this.elm.nativeElement.selectionStart,
        null
      );
      this.menu.component.instance.position = {
        top: top + lineHeight,
        left
      };
      this.menu.component.changeDetectorRef.detectChanges();
      this.menu.component.instance.selectChoice
        .pipe(takeUntil(this.menuHidden$))
        .subscribe(choice => {
          const label = this.getChoiceLabel(choice);
          const textarea: HTMLTextAreaElement = this.elm.nativeElement;
          const value: string = textarea.value;
          // tslint:disable-next-line:no-non-null-assertion
          const startIndex = this.menu!.triggerCharacterPosition;
          const start = value.slice(0, startIndex);
          const caretPosition =
            // tslint:disable-next-line:no-non-null-assertion
            this.menu!.lastCaretPosition || textarea.selectionStart;
          const end = value.slice(caretPosition);
          textarea.value = start + label + end;
          // force ng model / form control to update
          textarea.dispatchEvent(new Event('input'));
          this.hideMenu();
          const setCursorAt = (start + label).length;
          textarea.setSelectionRange(setCursorAt, setCursorAt);
          textarea.focus();
          this.choiceSelected.emit({
            choice,
            insertedAt: {
              start: startIndex,
              end: startIndex + label.length
            }
          });
        });
      this.menuShown.emit();
    }
  }

  getLineHeight(elm: HTMLElement) {
    const lineHeightStr = getComputedStyle(elm).lineHeight || '';
    const fontSizeStr = getComputedStyle(elm).fontSize || '';
    const fontSize = +this.toPX(fontSizeStr);
    const normal = 1.2;
    const lineHeightNum = parseFloat(lineHeightStr);

    if (lineHeightStr === lineHeightNum + '') {
      return fontSize * lineHeightNum;
    }

    if (lineHeightStr.toLowerCase() === 'normal') {
      return fontSize * normal;
    }

    return this.toPX(lineHeightStr);
  }

  private hideMenu() {
    if (this.menu) {
      this.menu.component.destroy();
      this.menuHidden$.next();
      this.menuHidden.emit();
      this.menu = undefined;
    }
  }

  ngOnDestroy() {
    this.hideMenu();
  }
}
