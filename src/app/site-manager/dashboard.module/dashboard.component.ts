import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Connection } from '../../storage/local/db/connected-sites.object-store';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  connectedSites!: Connection[]

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.connectedSites.subscribe((connections) => {
      this.connectedSites = [...connections];
    });
  }
}
