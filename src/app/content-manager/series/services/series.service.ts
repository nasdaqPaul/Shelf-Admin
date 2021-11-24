import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Series } from '../types';
import DatabaseService from '../../../storage/local/db';

@Injectable({
  providedIn: 'root',
})
export default class SeriesService {
  private seriesSubject = new BehaviorSubject<Series[]>([]);

  constructor(private db: DatabaseService) {
    this.db.series.getAll().then((series) => {
      this.seriesSubject.next(series);
    });
  }

  get series() {
    return this.seriesSubject.asObservable();
  }

  getSeries(id: string) {
    return this.db.series.get(id);
  }

  private pushSeriesIntoObservable(series: Series[]) {
    for (const s of series!) {
      delete s.description;
    }
    this.seriesSubject.next(series!);
  }

  saveSeries(series: Series) {
    return new Promise<void | string>((resolve, reject) => {
      if (series.id) {
        this.db.series.update(series, { returnAllItems: true }).then((series) => {
          this.pushSeriesIntoObservable(series!);
          resolve();
        }).catch((err) => {
          reject(err);
        });
      } else {
        this.db.series.create(series, { returnAllItems: true }).then((result) => {
          this.pushSeriesIntoObservable(result.allItems!);
          resolve(result.createdId);
        }).catch((err) => {
          reject(err);
        });
      }
    });
  }

  deleteSeries(id: string) {
    return this.db.series.delete(id, { returnAllItems: true }).then((series) => {
      this.pushSeriesIntoObservable(series!);
    });
  }
}
