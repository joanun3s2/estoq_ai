import { Component } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { SELL_TEXTS } from '@app/features/sell/shared/consts/texts';
import { AppHeaderComponent } from '@app/shared/components/app-header/app-header.component';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.page.html',
  styleUrls: ['./sell.page.scss'],
  imports: [AppHeaderComponent, IonContent],
})
export class SellPage {
  readonly texts = SELL_TEXTS;
}
