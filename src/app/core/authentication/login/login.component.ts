import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

const PAGE_TITLE = 'Shelf | Login';
@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
})
export default class LoginComponent {
  constructor(private titleService: Title) {
    titleService.setTitle(PAGE_TITLE);
  }
}
