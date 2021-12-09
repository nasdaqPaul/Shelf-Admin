import {Injectable} from '@angular/core';
import {AuthService} from "./auth.service";
import DatabaseService from "../../storage/local/db";
import {BehaviorSubject} from "rxjs";
import {Connection} from "../../storage/local/db/connected-sites.object-store";
import {UserProfile} from "../users.module/types";

@Injectable({
  providedIn: 'root'
})
export class SitesService {

  private connectedSitesObservable = new  BehaviorSubject<Connection[]>([]);
  private currentSiteObservable =  new BehaviorSubject<Connection | null>(null);

  get currentSite(){
    return this.currentSiteObservable.asObservable();
  }

  constructor(private authService: AuthService, private db: DatabaseService) {
    this.db.connectedSites.getAll().then(connections => {
      this.connectedSitesObservable.next(connections);
      if(localStorage.getItem('current-site')){
        this.currentSiteObservable.next(JSON.parse(<string>localStorage.getItem('current-site')));
      }
    })

  }
  get connectedSites() {
    return this.connectedSitesObservable.asObservable();
  }
  async connect(credentials: { host: string, username: string, password: string }) {
    const resBody = await this.authService.login(credentials).toPromise();
    const newConnection: Connection =  {
      host: credentials.host,
      username: credentials.username,
      accessToken: resBody.accessToken,
      user: resBody.user
    }
    const allConnections = await this.db.connectedSites.add(newConnection, {returnAllItems: true});
    this.connectedSitesObservable.next(allConnections!);
    this.setCurrentSite(newConnection);
  }
  setCurrentSite(connection: Connection){
    localStorage.setItem('current-site', JSON.stringify(connection));
    this.currentSiteObservable.next(connection);
  }
  async disconnect() {

  }
}
