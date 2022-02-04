import { Component } from '@angular/core';

@Component({
  selector: 'content-manager',
  template: `
    <main>
      <header class="bg-light">
        <nav-bar></nav-bar>
      </header>
      <router-outlet></router-outlet>
    </main>
  `,
})
export default class ContentManagerComponent {}
