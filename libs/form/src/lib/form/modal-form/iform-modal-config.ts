

import { FormlyFormOptions } from '@ngx-formly/core';
import { FormArray, FormGroup } from '@angular/forms';
import { EventEmitter, TemplateRef, Type } from '@angular/core';
import { ModalButtonOptions, OnClickCallback } from 'ng-zorro-antd/modal';
import { Subject } from 'rxjs';


type TFormModalButtonType = 'primary' | 'default' | 'dashed' | 'danger' | 'link' | 'text' | null | undefined;
export interface IFormModalConfig<T extends any = any> {
  callBack?: Subject<any>;
  nzFooter?: string | TemplateRef<{}> | Array<ModalButtonOptions<T>>;
  nzHiddenFooter?: boolean;
  nzOkText?: string;
  nzOkType?: TFormModalButtonType;
  nzCancelText?: string;
  nzCancelType?: TFormModalButtonType;
  modalType?: string | 'broad';
  type?: string;
  options?: FormlyFormOptions ;
  form?: FormArray | FormGroup;
  nzTitle?: string;
  nzWidth?: string;
  nzContent?: string | TemplateRef<{}> | Type<T>;
  model?: any;
  fields?: any[];
  tabs?: any;
  onSubmit?: EventEmitter<T> | OnClickCallback<T> | Function;
  callback?: Function;
  NzErrorMessage?: string;
  nzMaskClosable?: boolean;
  keyboard?: string;
  nzHiddenClosable?: boolean;
  nzComponentParams?: any;
  reportProgress?: boolean;
}
