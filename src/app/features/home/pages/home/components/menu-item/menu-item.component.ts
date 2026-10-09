import { Component, input, output } from '@angular/core';
import { IonIcon } from '@ionic/angular';
import { MenuItem } from '@app/features/home/models/menu-item.model';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
  imports: [IonIcon],
})
export class MenuItemComponent {
  readonly item = input.required<MenuItem>();
  readonly selected = output<MenuItem>();
}
