import { Injectable } from '@angular/core';
import {SitesService} from "../../../site-manager/services/sites.service";
import {SiteConnection} from "../../../storage/local/db/connected-sites.object-store";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Article} from "../types";

@Injectable({
  providedIn: 'root'
})
export class UploaderService {
  currentSite!: SiteConnection;
  constructor(private sites: SitesService, private http: HttpClient) {
  }

  upload(article: Article, site: SiteConnection){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${site.accessToken}`
    })
    return this.http.post(`http://${site.host}/articles`, article, {headers});
  }
}
