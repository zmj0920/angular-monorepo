

import { Component, OnInit, ViewChild, ChangeDetectorRef, OnDestroy, ElementRef } from '@angular/core';
import { NgI18nService } from 'ng-galaxy-esd/i18n';
import { NzUploadFile, UploadFileStatus } from 'ng-zorro-antd/upload';
import { takeUntil, tap, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { NgFieldUploadPictureType } from '../ng-field.type';

@Component({
  selector: 'ng-formly-field-upload',
  template: `
    <div class="formly-upload-picture-wrap"
      #formlyUploadPictureWrap
      [ngClass]="{'custom-formly-upload-picture-wrap': to.nzLimit===1,
        'custom-formly-upload-icon-wrap': to.uploadType==='icon'}">
      <input nz-input [hidden]="true"
        [formlyAttributes]="field" [formControl]="formControl">
      <nz-spin class="loading" [nzSpinning]="to.loading" [nzSize]="'small'">
        <nz-upload
          nzListType="picture-card"
          [(nzFileList)]="imageList"
          [nzShowButton]="imageList.length < to.nzLimit"
          [nzDisabled] = "to.nzDisabled || false"
          [nzLimit] = "to.nzLimit"
          [nzMultiple]="to.nzMultiple || false"
          [nzShowUploadList]="showUploadList"
          [nzRemove] = "removeFile"
          [nzBeforeUpload]="beforeUpload">
          <i nz-icon nzType="plus"></i>
        </nz-upload>
      </nz-spin>
      <span [hidden]="true" #svgElement>
        <span class="upload-error-svg">
          <ng-icon [type]="'fail'" [color]="'#BEC3CE'" [size]="'24px'"></ng-icon>
        </span>
      </span>
      <span #deleteSVGElement class="upload-delete-icon upload-delete-icon-hide">
        <ng-icon class="delete-icon" [type]="'clear'" [color]="'#BEC3CE'" [size]="'12px'" (click)="removePicture()"></ng-icon>
        <span class="upload-delete-file-wrap">
          <span class="upload-delete-file" (click)="reUpload()">
          {{reUploadName}}
          </span>
        </span>
      </span>
    </div>
  `,
  styles: [
    `i[nz-icon] {
      font-size: 12px;
      color: #d4d4da;;
    }
    .formly-upload-picture-wrap .upload-error-svg {
      position: relative;
      top: 11px;
      left: 1px;
    }
    .formly-upload-picture-wrap .upload-delete-icon-hide {
      display: none;
    }
    .formly-upload-picture-wrap .upload-delete-icon {
      position: absolute;
      left: 8px;
    }
    .formly-upload-picture-wrap .upload-delete-icon ng-icon {
      cursor: pointer;
      z-index: 1;
      position: absolute;
    }
    .formly-upload-picture-wrap .upload-delete-icon .upload-delete-file-wrap {
      position: absolute;
      left: -78px;
      width: 96px;
      height: 67px;
      display: inline-block;
    }
    .formly-upload-picture-wrap .upload-delete-icon .upload-delete-file-wrap .upload-delete-file {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      cursor: pointer;
      color: #fff;
      font-size: 14px;
    }
    ::ng-deep .formly-upload-picture-wrap .ant-upload-list-picture-card-container {
      width: auto;
      height: auto;
    }
    ::ng-deep .formly-upload-picture-wrap .ant-upload-list-picture-card .ant-upload-list-item {
      width: 96px;
      height: 68px;
      padding: 0;
    }
    ::ng-deep .formly-upload-picture-wrap .ant-upload-list-picture-card .ant-upload-list-item-info {
      border-radius: 4px;
    }
    ::ng-deep .formly-upload-picture-wrap .ant-upload-list-item-thumbnail {
      width: 100%;
      height: 100%;
    }
    ::ng-deep .formly-upload-picture-wrap .ant-upload-list-item-thumbnail img {
      max-width: 100%;
      max-height: 100%;
      width: auto;
      height: auto;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
    }
    ::ng-deep .formly-upload-picture-wrap .ant-upload.ant-upload-select-picture-card {
      width: 96px;
      height: 68px;
      background-color: #ffffff;
    }
    ::ng-deep .formly-upload-picture-wrap .anticon-file svg{
      display: none;
    }
    ::ng-deep .formly-upload-picture-wrap .ant-form-item-control {
      line-height: normal;
    }
    ::ng-deep .formly-upload-picture-wrap .loading .ant-spin {
      width: 98px;
      height: 68px;
    }
    ::ng-deep .custom-formly-upload-picture-wrap .ant-upload-list-item:first-child .ant-upload-list-item-actions {
      transform: none;
      top: 0;
      left: 70px;
    }
    ::ng-deep .formly-upload-picture-wrap .ant-upload-list-item .ant-upload-span .ant-upload-list-item-name {
      display: none;
    }
    ::ng-deep .custom-formly-upload-picture-wrap .ant-upload-list-item:first-child .ant-upload-list-item-actions .anticon-delete {
      display: none;
    }
    ::ng-deep .formly-upload-picture-wrap .ant-upload-picture-card-wrapper {
      min-height: 76px;
    }
    ::ng-deep .custom-formly-upload-icon-wrap .ant-upload.ant-upload-select-picture-card{
      width: 56px;
      height: 56px;
    }
    ::ng-deep .custom-formly-upload-icon-wrap .ant-upload-list-picture-card .ant-upload-list-item {
      width: 56px;
      height: 56px;
    }
    ::ng-deep .custom-formly-upload-icon-wrap .loading .ant-spin {
      width: 56px;
      height: 56px;
    }
    .custom-formly-upload-icon-wrap .upload-delete-icon .upload-delete-file-wrap {
      width: 56px;
      height: 56px;
      left: -40px;
    }
    .custom-formly-upload-icon-wrap .upload-delete-icon {
      position: absolute;
      left: -31px;
    }
    .custom-formly-upload-icon-wrap .upload-delete-icon .upload-delete-file-wrap .upload-delete-file {
      font-size: 12px;
    }
    .custom-formly-upload-icon-wrap .ant-upload-picture-card-wrapper {
      min-height: 64px;
    }
    .custom-formly-upload-icon-wrap .upload-error-svg {
      top: 5px;
      left: 0;
    }
    `
  ]
})

export class FormlyFieldUploadPictureComponent extends NgFieldUploadPictureType implements OnInit, OnDestroy {
  @ViewChild('svgElement', { static: true }) svgElement!: ElementRef;
  @ViewChild('deleteSVGElement', { static: true }) deleteSVGElement!: ElementRef;
  @ViewChild('formlyUploadPictureWrap', { static: true }) formlyUploadPictureWrap!: ElementRef;
  uploading = false;
  fileList: NzUploadFile[] = [];
  imageList: NzUploadFile[] = [];
  operatorChange = false;
  reUploadName!: string;
  showUploadList = {
    showPreviewIcon: false,
    showRemoveIcon: true,
    hidePreviewIconInNonImage: true
  };
  onDestroy$ = new Subject<void>();

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private ngI18nService: NgI18nService
  ) {
    super();
  }

  ngOnInit() {
    this.to.loading = this.to.loading || false;
    this.to.nzLimit = this.to.nzLimit || 1;
    this.to.uploadType = this.to.uploadType || 'picture';
    this.imageListChange();
    this.ngI18nService.change.pipe(takeUntil(this.onDestroy$)).subscribe(() => {
      this.reUploadName = this.ngI18nService.getData('form').re_upload;
    });
  }

  private getBase64(img: any, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

  private getImgByteSize(data: string) {
    let size = 0;
    if (data) {
      const equalIndex = data.indexOf('=');
      if (equalIndex > 0) {
        const str = data.substring(0, equalIndex);
        const strLength = str.length;
        const fileLength = strLength - (strLength / 8) * 2;
        size = Math.floor(fileLength);
      } else {
        const strLength = data.length;
        const fileLength = strLength - (strLength / 8) * 2;
        size = Math.floor(fileLength);
      }
    }
    return size;
  }

  private setImageList(image: NzUploadFile) {
    this.imageList.push(image);
    this.imageList = [...this.imageList];
    if (!this.to.nzLimit || this.to.nzLimit === 1) {
      this.fileList = [image];
    } else if (this.fileList.length < this.to.nzLimit) {
      this.fileList.push(image);
    } else {
      this.fileList.splice(0, 1);
      this.fileList.push(image);
    }
  }

  imageListChange() {
    this.formControl.valueChanges.pipe(
      takeUntil(this.onDestroy$),
      distinctUntilChanged((pre, next) => {
        if (!pre || !next) {
          return false;
        }
        if (pre.length === next.length) {
          for (let i = 0; i < pre.length; i += 1) {
            if (pre[i].uid !== next[i].uid ||
              pre[i].name !== next[i].name) {
              return false;
            }
          }
          return true;
        }
        return false;
      }),
      tap(value => {
        if (!this.operatorChange && value?.length) {
          this.imageList = [];
          this.fileList = [];
          const images: NzUploadFile[] = value.slice(-this.to.nzLimit);
          images.forEach((image, i) => {
            if (!image.size) {
              image.size = this.getImgByteSize(image.data);
              const file: {
                uid: string;
                name: string;
                url?: string;
                status?: UploadFileStatus;
              } = {
                uid: i + '',
                name: image.name,
                status: 'done',
                url: image.data
              };
              this.setImageList(file);
            } else {
              this.setImageList(image);
            }
          });
          this.changeDetectorRef.detectChanges();
          this.setBorder();
        }
        if (this.operatorChange) {
          this.operatorChange = false;
        }
      }),
    ).subscribe();
  }

  getImageList(file: NzUploadFile) {
    this.getBase64(file, (img: string) => {
      const image: {
        uid: string;
        name: string;
        url?: string;
        status?: UploadFileStatus;
      } = {
        uid: file.uid,
        name: file.name,
        status: 'done',
        url: img
      };
      const type = file.name.split('.').pop()!.toLowerCase();
      const typeArr = ['png', 'gif', 'jpg', 'jpeg', 'bmp'];
      if (!typeArr.includes(type)) {
        image.url = '';
        image.status = 'error';
      }
      if (!this.to.nzLimit || this.to.nzLimit === 1) {
        this.imageList = [image];
      } else if (this.imageList.length < this.to.nzLimit) {
        this.imageList.push(image);
      } else {
        this.imageList.splice(0, 1);
        this.imageList.push(image);
      }
      this.imageList = [...this.imageList];
      this.setBorder();
      this.changeDetectorRef.detectChanges();
    });
  }

  setBorder() {
    setTimeout(() => {
      for (let i = 0; i < this.imageList.length; i += 1) {
        if (this.to.invalidIndex?.includes(i)) {
          this.imageList[i].status = 'error';
          this.imageList[i].url = '';
        } else {
          this.imageList[i].status = 'done';
        }
      }
      this.imageList = [...this.imageList];
      this.changeDetectorRef.detectChanges();
      const items = this.formlyUploadPictureWrap.nativeElement.getElementsByTagName('img');
      for (let i = 0; i < items.length; i += 1) {
        items[i].alt = '';
      }
      // Update SVG functionality
      setTimeout(() => {
        const svg = this.svgElement.nativeElement.innerHTML;
        const deleteElement = this.deleteSVGElement.nativeElement;
        const pictureWraps = this.formlyUploadPictureWrap.nativeElement;
        const invalidPicture = pictureWraps.getElementsByClassName('ant-upload-list-item-file');
        for (let j = 0; j < invalidPicture.length; j += 1) {
          invalidPicture[j].innerHTML = svg;
        }
        if (this.to.nzLimit === 1) {
          const deleteItems = pictureWraps.getElementsByClassName('ant-upload-list-item-actions');
          if (deleteItems.length) {
            deleteElement.classList.remove('upload-delete-icon-hide');
            deleteItems[0].append(deleteElement);
          }
        }
      }, 300);
    });
  }

  beforeUpload = (file: NzUploadFile): boolean => {
    if (this.to.nzLimit === 1) {
      const pictureWraps = this.formlyUploadPictureWrap.nativeElement;
      const deleteItems = pictureWraps.getElementsByClassName('ant-upload-list-item-actions');
      if (deleteItems.length) {
        deleteItems[0].style.display = 'none';
      }
    }
    this.operatorChange = true;
    if (!this.to.nzLimit || this.to.nzLimit === 1) {
      this.fileList = [file];
    } else if (this.fileList.length < this.to.nzLimit) {
      this.fileList.push(file);
    } else {
      this.fileList.splice(0, 1);
      this.fileList.push(file);
    }
    this.getImageList(file);
    this.field.formControl!.setValue(this.fileList);
    if (this.formControl.invalid) {
      this.formControl.markAsDirty();
    } else {
      this.formControl.markAsUntouched();
    }
    return false;
  }

  removeFile = (file: NzUploadFile): boolean => {
    this.operatorChange = true;
    this.fileList = this.fileList.filter(item => item.uid !== file.uid);
    this.field.formControl!.setValue(this.fileList);
    this.imageList = this.imageList.filter(item => item.uid !== file.uid);
    this.setBorder();
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

  reUpload() {
    this.formlyUploadPictureWrap.nativeElement.getElementsByClassName('ant-upload')[1].click();
  }

  removePicture() {
    this.formlyUploadPictureWrap.nativeElement.getElementsByClassName('anticon-delete')[0].click();
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
