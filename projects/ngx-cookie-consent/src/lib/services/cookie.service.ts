export class CookieService {
  constructor() {}

  setCookie(name: string, value: string, days?: number, path: string = '/') {
    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 864e5);
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie =
      name + '=' + encodeURIComponent(value) + expires + '; path=' + path;
  }

  getCookie(name: string): string | null {
    return (
      document.cookie
        .split('; ')
        .find((row) => row.startsWith(name + '='))?.split('=')[1] || null
    );
  }

  deleteCookie(name: string, path: string = '/') {
    this.setCookie(name, '', -1, path);
  }
}