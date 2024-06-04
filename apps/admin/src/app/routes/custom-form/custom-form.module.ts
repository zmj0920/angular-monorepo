import { NgModule } from '@angular/core';
import { CustomFormComponent } from './custom-form.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

const router = [
  {
    path: '',
    component: CustomFormComponent,
  },
];

@NgModule({
  declarations: [CustomFormComponent],
  imports: [SharedModule, RouterModule.forChild(router)],
})
export class CustomFormModule {}
