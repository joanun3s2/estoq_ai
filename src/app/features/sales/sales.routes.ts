import { Routes } from '@angular/router';
import { SALES_TEXTS } from '@app/features/sales/shared/consts/texts';

export const SALES_ROUTES: Routes = [
  {
    path: '',
    data: { title: SALES_TEXTS.title },
    loadComponent: () =>
      import('@app/features/sales/pages/sales/sales.page').then(
        (m) => m.SalesPage,
      ),
  },
];
