import {
  Component, EventEmitter, OnDestroy, OnInit, Output,
} from '@angular/core';
import { Tooltip } from 'bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import NetworkStatusService from '../../../core/services/network-status.service';
import { AuthService } from '../../services/auth.service';
import { Connection } from '../../../storage/local/db/connected-sites.object-store';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit, OnDestroy {
  appOffline!: boolean;

  private toolTips!: Tooltip[];

  private ngUnsub = new Subject();

  connectedSites!: Connection[];

  @Output() connectSite = new EventEmitter();

  constructor(private net: NetworkStatusService, private authService: AuthService) {
    this.net.status.subscribe((status) => {
      this.appOffline = status !== 'online';
    });
  }

  buildToolTips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    this.toolTips = tooltipTriggerList.map((tooltipTriggerEl) => new Tooltip(tooltipTriggerEl));
  }

  ngOnInit(): void {
    this.buildToolTips();
    this.authService.connectedSites.pipe(takeUntil(this.ngUnsub)).subscribe((connections) => {
      this.connectedSites = [...connections];
    });
  }

  ngOnDestroy() {
    this.toolTips.forEach((tooTip) => tooTip.dispose());
    this.ngUnsub.next();
    this.ngUnsub.complete();
  }
}
