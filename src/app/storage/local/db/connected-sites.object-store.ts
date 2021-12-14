import {UserProfile} from "../../../site-manager/users.module/types";

export interface SiteConnection {
  host: string,
  username: string,
  accessToken: string
  user?: UserProfile
}

type QueryOptions = {
  returnAllItems: boolean;
}

export default class ConnectedSitesObjectStore {
  constructor(private storeName: string, private db: IDBDatabase) {
  }

  add(connection: SiteConnection, options: QueryOptions) {
    return new Promise<void | SiteConnection[]>((resolve, reject) => {
      const tx = this.db.transaction(this.storeName, 'readwrite');
      const objectStore = tx.objectStore(this.storeName);
      const writeReq = objectStore.add(connection);
      let readReq: IDBRequest<any[]>;

      writeReq.onerror = function () {
        reject(writeReq.error);
      };

      if (options.returnAllItems) {
        readReq = objectStore.getAll();
        readReq.onerror = function () {
          reject(readReq.error);
        };
        tx.oncomplete = function () {
          resolve(readReq.result);
        };
      } else {
        tx.oncomplete = function () {
          resolve();
        };
      }
    });
  }

  get(username: string, host: string) {
    return new Promise<void | SiteConnection>((resolve, reject) => {
      const tx = this.db.transaction(this.storeName, 'readonly');
      const store = tx.objectStore(this.storeName);
      const index = store.index('connectionString');
      const readReq = index.get(IDBKeyRange.only([username, host]));

      readReq.onerror = function () {
        reject(readReq.error);
      };

      tx.oncomplete = function () {
        resolve(readReq.result);
      };
    });
  }

  getAll() {
    return new Promise<SiteConnection[]>((resolve, reject) => {
      const tx = this.db.transaction(this.storeName, 'readonly');
      const objectStore = tx.objectStore(this.storeName);
      const readReq = objectStore.getAll();

      readReq.onerror = function () {
        reject(readReq.error);
      };
      tx.oncomplete = function () {
        resolve(readReq.result);
      };
    });
  }
}
