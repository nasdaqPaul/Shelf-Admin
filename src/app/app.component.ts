import { Component, OnInit } from '@angular/core';
import {animate, animateChild, group, query, style, transition, trigger} from "@angular/animations";
import {NavigationEnd, Router, RouterOutlet} from "@angular/router";
import {filter} from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('routeAnimations', [
      transition('ContentManager => SiteManager', [
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
            animate('300ms ease-in-out', style({ left: '100%' }))
          ]),
          query(':enter', [
            animate('300ms ease-in-out', style({ left: '0%' }))
          ])
        ]),
        query(':enter', animateChild()),
      ]),
      transition('SiteManager => ContentManager', [
        style({ position: 'relative', overflow: 'hidden' }),
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
          style({ left: '100%' })
        ]),
        query(':leave', animateChild()),
        group([
          query(':leave', [
            animate('300ms ease-in-out', style({ right: '100%' }))
          ]),
          query(':enter', [
            animate('300ms ease-in-out', style({ left: '0%' }))
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
  constructor() {
  }
  prepareRoute(outlet: RouterOutlet){
    // console.log('Routed to: ', outlet.activatedRouteData['module'])
    return outlet.activatedRouteData['module']
  }
}
