import { Routes } from '@angular/router';
import { HOME_TEXTS } from '@app/features/home/shared/consts/texts';

export const HOME_ROUTES: Routes = [
  {
    path: '',
    data: { title: HOME_TEXTS.title, home: true },
    loadComponent: () =>
      import('@app/features/home/pages/home/home.page').then((m) => m.HomePage),
  },
];
