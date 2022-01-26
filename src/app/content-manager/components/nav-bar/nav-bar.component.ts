import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nav-bar',
  template: `
    <ul class="nav container">
      <li class="nav-item">
        <a class="nav-link" [routerLink]="['/']">Home <i class="bi bi-house"></i></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" [routerLink]="['/editor']" routerLinkActive="active">New Article</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" [routerLink]="['/series-editor']">New Series</a>
      </li>
    </ul>

  `
})
export class NavBarComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }
}
