import {Component, OnDestroy, OnInit} from "@angular/core";
import SeriesService from "../../services/series.service";
import {Subscription} from "rxjs";
import {Series} from "../../types";

@Component({
  selector: 'local-series-list',
  templateUrl: 'series-list.component.html',
  styleUrls: [
    'series-list.component.scss'
  ]
})
export default class SeriesListComponent implements OnInit, OnDestroy {
  private seriesSubscription!: Subscription
  series!: Series[]

  constructor(private seriesService: SeriesService) {

  }

  ngOnInit() {
    this.seriesSubscription = this.seriesService.series.subscribe(series => {
      this.series = [...series]
    })
  }
  ngOnDestroy() {
    this.seriesSubscription.unsubscribe();
  }
}
