import { Component } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { ITEMS_TEXTS } from '@app/features/items/shared/consts/texts';
import { AppHeaderComponent } from '@app/shared/components/app-header/app-header.component';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.page.html',
  styleUrls: ['./add-item.page.scss'],
  imports: [AppHeaderComponent, IonContent],
})
export class AddItemPage {
  readonly texts = ITEMS_TEXTS;
}