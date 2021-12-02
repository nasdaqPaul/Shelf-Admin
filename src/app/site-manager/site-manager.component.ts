import { Component, OnInit } from '@angular/core';
import { Modal } from 'bootstrap';
import NetworkStatusService from '../core/services/network-status.service';

@Component({
  template: `
    <main>
      <header class="bg-light">
        <nav-bar (connectSite)="openConnectSiteModel()"></nav-bar>
      </header>
      <router-outlet *ngIf="status==='online'; else offline"></router-outlet>
      <ng-template #offline>
        <section class="container">
          <h1 class="center">Seems like you are offline</h1>
          <p>The sites module requires an internet connection to work</p>
          <hr>
          <a class="btn btn-primary" routerLink="/">Go back to My Workspace</a>
        </section>
      </ng-template>
      <connect-site></connect-site>
    </main>
  `,
})
export default class SiteManagerComponent implements OnInit {
  status!: string;

  private connectSiteModal!: Modal;

  constructor(private net: NetworkStatusService) {
    net.status.subscribe((status) => {
      this.status = status;
    });
  }

  ngOnInit() {
    this.connectSiteModal = new Modal('#connect-site-modal');
  }

  openConnectSiteModel() {
    this.connectSiteModal.show();
  }
}
