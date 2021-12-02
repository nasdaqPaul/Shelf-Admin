import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import DatabaseService from '../../storage/local/db';
import { Connection } from '../../storage/local/db/connected-sites.object-store';

interface Credentials {

}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private siteParams: { username: string, host: string } | null = null;

  private connectedSitesObservable = new BehaviorSubject<Connection[]>([])

  constructor(private http: HttpClient, private db: DatabaseService) {
    this.db.connectedSites.getAll().then((connections) => {
      this.connectedSitesObservable.next(connections);
    });
  }

  get connectedSites() {
    return this.connectedSitesObservable.asObservable();
  }

  connect(connectParams: { host: string, username: string, password: string }) {
    this.siteParams = {
      username: connectParams.username,
      host: connectParams.host,
    };

    return this.http.post<{accessToken: string}>(`http://${connectParams.host}/auth/login`, {
      username: connectParams.username,
      password: connectParams.password,
    }).pipe(tap(this.saveConnection, () => {
      this.siteParams = null;
    }));
  }

  private saveConnection = (value: { accessToken: string }) => {
    this.db.connectedSites.add({ ...this.siteParams!, accessToken: value.accessToken }, { returnAllItems: true }).then((connections) => {
      this.connectedSitesObservable.next(connections!);
    });
  }
}
