import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SHARED_COMPOENT_MODULES } from './shared-component.module';
import { DIRECTIVES_MODULES } from './directive.module';
import { PROVIDERS_PIPES_MODULES } from './pipe.module';
import { SHARED_CDK_MODULES } from './shared-cdk.module';
import { SHARED_ZORRO_MODULES } from './shared-zorro.module';
import { THIRDMODULES } from './third.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    ...SHARED_ZORRO_MODULES,
    ...THIRDMODULES,
    ...SHARED_CDK_MODULES
  ],
  declarations: [...SHARED_COMPOENT_MODULES, ...DIRECTIVES_MODULES, ...PROVIDERS_PIPES_MODULES],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // RouterModule,
    ReactiveFormsModule,
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
    ...SHARED_CDK_MODULES
  ]
})
export class SharedModule {}