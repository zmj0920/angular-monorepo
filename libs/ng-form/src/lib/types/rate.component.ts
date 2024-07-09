import { ChangeDetectionStrategy, Component, TemplateRef, Type } from '@angular/core';
import { FieldType, FieldTypeConfig, FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyFieldProps } from '@ngx-formly/ng-zorro-antd/form-field';
import { FormRefSourceService } from '@angular-monorepo/ng-form';
import { isTemplateRef } from 'ng-zorro-antd/core/util';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

interface RateProps extends FormlyFieldProps {
  nzAllowClear?: boolean;
  nzAllowHalf?: boolean;
  nzAutoFocus?: boolean;
  nzCharacterName?: string;
  nzCount?: number;
  nzDisabled?: boolean;
  nzTooltips?: string[];
  nzOnBlur?: (evt: FocusEvent) => void;
  nzOnFocus?: (evt: FocusEvent) => void;
  nzOnHoverChange?: (evt: number) => void;
  nzOnKeyDown?: (evt: KeyboardEvent) => void;
  nzCharacter: string;
  _nzCharacter?: TemplateRef<NzSafeAny>;
}

export interface FormlyRateFieldConfig extends FormlyFieldConfig<RateProps> {
  type: 'rate' | Type<FormlyFieldRateComponent>;
}

@Component({
  selector: 'ng-formly-field-rate',
  template: `
    <nz-rate
      [formControl]="formControl"
      [formlyAttributes]="field"
      [nzDisabled]="props.nzDisabled || props.disabled || formControl.disabled"
      [nzTooltips]="props.nzTooltips || []"
      [nzAllowClear]="props.nzAllowClear !== false"
      [nzAllowHalf]="props.nzAllowHalf"
      [nzAutoFocus]="props.nzAutoFocus"
      [nzCharacter]="props._nzCharacter || nzCharacter"
      [nzCount]="props.nzCount || 5"
      (nzOnKeyDown)="props.nzOnKeyDown?.($event)"
      (nzOnFocus)="props.nzOnFocus?.($event)"
      (nzOnBlur)="props.nzOnBlur?.($event)"
      (nzOnHoverChange)="props.nzOnHoverChange?.($event)"
      ngDefaultControl
    ></nz-rate>
    <ng-template #nzCharacter>
      <span nz-icon nzType="star"></span>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormlyFieldRateComponent extends FieldType<FieldTypeConfig<RateProps>> {
  constructor(private dataSource: FormRefSourceService) {
    super();
  }
  ngOnInit(): void {
    if (this.props['nzCharacter']) {
      const nzCharacter = this.getTemplate(this.props.nzCharacter);
      this.props['_nzCharacter'] = isTemplateRef(nzCharacter) ? nzCharacter : undefined;
    }
  }

  getTemplate(key: string) {
    return this.dataSource.getRender(key);
  }
}
