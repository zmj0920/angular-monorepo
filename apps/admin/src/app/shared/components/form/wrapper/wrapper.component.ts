import {
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';
import { isTemplateRef } from 'ng-zorro-antd/core/util';
import { FormRefSourceService } from '../ng-form-ref.directive';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { NzConfigService } from 'ng-zorro-antd/core/config';
// [nzTooltipIcon]="props['nzTooltipIcon'] ? props['nzTooltipIcon'] : ''"

@Component({
  selector: 'form-wrapper',
  // standalone: true,
  // imports: [CommonModule],
  templateUrl: './wrapper.component.html',
  styleUrl: './wrapper.component.scss',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
})
export class WrapperComponent extends FieldWrapper implements OnInit {
  get errorState() {
    return this.showError ? 'error' : '';
  }

  // captchaTooltipIcon: NzFormTooltipIcon = {
  //   type: 'info-circle',
  //   theme: 'twotone',
  // };

  constructor(
    private dataSource: FormRefSourceService,
    private nzConfigService: NzConfigService,
    private cdr: ChangeDetectorRef
  ) {
    super();
  }
  ngOnInit(): void {
    // this.formControl.statusChanges.subscribe(() => this.cdr.detectChanges());
    if (this.props['nzTooltipIcon']) {
      this.props['_nzTooltipIcon'] = {
        type: this.props['nzTooltipIcon'].type || 'info-circle',
        theme: this.props['nzTooltipIcon'].theme || 'outline',
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
