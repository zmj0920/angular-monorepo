

import { Injectable } from '@angular/core';
import { EventManager } from '@angular/platform-browser';
import { FormGroup, FormArray } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzModalCustomComponent } from './modal-form/nz-modal-custom.component';
import { FormlyFormOptions } from '@ngx-formly/core';
import * as _ from 'lodash-es';
import {
  HttpEventType, HttpEvent, HttpResponse
} from '@angular/common/http';

import { IFormModalConfig } from './modal-form/iform-modal-config';

@Injectable()
export class NgModalFormService {

  constructor(
    private eventManager: EventManager,
    private modalService: NzModalService
  ) { }

  getUploadField(kfModal: any) {
    for (let i = 0; i < kfModal.fields.length; i += 1) {
      if (kfModal.fields[i].type === 'upload') {
        return kfModal.fields[i];
      }
    }
  }

  requestProgress(kfModal: any, modal: NzModalRef) {
    const uploadField = this.getUploadField(kfModal);
    uploadField.templateOptions.progressPercentage = 0;
    uploadField.templateOptions.startUpload = true;
    uploadField.templateOptions.nzDisabled = true;
    uploadField.templateOptions.nzStatus = null;
    uploadField.templateOptions.showRemoveIcon = false;
    kfModal.callback(kfModal).subscribe((event: HttpResponse<any> |{
      status: number;
      type: number;
      loaded: number;
      total: number;
    }) => {
      if (event.type === HttpEventType.UploadProgress) {
        const loaded = event.loaded || 0;
        const progressPercentage = (loaded / event.total * 100).toFixed(0);
        uploadField.templateOptions.progressPercentage = progressPercentage;
        if (progressPercentage === '100') {
          uploadField.templateOptions.nzStatus = 'success';
        }
      } else if (event instanceof HttpResponse) {
        kfModal.isConfirmLoading = false;
        kfModal.submit(kfModal, event.body);
        modal.destroy();
      }
      if (event['status'] === 0) {
        uploadField.templateOptions.nzStatus = 'exception';
      }
    }, () => {
      kfModal.showMessage = true;
      kfModal.isConfirmLoading = false;
      uploadField.templateOptions.nzDisabled = false;
      uploadField.templateOptions.showRemoveIcon = true;
    });
  }

  requestFunction(kfModal: any, modal: NzModalRef) {
    kfModal.callback(kfModal).subscribe((response: HttpResponse<any>) => {
      kfModal.isConfirmLoading = false;
      kfModal.submit(kfModal, response);
      modal.destroy();
    },
      () => {
        kfModal.showMessage = true;
        kfModal.isConfirmLoading = false;
      });
  }

  requestData(kfModal: any, modal: NzModalRef) {
    kfModal.callback.subscribe((response: HttpEvent<{}>) => {
      kfModal.isConfirmLoading = false;
      kfModal.submit(kfModal, response);
      modal.destroy();
    },
      () => {
        kfModal.showMessage = true;
        kfModal.isConfirmLoading = false;
      });
  }

  open(config: IFormModalConfig): NzModalRef<any, any> {
    let modal: NzModalRef, nzFooter = null, nzClassName = 'nz-modal-form';
    const nzClosable = config.nzHiddenClosable ? false : true;
    if (!config.nzHiddenFooter) {
      nzFooter = config.nzFooter || [
        {
          label: config.nzCancelText || 'Cancel',
          type: config.nzCancelType || 'default',
          onClick: () => {
            modal.destroy();
          }
        },
        {
          label: config.nzOkText || 'Ok',
          type: config.nzOkType || 'primary',
          disabled: (content: any) => {
            if (content && content.form) {
              return !content.form.valid || content.form.customDisableBtn;
            }
          },
          loading: (kfModal: any) => {
            if (kfModal) {
              return kfModal.isConfirmLoading;
            }
          },
          onClick: (kfModal: any) => {
            if (kfModal.callback) {
              kfModal.showMessage = false;
              kfModal.isConfirmLoading = true;
              if (typeof kfModal.callback === 'function') {
                if (kfModal.reportProgress) {
                  this.requestProgress(kfModal, modal);
                } else {
                  this.requestFunction(kfModal, modal);
                }
              } else {
                this.requestData(kfModal, modal);
              }
            } else {
              kfModal.submit(kfModal);
              modal.destroy();
            }
          }
        },
      ];
    }

    if (config.modalType === 'broad') {
      nzClassName = nzClassName + ' broad-modal-form';
    } else {
      nzClassName = nzClassName + ' common-modal-form';
    }

    if (config.type === 'tab') {
      config.form = config.form ? config.form : new FormArray(config.tabs.map(() => new FormGroup({})));
      config.options = config.options ? config.options : config.tabs.map(() => <FormlyFormOptions>{});
    } else {
      config.form = config.form ? config.form : new FormGroup({});
      config.options = config.options ? config.options : <FormlyFormOptions>{};
    }
    config.model = config.model || {};
    const nzComponentParams = {
      model: _.cloneDeep(config.model),
      fields: _.cloneDeep(config.fields),
      options: _.cloneDeep(config.options),
      form: _.cloneDeep(config.form),
      tabs: _.cloneDeep(config.tabs),
      submit: config.onSubmit,
      callback: config.callback,
      type: config.type || 'common',
      errorMessage: config.NzErrorMessage || null,
      isConfirmLoading: false,
      reportProgress: config.reportProgress || false,
      showMessage: false
    };
    modal = this.modalService.create({
      nzTitle: config.nzTitle || 'Title',
      nzClassName: nzClassName,
      nzWrapClassName: 'nz-modal-form-wrap',
      nzWidth: config.nzWidth || '480px',
      nzContent: config.nzContent || NzModalCustomComponent,
      nzComponentParams: config.nzComponentParams || nzComponentParams,
      nzClosable: nzClosable,
      nzMaskClosable: config.nzMaskClosable || false,
      nzKeyboard: !!config.keyboard || true,
      nzFooter: nzFooter
    });

    return modal;
  }
}
