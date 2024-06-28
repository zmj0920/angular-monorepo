import { CommonModule, registerLocaleData } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SHARED_COMPOENT_MODULES } from './shared-component.module';
import { DIRECTIVES_MODULES } from './directive.module';
import { PROVIDERS_PIPES_MODULES } from './pipe.module';
import { SHARED_CDK_MODULES } from './shared-cdk.module';
import { SHARED_ZORRO_MODULES } from './shared-zorro.module';
import { THIRDMODULES } from './third.module';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { SHARED_SERVICE } from './shared-service.module';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { NgFormModule } from './components/form/ng-form.module';
import { NZ_I18N, zh_CN } from 'ng-zorro-antd/i18n';
import zh from '@angular/common/locales/zh';

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(
  (key) => antDesignIcons[key]
);
registerLocaleData(zh);
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    NgFormModule,
    ...SHARED_ZORRO_MODULES,
    ...THIRDMODULES,
    ...SHARED_CDK_MODULES,
  ],
  declarations: [
    ...SHARED_COMPOENT_MODULES,
    ...DIRECTIVES_MODULES,
    ...PROVIDERS_PIPES_MODULES,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // RouterModule,
    ReactiveFormsModule,
    NgFormModule,
    ...SHARED_ZORRO_MODULES,
    // third libs
    ...THIRDMODULES,
    // your components
    ...SHARED_COMPOENT_MODULES,
    // your directive
    ...DIRECTIVES_MODULES,
    // your pipe
    ...PROVIDERS_PIPES_MODULES,
    // your cdk
    ...SHARED_CDK_MODULES,
  ],
  providers: [
    ...SHARED_SERVICE,
    { provide: NZ_I18N, useValue: zh_CN },
    { provide: NZ_ICONS, useValue: icons },
  ],
})
export class SharedModule {}
