import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { cashOutline, cubeOutline, receiptOutline } from 'ionicons/icons';
import { HOME_TEXTS } from '@app/features/home/shared/consts/texts';
import { MenuItem } from '@app/features/home/models/menu-item.model';
import { AppHeaderComponent } from '@app/shared/components/app-header/app-header.component';
import { MenuItemComponent } from './components/menu-item/menu-item.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [AppHeaderComponent, IonContent, MenuItemComponent],
})
export class HomePage {
  private readonly router = inject(Router);

  readonly menuItems: MenuItem[] = [
    { icon: 'cash-outline', title: HOME_TEXTS.menu.sell, route: '/sell' },
    {
      icon: 'cube-outline',
      title: HOME_TEXTS.menu.manageItems,
      route: '/items',
    },
    {
      icon: 'receipt-outline',
      title: HOME_TEXTS.menu.sellRecord,
      route: '/sales',
    },
  ];

  constructor() {
    addIcons({ cashOutline, cubeOutline, receiptOutline });
  }

  onSelect(item: MenuItem): void {
    this.router.navigateByUrl(item.route);
  }
}
