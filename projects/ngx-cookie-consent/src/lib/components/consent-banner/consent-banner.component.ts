import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { ConsentService } from '../../services/consent.service';
import { CookieCategory } from '../../models/cookie-category.model';

@Component({
  selector: 'ngx-consent-banner',
  templateUrl: './consent-banner.component.html',
  styleUrls: ['./consent-banner.component.css'],
  standalone: true,
  imports: [NgIf],
})
export class ConsentBannerComponent implements OnInit {
  showBanner = false;
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

  constructor(private consentService: ConsentService) {}

  ngOnInit() {
    if (!this.consentService.hasConsented()) {
      this.showBanner = true;
    }
  }

  acceptAll() {
    const consent = this.categories.reduce((acc, category) => {
      acc[category.identifier] = true;
      return acc;
    }, {} as any);
    this.consentService.setUserConsent(consent);
    this.showBanner = false;
  }

  rejectAll() {
    const consent = this.categories.reduce((acc, category) => {
      acc[category.identifier] = category.required;
      return acc;
    }, {} as any);
    this.consentService.setUserConsent(consent);
    this.showBanner = false;
  }

  openSettings() {
    // Implementar lógica para abrir el modal de configuración
  }
}
