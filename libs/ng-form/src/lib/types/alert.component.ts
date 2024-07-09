import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, Type } from '@angular/core';
import { FieldType, FieldTypeConfig, FormlyFieldConfig, FormlyFieldProps } from '@ngx-formly/core';
import { NzConfigService } from 'ng-zorro-antd/core/config';
import { FormRefSourceService } from '@angular-monorepo/ng-form';
import { isTemplateRef } from 'ng-zorro-antd/core/util';

interface AlertProps extends FormlyFieldProps {
  nzBanner?: boolean;
  nzAction?: string;
  _nzAction?: string | TemplateRef<void>;
  nzCloseable?: boolean;
  nzCloseText?: string;
  _nzCloseText?: string | TemplateRef<void>;
  nzDescription?: string;
  _nzDescription?: string | TemplateRef<void>;
  nzMessage?: string;
  _nzMessage?: string | TemplateRef<void> | null;
  nzShowIcon?: boolean;
  nzIconType?: string;
  nzType?: 'success' | 'info' | 'warning' | 'error';
  nzOnClose?: (evt: boolean) => void;
}

export interface FormlyAlertFieldConfig extends FormlyFieldConfig<AlertProps> {
  type: 'alert' | Type<FormlyFieldAlertComponent>;
}
@Component({
  selector: 'formly-field-alert',
  template: `
    <div class="formly-alert">
      <nz-alert
        [formlyAttributes]="field"
        [nzBanner]="props.nzBanner"
        [nzMessage]="props._nzMessage || null"
        [nzAction]="props._nzAction || null"
        [nzCloseable]="props.nzCloseable"
        [nzCloseText]="props._nzCloseText || null"
        [nzDescription]="props._nzDescription || null"
        [nzIconType]="props.nzIconType || null"
        [nzShowIcon]="props.nzShowIcon || nzShowIcon"
        [nzType]="props.nzType || 'info'"
        (nzOnClose)="props.nzOnClose?.($event)"
      ></nz-alert>
    </div>
  `,
  styles: [
    `
      ::ng-deep .formly-alert .ant-alert-message {
        color: rgba(0, 0, 0, 0.6);
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormlyFieldAlertComponent extends FieldType<FieldTypeConfig<AlertProps>> implements OnInit {
  constructor(private nzConfigService: NzConfigService, private dataSource: FormRefSourceService) {
    super();
  }

  get nzShowIcon() {
    return this.nzConfigService.getConfigForComponent('alert')?.nzShowIcon;
  }
  ngOnInit(): void {
    if (this.props['nzMessage']) {
      const nzMessage = this.getTemplate(this.props.nzMessage);
      this.props['_nzMessage'] = isTemplateRef(nzMessage) ? nzMessage : this.props.nzMessage;
    }
    if (this.props['nzAction']) {
      const nzAction = this.getTemplate(this.props.nzAction);
      this.props['_nzAction'] = isTemplateRef(nzAction) ? nzAction : this.props.nzAction;
    }
    if (this.props['nzCloseText']) {
      const nzCloseText = this.getTemplate(this.props.nzCloseText);
      this.props['_nzCloseText'] = isTemplateRef(nzCloseText) ? nzCloseText : this.props.nzCloseText;
    }
    if (this.props['nzDescription']) {
      const nzDescription = this.getTemplate(this.props.nzDescription);
      this.props['_nzDescription'] = isTemplateRef(nzDescription) ? nzDescription : this.props.nzDescription;
    }
  }

  getTemplate(key: string) {
    return this.dataSource.getRender(key);
  }
}
