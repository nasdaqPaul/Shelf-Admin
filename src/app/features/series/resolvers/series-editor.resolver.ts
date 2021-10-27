import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Series} from "../types";
import SeriesService from "../services/series.service";

@Injectable({
  providedIn: 'root'
})
export default class SeriesEditorResolver implements Resolve<Series | void> {
  constructor(private seriesService: SeriesService) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Series | void> {
    const series = await this.seriesService.getSeries(+route.params['index'])
    if (!series) {

    } else {
      return series;
    }
  }
}
