import { Routes } from '@angular/router';
import { SELL_TEXTS } from '@app/features/sell/shared/consts/texts';

export const SELL_ROUTES: Routes = [
  {
    path: '',
    data: { title: SELL_TEXTS.title },
    loadComponent: () =>
      import('@app/features/sell/pages/sell/sell.page').then((m) => m.SellPage),
  },
];
