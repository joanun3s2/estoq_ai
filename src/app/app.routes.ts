import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('@app/features/home/home.routes').then((m) => m.HOME_ROUTES),
  },
  {
    path: 'sell',
    loadChildren: () =>
      import('@app/features/sell/sell.routes').then((m) => m.SELL_ROUTES),
  },
  {
    path: 'items',
    loadChildren: () =>
      import('@app/features/items/items.routes').then((m) => m.ITEMS_ROUTES),
  },
  {
    path: 'sales',
    loadChildren: () =>
      import('@app/features/sales/sales.routes').then((m) => m.SALES_ROUTES),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
