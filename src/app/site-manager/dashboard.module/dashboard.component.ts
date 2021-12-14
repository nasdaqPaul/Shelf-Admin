import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { SiteConnection } from '../../storage/local/db/connected-sites.object-store';
import {SitesService} from "../services/sites.service";

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  connectedSites!: SiteConnection[];
  currentSite!: SiteConnection | null;

  constructor(private sites: SitesService) {
  }

  ngOnInit(): void {
    this.sites.connectedSites.subscribe((connections) => {
      this.connectedSites = [...connections];
    });
    this.sites.currentSite.subscribe(connection => {
      this.currentSite = connection;
    })
  }
}
