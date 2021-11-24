import { v1 } from 'uuid';

type QueryOptions = {
  returnAllItems: boolean
}

export abstract class ObjectStore<Type> {
  constructor(private storeName: string, private db: IDBDatabase) {

  }

  create(item: Type, options?: QueryOptions) {
    return new Promise<{ createdId: string, allItems?: Type[] }>((resolve, reject) => {
      const tx = this.db.transaction(this.storeName, 'readwrite');
      const objectStore = tx.objectStore(this.storeName);
      const createSeriesRequest = objectStore.add({ ...item, id: v1() });
      let getAllSeriesRequest: IDBRequest<any[]>;

      if (options?.returnAllItems) {
        getAllSeriesRequest = objectStore.getAll();
      }

      tx.oncomplete = function (e) {
        if (options?.returnAllItems) {
          resolve({ createdId: createSeriesRequest.result as string, allItems: getAllSeriesRequest.result });
        } else {
          resolve({ createdId: createSeriesRequest.result as string });
        }
      };
      tx.onerror = function (e) {
        reject(tx.error);
      };
    });
  }

  update(item: Type, options?: QueryOptions) {
    return new Promise<Type[] | void>((resolve, reject) => {
      const tx = this.db.transaction(this.storeName, 'readwrite');
      const objectStore = tx.objectStore(this.storeName);
      const updateReq = objectStore.put(item);
      let readReq: IDBRequest<any[]>;

      updateReq.onerror = function (e) {
        // @ts-ignore
        reject(e.target.error);
      };
      tx.onerror = function (e) {
        // @ts-ignore
        reject(e.target.error);
      };

      if (options?.returnAllItems) {
        readReq = objectStore.getAll();
        readReq.onerror = function (e) {
          // @ts-ignore
          reject(e.target.error);
        };
        tx.oncomplete = function (e) {
          resolve(readReq.result);
        };
      } else {
        tx.oncomplete = function (e) {
          resolve();
        };
      }
    });
  }

  getAll() {
    return new Promise<Type[]>((resolve, reject) => {
      const tx = this.db.transaction(this.storeName, 'readonly');
      const objectStore = tx.objectStore(this.storeName);
      const readReq = objectStore.getAll();

      readReq.onerror = function (e) {
        reject(readReq.error);
      };
      tx.oncomplete = function (e) {
        resolve(readReq.result);
      };
      tx.onerror = function (e) {
        reject(tx.error);
      };
    });
  }

  get(id: string) {
    return new Promise<Type | void>((resolve, reject) => {
      const tx = this.db.transaction(this.storeName, 'readonly');
      const objectStore = tx.objectStore(this.storeName);
      const readReq = objectStore.get(id);

      readReq.onerror = function (e) {
        reject(readReq.error);
      };
      tx.oncomplete = function (e) {
        resolve(readReq.result);
      };
      tx.onerror = function (e) {
        reject(tx.error);
      };
    });
  }

  delete(id: string, options: QueryOptions) {
    return new Promise<void | Type[]>((resolve, reject) => {
      const tx = this.db.transaction(this.storeName, 'readwrite');
      const objectStore = tx.objectStore(this.storeName);
      const deleteRequest = objectStore.delete(id);
      let readReq: IDBRequest<any[]>;
      deleteRequest.onerror = function (e) {
        reject(deleteRequest.error);
      };
      tx.onerror = function (e) {
        reject(tx.error);
      };

      if (options.returnAllItems) {
        readReq = objectStore.getAll();
        readReq.onerror = function (e) {
          reject(readReq.error);
        };
        tx.oncomplete = function (e) {
          resolve(readReq.result);
        };
      } else {
        tx.oncomplete = function (e) {
          resolve();
        };
      }
    });
  }
}
