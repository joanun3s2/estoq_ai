import { Component } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { SALES_TEXTS } from '@app/features/sales/shared/consts/texts';
import { AppHeaderComponent } from '@app/shared/components/app-header/app-header.component';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.page.html',
  styleUrls: ['./sales.page.scss'],
  imports: [AppHeaderComponent, IonContent],
})
export class SalesPage {
  readonly texts = SALES_TEXTS;
}
