import {Component} from "@angular/core";
import {Title} from "@angular/platform-browser";

const PAGE_TITLE = 'Shelf | Dashboard'

@Component({
  selector: 'dashboard',
  templateUrl: 'dashboard.component.html'
})
export default class DashboardComponent {
  constructor(private titleService: Title) {
    this.titleService.setTitle(PAGE_TITLE)
  }
}
