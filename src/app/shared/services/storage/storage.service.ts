import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public set(key: string, data: Record<string, any>): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  public get(key: string) {
    return JSON.parse(localStorage.getItem(key) ?? "{}");
  }

  public remove(key: string): void {
    localStorage.removeItem(key);
  }

  public clear() {
    localStorage.clear()
  }
}
