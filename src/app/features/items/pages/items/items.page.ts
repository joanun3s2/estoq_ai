import { Component } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { ITEMS_TEXTS } from '@app/features/items/shared/consts/texts';
import { AppHeaderComponent } from '@app/shared/components/app-header/app-header.component';

@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
  imports: [AppHeaderComponent, IonContent],
})
export class ItemsPage {
  readonly texts = ITEMS_TEXTS;
}
