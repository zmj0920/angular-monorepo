

import { FieldType, FormlyFieldConfig, FormlyTemplateOptions } from '@ngx-formly/core';
import { TemplateRef } from '@angular/core';
import { Column, Data, GlobalAction, SelectFilter } from 'ng-galaxy-esd/table';
import { FilterFacets } from 'ng-galaxy-esd/search';

interface CommonTemplateOptions extends FormlyTemplateOptions {
  arrangement?: 'transverse' | 'horizontal';
  popoverTitle?: string;
  popoverTitleRender?: string;
  popoverContent?: string;
  popoverContentRender?: string;
  hideRequiredMarker?: boolean;
  prompt?: string;
  formlyItemStyle?: { [key: string]: any };
  formlyLabelStyle?: { [key: string]: any };
  validationStyle?: { [key: string]: any };
}

interface AlertTemplateOptions extends FormlyTemplateOptions {
  nzType?: 'info' | 'warning' | 'error' | 'success';
  nzMessage?: string;
}

interface ImageTemplateOptions extends FormlyTemplateOptions {
  maxWidth?: string;
  maxHeight?: string;
}

interface InputTemplateOptions extends FormlyTemplateOptions {
  placeholder?: string;
  precision?: number;
  autoCompleteExpression?: (value: string) => string;
  autoCompleteTriggerCharacter?: string;
}

interface IpTemplateOptions extends FormlyTemplateOptions {
  IPType?: 'wrap' | 'no_wrap';
  ipsDisabled?: boolean[];
  ipsPattern?: RegExp[];
}

interface CidrTemplateOptions extends FormlyTemplateOptions {
  ipsDisabled?: boolean[];
  ipsPattern?: RegExp[];
}

interface MultipleInputTemplateOptions extends FormlyTemplateOptions {
  limit?: number;
}

interface RadioTemplateOptions extends FormlyTemplateOptions {
  align?: 'horizontal' | 'vertical';
  options: RadioOption[];
}

interface SelectTemplateOptions extends FormlyTemplateOptions {
  placeholder?: string;
  multiple?: boolean;
  options: SelectOption[];
  loading?: boolean;
  groupProp?: (item: { [key: string]: any }) => string | string;
  valueProp?: (item: { [key: string]: any }) => string | string;
  labelProp?: (item: { [key: string]: any }) => string | string;
  allowClear?: boolean;
  allowCheckAll?: boolean;
  showSearch?: boolean;
  optionOverflowSize?: number;
}

interface SliderTemplateOptions extends FormlyTemplateOptions {
  unit?: string;
}

interface UnfoldTemplateOptions extends FormlyTemplateOptions {
  content?: string;
  triggerUnfold?: () => void;
}

interface UploadPictureTemplateOptions extends FormlyTemplateOptions {
  invalidIndex?: number[];
  nzLimit: number;
  nzMultiple?: number;
  loading?: boolean;
  uploadType?: 'picture' | 'icon';
}

interface UploadTemplateOptions extends FormlyTemplateOptions {
  nzLimit?: number;
  nzMultiple?: number;
  startUpload?: boolean;
  progressPercentage?: number;
  nzStatus?: 'success' | 'exception';
  drag_files_msg?: 'string';
  or_msg?: 'string';
  upload_file_msg?: 'string';
  showRemoveIcon?: boolean;
}

interface UploadFileTemplateOptions extends FormlyTemplateOptions {
  placeholder?: string;
  btnName?: string;
}

interface VerifyTemplateOptions extends FormlyTemplateOptions {
  btnName?: string;
  btnDisabled?: boolean;
  loading?: boolean;
  verifyResult?: string;
  verifyStatus?: 'success' | 'error';
  param?: { [key: string]: any };
  verifyData?: () => void;
}

interface MultiCheckboxTemplateOptions extends FormlyTemplateOptions {
  options?: MultiCheckboxOption[];
}

