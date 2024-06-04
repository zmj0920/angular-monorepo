import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-popover-copy',
  templateUrl: './popover-copy.component.html',
  styleUrls: [
    './popover-copy.component.scss'
  ]
})
export class PopoverCopyComponent  {

  @Input() data!: Array<string>;
  @Input() text!: string;
  isHide = true;

  hidePopover() {
    this.isHide = false;
  }

  change() {
    this.isHide = true;
  }

}
