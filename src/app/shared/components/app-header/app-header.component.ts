import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IonButton,
  IonButtons,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { arrowBackOutline, homeOutline } from 'ionicons/icons';

addIcons({ arrowBackOutline, homeOutline });

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
  imports: [IonButton, IonButtons, IonHeader, IonIcon, IonTitle, IonToolbar],
})
export class AppHeaderComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly location = inject(Location);

  readonly title =
    (this.route.snapshot.data['title'] as string | undefined) ?? '';
  readonly isHome = this.route.snapshot.data['home'] === true;

  goHome(): void {
    this.router.navigateByUrl('/home');
  }

  goBack(): void {
    const state = this.location.getState() as { navigationId?: number } | null;
    if ((state?.navigationId ?? 0) > 1) {
      this.location.back();
    } else {
      this.router.navigateByUrl('/home');
    }
  }
}
