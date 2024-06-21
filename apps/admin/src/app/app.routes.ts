import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('./routes/custom-form/custom-form.module').then(
        (_) => _.CustomFormModule
      ),
  },
];
