import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { DemoComponent } from './demo/demo.component';
import { OperatorsComponent } from './operators/operators.component';

const router = [
  {
    path: '',
    component: DemoComponent
  },
  {
    path: 'operators',
    component: OperatorsComponent
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [DemoComponent],
  imports: [SharedModule, RouterModule.forChild(router)]
})
export class AngularDemoModule {}
