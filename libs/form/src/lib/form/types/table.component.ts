

import { Component, OnInit } from '@angular/core';

import { FormRefSourceService } from '../directive/ng-form-ref.directive';
import { NgFieldTableType } from '../ng-field.type';

@Component({
  selector: 'ng-formly-field-table',
  template: `
    <div class="ng-formly-field-table">
      <div class="nt-descriptions" *ngIf="to.descriptions">
        <ng-container *ngStringTemplateOutlet="to.descriptions">
          <div *ngFor="let d of to.descriptions;">
            <ng-container *ngStringTemplateOutlet="d">
              <span>{{d}}</span>
            </ng-container>
          </div>
        </ng-container>
      </div>

      <ng-table
        [defaultSort]="to.defaultSort"
        [defaultSortRevers]="to.defaultSortRevers"
        [column]="to.column"
        [dataSet]="to.dataSet"
        [loading]="to.loading"
        [showTotal]="to.showTotal"
        [showSetupColumn]="to.showSetupColumn"
        [selectFilters]="to.selectFilters || []"
        [filterFacets]="to.filterFacets || []"
        [globalActions]="to.globalActions || []"
        [pageSize]="to.pageSize || 10"
        [pageSizeOptions]="to.pageSizeOptions || [10, 15, 20]"
        [disablePagination]="to.disablePagination || false"
        [hideOnSinglePage]="to.hideOnSinglePage || false"
        >
        <ng-container *ngFor="let render of to.ngTableRowRefs;">
          <ng-template ngTableRowRef [ngTableRowRef]="render"
            type="rows" let-item="item" let-index="index">
            <ng-template
              [ngTemplateOutlet]="getTemplate(render)"
              [ngTemplateOutletContext]="{item: item, index: index}">
            </ng-template>
          </ng-template>
        </ng-container>
      </ng-table>
    </div>
  `,
  styles: [
    `::ng-deep .ng-formly-field-table .ant-form-item-control {
        line-height: 1;
      }
      ::ng-deep .ng-formly-field-table .nt-descriptions {
        margin-bottom: 16px;
        line-height: 18px;
      }
    `
  ]
})
export class FormlyFieldTableComponent extends NgFieldTableType implements OnInit {

  constructor(
    private dataSource: FormRefSourceService,
  ) {
    super();
  }

  ngOnInit() {
    this.getTableRowRefs();
  }

  getTemplate(key: string) {
    return this.dataSource.getRender(key);
  }

  getTableRowRefs() {
    if (!this.to.ngTableRowRefs || !this.to.ngTableRowRefs.length) {
      this.to.ngTableRowRefs = [];
      this.to.column!.forEach(column => {
        if (column.render) {
          this.to.ngTableRowRefs.push(column.render);
        }
      });
    }
  }
}
