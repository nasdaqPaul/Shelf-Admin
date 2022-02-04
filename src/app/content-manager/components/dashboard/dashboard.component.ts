import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

const PAGE_TITLE = 'Shelf | Dashboard';

@Component({
  templateUrl: 'dashboard.component.html',
  styles: [
    ':host {flex-grow: 1}'
  ]
})
export default class DashboardComponent {
  constructor(private titleService: Title) {
    this.titleService.setTitle(PAGE_TITLE);
  }
}
