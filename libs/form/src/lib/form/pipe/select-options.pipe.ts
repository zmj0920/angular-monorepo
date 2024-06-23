

import { Pipe, PipeTransform } from '@angular/core';
import { Observable, of as observableOf } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormlyFieldConfig, FormlyTemplateOptions } from '@ngx-formly/core';
import { SelectOption } from '../ng-field.type';

@Pipe({ name: 'formlySelectOptions' })
export class FormlySelectOptionsPipe implements PipeTransform {
  transform(options: any, field?: FormlyFieldConfig) {
    if (!(options instanceof Observable)) {
      options = observableOf(options);
    }

    return (options as Observable<any>).pipe(
      map(value => this.toOptions(value, field || {})),
    );
  }

  private toOptions(options: any[], field: FormlyFieldConfig) {
    const gOptions: SelectOption[] = [],
      groups: { [key: string]: any[] } = {},
      to = field.templateOptions || {};

    options.map(option => {
      if (!this.getGroupProp(option, to)) {
        gOptions.push(this.toOption(option, to));
      } else {
        if (!groups[this.getGroupProp(option, to)]) {
          groups[this.getGroupProp(option, to)] = [];
          gOptions.push({
            label: this.getGroupProp(option, to),
            group: groups[this.getGroupProp(option, to)],
          });
        }
        groups[this.getGroupProp(option, to)].push(this.toOption(option, to));
      }
    });

    return gOptions;
  }

  private toOption(item: any, to: FormlyTemplateOptions) {
    return {
      label: this.getLabelProp(item, to),
      value: this.getValueProp(item, to),
      disabled: this.getDisabledProp(item, to) || false,
      tooltipTitle: item['tooltipTitle'],
      translate: this.getTranslate(item)
    };
  }

  private getLabelProp(item: any, to: FormlyTemplateOptions): string {
    if (typeof to.labelProp === 'function') {
      return to.labelProp(item);
    }

    return item[to.labelProp || 'label'];
  }

  private getValueProp(item: any, to: FormlyTemplateOptions): string {
    if (typeof to.valueProp === 'function') {
      return to.valueProp(item);
    }

    return item[to.valueProp || 'value'];
  }

  private getDisabledProp(item: any, to: FormlyTemplateOptions): boolean {
    if (typeof to.disabledProp === 'function') {
      return to.disabledProp(item);
    }

    return item[to.disabledProp || 'disabled'];
  }

  private getGroupProp(item: any, to: FormlyTemplateOptions): string {
    if (typeof to.groupProp === 'function') {
      return to.groupProp(item);
    }

    return item[to.groupProp || 'group'];
  }

  private getTranslate(item: {
    translate?: boolean;
    label?: string;
    [key: string]: any;
  }): boolean {
    if (item.translate !== false && item.label?.includes('.')) {
      return true;
    } else {
      return false;
    }
  }
}