interface CheckboxTemplateOptions extends FormlyTemplateOptions {
  disabled?: boolean;
  label?: string;
  hideRequiredMarker?: boolean;
}

interface PasswordTemplateOptions extends FormlyTemplateOptions {
  disabled?: boolean;
  placeholder?: string;
}

interface TableTemplateOptions extends FormlyTemplateOptions {
  descriptions?: TemplateRef<void> | string[];
  globalActions?: TemplateRef<void> | GlobalAction[];
  selectFilters?: TemplateRef<void> | SelectFilter[];
  filterFacets?: TemplateRef<void> | FilterFacets[];
  defaultSort?: string;
  defaultSortRevers?: 'ascend' | 'descend';
  column?: Column[];
  loading?: boolean;
  dataSet?: Data[];
  showSetupColumn?: boolean;
  showTotal?: boolean;
  disablePagination?: boolean;
  hideOnSinglePage?: boolean;
  pageSize?: number;
  pageSizeOptions?: number[];
}

interface CustomTemplateOptions extends FormlyTemplateOptions {
  render?: string;
}

interface TextareaTemplateOptions extends FormlyTemplateOptions {
  disabled?: boolean;
  placeholder?: string;
  rows?: number;
}

type NgFormlyTemplateOptions = CommonTemplateOptions | AlertTemplateOptions | ImageTemplateOptions |
  InputTemplateOptions | IpTemplateOptions | MultipleInputTemplateOptions | RadioTemplateOptions |
  SelectTemplateOptions | SliderTemplateOptions | UnfoldTemplateOptions | UploadPictureTemplateOptions |
  UploadTemplateOptions | UploadFileTemplateOptions | VerifyTemplateOptions | TableTemplateOptions |
  CustomTemplateOptions | CidrTemplateOptions | MultiCheckboxTemplateOptions | CheckboxTemplateOptions |
  PasswordTemplateOptions | TextareaTemplateOptions;

export interface NgFormlyFieldConfig extends FormlyFieldConfig {
  templateOptions?: NgFormlyTemplateOptions;
}

export class NgFieldTableType extends FieldType {
  readonly to!: CommonTemplateOptions & TableTemplateOptions;
}

export class NgFieldIpType extends FieldType {
  readonly to!: CommonTemplateOptions & IpTemplateOptions;
}

export class NgFieldCidrType extends FieldType {
  readonly to!: CommonTemplateOptions & CidrTemplateOptions;
}

export class NgFieldUploadFileType extends FieldType {
  readonly to!: CommonTemplateOptions & UploadFileTemplateOptions;
}

export class NgFieldUploadPictureType extends FieldType {
  readonly to!: CommonTemplateOptions & UploadPictureTemplateOptions;
}

export class NgFieldUploadType extends FieldType {
  readonly to!: CommonTemplateOptions & UploadTemplateOptions;
}

export class NgFieldSelectType extends FieldType {
  readonly to!: CommonTemplateOptions & SelectTemplateOptions;
}

export class NgFieldRadioType extends FieldType {
  readonly to!: CommonTemplateOptions & RadioTemplateOptions;
}

export class NgFieldMultiCheckboxType extends FieldType {
  readonly to!: CommonTemplateOptions & MultiCheckboxTemplateOptions;
}

export class NgFieldCheckboxType extends FieldType {
  readonly to!: CommonTemplateOptions & CheckboxTemplateOptions;
}

export interface SelectOption {
  label: string;
  disabled?: boolean;
  value?: any;
  group?: SelectOption[];
  translate?: boolean;
  tooltipTitle?: string;
  [key: string]: any;
}

export interface RadioOption {
  optionPopoverTitle?: string;
  optionPopoverTitleRender?: string;
  optionPopoverContent?: string;
  optionPopoverContentRender?: string;
  disabled?: boolean;
  title?: string;
  value: string;
  label?: string;
}

export interface  MultiCheckboxOption {
  label: string;
  disabled?: boolean;
  key: string;
}
