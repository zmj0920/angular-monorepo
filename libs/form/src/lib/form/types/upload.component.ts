

import { Component, OnInit } from '@angular/core';
import { NgI18nService } from 'ng-galaxy-esd/i18n';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NzUploadFile } from 'ng-zorro-antd/upload';

import { NgFieldUploadType } from '../ng-field.type';

@Component({
  selector: 'ng-formly-field-upload',
  template: `
    <div>
      <input nz-input [hidden]="true"
        [formlyAttributes]="field" [formControl]="formControl">
      <nz-upload
        nzType="drag"
        [(nzFileList)]="fileList"
        [nzDisabled] = "to.nzDisabled || false"
        [nzLimit] = "to.nzLimit || 1"
        [nzMultiple]="to.nzMultiple || false"
        [nzShowUploadList]="{showRemoveIcon: [undefined, null, true].includes(to.showRemoveIcon) ? true : false}"
        [nzRemove] = "removeFile"
        [nzBeforeUpload]="beforeUpload">
        <p class="ant-upload-drag-icon">
          <ng-icon [type]="'inbox'" [color]="'#5F80F0'" [size]="'30px'"></ng-icon>
        </p>
        <p class="ant-upload-text">{{ dragFilesMsg | translate }}</p>
        <p class="ant-upload-hint">{{ orMsg | translate }}</p>
        <p class="select-file-info">{{ uploadFileMsg | translate }}</p>
      </nz-upload>
      <div class="upload-progress-wrap" *ngIf="to.startUpload">
        <div class="ant-upload-list-item-progress">
          <nz-progress [nzPercent]="to.progressPercentage"
            [nzStatus]="to.nzStatus || ''"
            [nzShowInfo]="false"
            [nzStrokeWidth]="2">
          </nz-progress>
        </div>
      </div>
    </div>
  `,
  styles: [
    `.upload-progress-wrap {
      position: relative;
    }
    nz-upload {
      display: block;
    }
    .select-file-info {
      color: #5F80F0;
      margin-top: 4px;
    }
    ::ng-deep .ant-upload.ant-upload-drag {
      background: #f5f7fa;
    }`
  ]
})

export class FormlyFieldUploadComponent extends NgFieldUploadType implements OnInit {
  uploading = false;
  fileList: NzUploadFile[] = [];
  dragFilesMsg!: string;
  orMsg!: string;
  uploadFileMsg!: string;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private ngI18nService: NgI18nService
  ) {
    super();
  }

  ngOnInit() {
    this.ngI18nService.change.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      const drag_files = this.ngI18nService.getData('form').drag_files;
      const or = this.ngI18nService.getData('form').or;
      const upload_file = this.ngI18nService.getData('form').upload_file;

      this.dragFilesMsg = this.to.drag_files_msg || drag_files;
      this.orMsg = this.to.or_msg || or;
      this.uploadFileMsg = this.to.upload_file_msg || upload_file;
    });
  }

  beforeUpload = (file: NzUploadFile): boolean => {
    this.to.startUpload = false;
    if (!this.to.nzLimit || this.to.nzLimit === 1) {
      this.fileList = [file];
    } else if (this.fileList.length < this.to.nzLimit) {
        this.fileList.push(file);
    } else {
      this.fileList.splice(0, 1);
      this.fileList.push(file);
    }
    this.field.formControl!.setValue(this.fileList);
    if (this.formControl.invalid) {
      this.formControl.markAsDirty();
    } else {
      this.formControl.markAsUntouched();
    }
    return false;
  }

  removeFile = (file: NzUploadFile): boolean => {
    this.to.startUpload = false;
    this.fileList = this.fileList.filter(item => item.name !== file.name);
    if (!this.fileList.length) {
      this.field.formControl!.setValue(null);
      if (this.formControl.invalid) {
        this.formControl.markAsDirty();
      } else {
        this.formControl.markAsUntouched();
      }
    }
    return true;
  }
}
