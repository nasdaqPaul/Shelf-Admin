import {Component, OnDestroy, OnInit} from "@angular/core";
import SeriesService from "../../services/series.service";
import {Subscription} from "rxjs";
import {Series} from "../../types";

@Component({
  selector: 'local-series-list',
  templateUrl: 'local-series-list.component.html'
})
export default class LocalSeriesListComponent implements OnInit, OnDestroy {
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
