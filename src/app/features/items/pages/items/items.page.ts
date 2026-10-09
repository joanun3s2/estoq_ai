import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  addCircleOutline,
  constructOutline,
  cubeOutline,
} from 'ionicons/icons';
import { MenuItem } from '@app/features/items/models/menu-item.model';
import { ITEMS_TEXTS } from '@app/features/items/shared/consts/texts';
import { AppHeaderComponent } from '@app/shared/components/app-header/app-header.component';
import { ItemsMenuItemComponent } from './components/menu-item/menu-item.component';

addIcons({ addCircleOutline, constructOutline, cubeOutline });

@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
  imports: [AppHeaderComponent, IonContent, IonIcon, ItemsMenuItemComponent],
})
export class ItemsPage {
  private readonly router = inject(Router);

  readonly texts = ITEMS_TEXTS;

  readonly menuItems: MenuItem[] = [
    {
      icon: 'add-circle-outline',
      title: ITEMS_TEXTS.menu.addItem,
      route: '/items/add',
    },
    {
      icon: 'construct-outline',
      title: ITEMS_TEXTS.menu.modifyItems,
      route: '/items/edit',
    },
  ];

  onSelect(item: MenuItem): void {
    this.router.navigateByUrl(item.route);
  }
}