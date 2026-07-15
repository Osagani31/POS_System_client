import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CookieManagerService {
  setToken(name: string, value: string, days = 7): void {
    const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
  }

  getToken(name: string): string | null {
    const cookies = document.cookie ? document.cookie.split('; ') : [];
    const entry = cookies.find((cookie) => cookie.startsWith(`${name}=`));
    return entry ? decodeURIComponent(entry.slice(name.length + 1)) : null;
  }

  removeToken(name: string): void {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  }

  tokenIsExistsWithPromise(name: string): Promise<boolean> {
    return Promise.resolve(!!this.getToken(name));
  }
}