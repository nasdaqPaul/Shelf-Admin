import {Component} from "@angular/core";
import {Title} from "@angular/platform-browser";

const PAGE_TITLE = 'Shelf | Account'
@Component({
  templateUrl: 'account.component.html'
})
export default class AcccountComponent {
  constructor(private titleService: Title) {
    this.titleService.setTitle(PAGE_TITLE);
  }
}
