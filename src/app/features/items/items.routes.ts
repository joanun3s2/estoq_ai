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
  {
    path: 'add',
    data: { title: ITEMS_TEXTS.menu.addItem },
    loadComponent: () =>
      import('@app/features/items/pages/add-item/add-item.page').then(
        (m) => m.AddItemPage,
      ),
  },
  {
    path: 'edit',
    data: { title: ITEMS_TEXTS.menu.modifyItems },
    loadComponent: () =>
      import('@app/features/items/pages/edit-item/edit-item.page').then(
        (m) => m.EditItemPage,
      ),
  },
];
