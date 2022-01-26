import { Component, OnInit } from '@angular/core';
import {animate, animateChild, group, query, style, transition, trigger} from "@angular/animations";
import {NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('routeAnimations', [
      transition('* => *', [
        style({ position: 'relative' , overflow: 'hidden'}),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            // top: 0,
            // left: 0,
            width: '100%',
            height: '*'
          })
        ]),
        query(':enter', [
          style({ left: '-100%' })
        ]),
        query(':leave', animateChild()),
        group([
          query(':leave', [
            animate('300ms ease-out', style({ left: '100%' }))
          ]),
          query(':enter', [
            animate('300ms ease-out', style({ left: '0%' }))
          ])
        ]),
        query(':enter', animateChild()),
      ]),
    ]),
  ]
})
export class AppComponent {
  title = 'cms-editor';
  path = ''
  constructor(private router: Router) {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: any) => {
      this.path = event.url!
      console.log(this.path);
    })
  }
}
