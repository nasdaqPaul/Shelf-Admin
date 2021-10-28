import {Series} from "../../../features/series/types";
import {v1} from "uuid";

const STORE_NAME = 'series'

export default class SeriesObjectStore {
  db: IDBDatabase;

  constructor(db: IDBDatabase) {
    this.db = db;
  }

  create(series: Series, options: any) {
    return new Promise<{ createdId: string, allSeries?: Series[] }>((resolve, reject) => {
      const tx = this.db.transaction(STORE_NAME, "readwrite");
      const objectStore = tx.objectStore(STORE_NAME);
      const createSeriesRequest = objectStore.add({...series, id: v1()});
      let getAllSeriesRequest: IDBRequest<any[]>;

      if (options.returnAllSeries) {
        getAllSeriesRequest = objectStore.getAll();
      }

      tx.oncomplete = function (e) {
        if (options.returnAllSeries) {
          // @ts-ignore
          resolve({createdId: createSeriesRequest.result, allSeries: getAllSeriesRequest.result})
        } else {
          //@ts-ignore
          resolve({createdId: createSeriesRequest.result})
        }
      }
      tx.onerror = function (e) {
        // @ts-ignore
        reject(e.target.error)
      }
    })
  }

  update(series: Series, options: any) {
    return new Promise<Series[] | void>((resolve, reject) => {
      const tx = this.db.transaction(STORE_NAME, 'readwrite');
      const objectStore = tx.objectStore(STORE_NAME);
      const updateReq = objectStore.put(series);
      let readReq: IDBRequest<any[]>;

      updateReq.onerror = function (e) {
        // @ts-ignore
        reject(e.target.error)
      }
      tx.onerror = function (e) {
        // @ts-ignore
        reject(e.target.error)
      }

      if (options.returnAllSeries) {
        readReq = objectStore.getAll();
        readReq.onerror = function (e) {
          // @ts-ignore
          reject(e.target.error);
        }
        tx.oncomplete = function (e) {
          resolve(readReq.result);
        }
      } else {
        tx.oncomplete = function (e) {
          resolve();
        }
      }
    })
  }

  getAll() {
    return new Promise<Series[]>((resolve, reject) => {
      const tx = this.db.transaction(STORE_NAME, 'readonly');
      const objectStore = tx.objectStore(STORE_NAME);

      const readReq = objectStore.getAll();

      readReq.onerror = function (e) {
        // @ts-ignore
        reject(e.target.error)
      }
      tx.oncomplete = function (e) {
        resolve(readReq.result);
      }
      tx.onerror = function (e) {
        // @ts-ignore
        reject(e.target.error)
      }
    })
  }

  get(index: number) {
    return new Promise<Series | void>((resolve, reject) => {
      const tx = this.db.transaction(STORE_NAME, 'readonly');
      const objectStore = tx.objectStore(STORE_NAME);

      const readReq = objectStore.get(index);

      readReq.onerror = function (e) {
        // @ts-ignore
        reject(e.target.error)
      }
      tx.oncomplete = function (e) {
        resolve(readReq.result);
      }
      tx.onerror = function (e) {
        // @ts-ignore
        reject(e.target.error)
      }
    })
  }
}
