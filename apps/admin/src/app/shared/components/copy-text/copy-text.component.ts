import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-copy-text',
  templateUrl: './copy-text.component.html',
  styleUrls: ['./copy-text.component.scss'],
})
export class CopyTextComponent {
  @Input() val?: string;
}
