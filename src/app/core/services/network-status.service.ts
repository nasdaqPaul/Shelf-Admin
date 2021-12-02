import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export default class NetworkStatusService {
  private onlineStatusObservable : BehaviorSubject<'online' | 'offline'>;

  constructor() {
    window.addEventListener('online', this.setOnlineState);
    window.addEventListener('offline', this.setOfflineState);
    this.onlineStatusObservable = new BehaviorSubject<'online' | 'offline'>(navigator.onLine ? 'online' : 'offline');
  }

  get status() {
    return this.onlineStatusObservable.asObservable();
  }

  private setOnlineState = () => {
    this.onlineStatusObservable.next('online');
  }

  private setOfflineState = () => {
    this.onlineStatusObservable.next('offline');
  }
}
