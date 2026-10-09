import { Component } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { ITEMS_TEXTS } from '@app/features/items/shared/consts/texts';
import { AppHeaderComponent } from '@app/shared/components/app-header/app-header.component';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.page.html',
  styleUrls: ['./edit-item.page.scss'],
  imports: [AppHeaderComponent, IonContent],
})
export class EditItemPage {
  readonly texts = ITEMS_TEXTS;
}