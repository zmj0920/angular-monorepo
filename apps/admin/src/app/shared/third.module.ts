import { Type } from '@angular/core';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyNgZorroAntdModule } from '@ngx-formly/ng-zorro-antd';
export const THIRDMODULES: Array<Type<any>> = [
  FormlyNgZorroAntdModule,
  FormlyModule,
];
