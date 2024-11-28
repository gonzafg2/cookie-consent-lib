import { CookieService } from './cookie.service';
import { UserConsent } from '../models/user-consent.model';
import { BehaviorSubject } from 'rxjs';

export class ConsentService {
  private consentCookieName = 'user_consent';
  private consentSubject = new BehaviorSubject<UserConsent | null>(null);
  consent$ = this.consentSubject.asObservable();

  constructor(private cookieService: CookieService) {
    const consent = this.getUserConsent();
    this.consentSubject.next(consent);
  }

  getUserConsent(): UserConsent | null {
    const consentCookie = this.cookieService.getCookie(this.consentCookieName);
    return consentCookie ? JSON.parse(decodeURIComponent(consentCookie)) : null;
  }

  setUserConsent(consent: UserConsent) {
    this.cookieService.setCookie(
      this.consentCookieName,
      JSON.stringify(consent),
      365
    );
    this.consentSubject.next(consent);
  }

  hasConsented(): boolean {
    return this.getUserConsent() !== null;
  }
}