import { Routes } from '@angular/router';
import { ITEMS_TEXTS } from '@app/features/items/shared/consts/texts';

export const ITEMS_ROUTES: Routes = [
  {
    path: '',
    data: { title: ITEMS_TEXTS.title },
    loadComponent: () =>
      import('@app/features/items/pages/items/items.page').then(
        (m) => m.ItemsPage,
      ),
  },
];
