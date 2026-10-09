import { Component, input, output } from '@angular/core';
import { IonIcon } from '@ionic/angular';
import { MenuItem } from '@app/features/items/models/menu-item.model';

@Component({
  selector: 'app-items-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
  imports: [IonIcon],
})
export class ItemsMenuItemComponent {
  readonly item = input.required<MenuItem>();
  readonly selected = output<MenuItem>();
}