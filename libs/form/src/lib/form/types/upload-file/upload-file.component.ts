

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { NgFieldUploadFileType } from '../../ng-field.type';

@Component({
  selector: 'ng-formly-field-upload',
  templateUrl: './upload-file.component.html'
})

export class FormlyFieldUploadFileComponent extends NgFieldUploadFileType implements OnInit {
  @ViewChild('selectFile', { static: false }) selectFile!: ElementRef;

  ngOnInit() {
  }

  clickSelectFile() {
    this.selectFile.nativeElement.click();
  }

  changeSelectFile(event: any) {
    if (!event.target.files.length) {
      this.field.formControl!.setValue(null);
    } else {
      this.field.formControl!.setValue(event.target.files[0]);
    }
    if (this.formControl.invalid) {
      this.formControl.markAsDirty();
    } else {
      this.formControl.markAsUntouched();
    }
  }

  clearData() {
    this.field.formControl!.setValue(null);
    this.selectFile.nativeElement.value = '';
    if (this.formControl.invalid) {
      this.formControl.markAsDirty();
    } else {
      this.formControl.markAsUntouched();
    }
  }
}
