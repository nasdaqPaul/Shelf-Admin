import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {SitesService} from "../../services/sites.service";
import {Modal} from "bootstrap";

@Component({
  selector: 'connect-site',
  templateUrl: './connect-site-modal.component.html',
  styleUrls: ['./connect-site-modal.component.css'],
})
export class ConnectSiteModalComponent implements OnInit, OnDestroy {
  private connectSiteModal!: Modal;
  connectSiteForm = new FormGroup({
    host: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
  })

  failedAuth = false;
  alreadyConnected = false;

  constructor(private sites: SitesService) {
  }

  ngOnInit(): void {
    this.connectSiteModal = new Modal('#connect-site-modal');
  }
  ngOnDestroy() {
    this.connectSiteModal.dispose();
  }

  async connect() {
    try {
      await this.sites.connect(this.connectSiteForm.value);
      this.connectSiteModal.hide();
    } catch (error) {
      if (error.status === 401) {
        this.alreadyConnected = false;
        this.failedAuth = true;
      } else {
        this.alreadyConnected = true;
        this.failedAuth = false;
      }
    }
  }

  connectSite() {
    this.alreadyConnected = false;
    this.failedAuth = false;
    this.connectSiteForm.reset();
    this.connectSiteModal.show();
  }
}
