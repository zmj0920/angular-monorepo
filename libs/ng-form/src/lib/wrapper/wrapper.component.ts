import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewEncapsulation } from '@angular/core';
import { FieldWrapper, FormlyFieldConfig } from '@ngx-formly/core';
import { isTemplateRef } from 'ng-zorro-antd/core/util';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { FormlyFieldProps } from '@ngx-formly/ng-zorro-antd/form-field/form-field.wrapper';
import { FormRefSourceService } from '@angular-monorepo/ng-form';
export interface WrapperProps extends FormlyFieldProps {
  nzTooltipIcon: NzFormTooltipIcon;
  _nzTooltipIcon?: string | NzFormTooltipIcon;
  nzTooltipTitle: string;
  _nzTooltipTitle?: TemplateRef<void>;
  nzExtra: string;
  _nzExtra?: TemplateRef<void>;
  formlyLabelStyle: Record<string, any>;
  nzNoColon: boolean;
}

@Component({
  selector: 'form-wrapper',
  // standalone: true,
  // imports: [CommonModule],
  templateUrl: './wrapper.component.html',
  styleUrl: './wrapper.component.scss',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WrapperComponent extends FieldWrapper<FormlyFieldConfig<WrapperProps>> implements OnInit {
  get errorState() {
    return this.showError ? 'error' : '';
  }

  constructor(private dataSource: FormRefSourceService) {
    super();
  }
  ngOnInit(): void {
    // this.formControl.statusChanges.subscribe(() => this.cdr.detectChanges());
    if (this.props['nzTooltipIcon']) {
      this.props['_nzTooltipIcon'] = {
        type: this.props['nzTooltipIcon']?.type || 'info-circle',
        theme: this.props['nzTooltipIcon']?.theme || 'outline'
      };
    }
    if (this.props['nzTooltipTitle']) {
      const nzTooltipTitle = this.getTemplate(this.props['nzTooltipTitle']);
      if (isTemplateRef(nzTooltipTitle)) {
        this.props['_nzTooltipTitle'] = nzTooltipTitle;
      }
    }
    if (this.props['nzExtra']) {
      const nzExtra = this.getTemplate(this.props['nzExtra']);
      if (isTemplateRef(nzExtra)) {
        this.props['_nzExtra'] = nzExtra;
      }
    }
  }
  getTemplate(key: string) {
    return this.dataSource.getRender(key);
  }
}
