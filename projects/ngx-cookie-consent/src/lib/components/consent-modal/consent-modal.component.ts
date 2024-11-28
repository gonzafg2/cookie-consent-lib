import { Component } from '@angular/core';
import { ConsentService } from '../../services/consent.service';
import { CookieCategory } from '../../models/cookie-category.model';
import { FormsModule } from '@angular/forms';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'ngx-consent-modal',
  templateUrl: './consent-modal.component.html',
  styleUrls: ['./consent-modal.component.css'],
  standalone: true,
  imports: [FormsModule, NgForOf],
})
export class ConsentModalComponent {
  categories: CookieCategory[] = [
    {
      name: 'Funcionales',
      identifier: 'functional',
      description: 'Necesarias para el funcionamiento del sitio web.',
      required: true,
    },
    {
      name: 'Analíticas',
      identifier: 'analytics',
      description: 'Ayudan a entender cómo interactúan los usuarios.',
      required: false,
    },
    // Agrega más categorías según sea necesario
  ];

  userConsent: { [key: string]: boolean } = {};

  constructor(private consentService: ConsentService) {
    const consent = this.consentService.getUserConsent();
    this.categories.forEach((category) => {
      this.userConsent[category.identifier] =
        consent?.[category.identifier] ?? category.required;
    });
  }

  savePreferences() {
    this.consentService.setUserConsent(this.userConsent);
    // Cerrar el modal
  }
}
