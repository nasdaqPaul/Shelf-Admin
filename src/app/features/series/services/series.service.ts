import {Injectable} from "@angular/core";
import {Series} from "../types";
import DatabaseService from "../../../storage/local/db";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export default class SeriesService {
  private seriesSubject = new BehaviorSubject<Series[]>([]);

  constructor(private db: DatabaseService) {
    this.db.series.getAll().then(series => {
      this.seriesSubject.next(series);
    })
  }

  get series() {
    return this.seriesSubject.asObservable();
  }

  getSeries(index: number) {
    return this.db.series.get(index);
  }

  saveSeries(series: Series) {
    return new Promise<void>((resolve, reject) => {
      if (series.index) {
        this.db.series.update(series, {returnAllSeries: true}).then(series => {
          for(const s of series!){
            delete s.description;
          }
          this.seriesSubject.next(series!)
          resolve()
        }).catch(err => {
          reject(err)
        })
      } else {
        this.db.series.create(series, {returnAllSeries: true}).then(series => {
          for(const s of series!){
            delete s.description;
          }
          this.seriesSubject.next(series!)
          resolve();
        }).catch(err => {
          reject(err);
        })
      }
    })
  }
}
