import {Article} from "../../../core/types";

export default class ArticlesObjectStore {
  public static NAME = 'articles';
  db: IDBDatabase;

  constructor(db: IDBDatabase) {
    this.db = db;
  }

  create(article: Article, options: any) {
    return new Promise<void | Article[]>((resolve, reject) => {
      const tx = this.db.transaction(ArticlesObjectStore.NAME, "readwrite");
      const objectStore = tx.objectStore(ArticlesObjectStore.NAME);
      const writeRequest = objectStore.add(article)
      let readRequest: IDBRequest<any[]>;

      if (options.returnAllArticles) {
        readRequest = objectStore.getAll();
      }

      tx.oncomplete = function (e) {
        if (options.returnAllArticles) {
          // @ts-ignore
          resolve(readRequest.result)
        } else {
          //@ts-ignore
          resolve(writeRequest.result)
        }
      }
      tx.onerror = function (e) {
        // @ts-ignore
        reject(e.target.error)
      }
    })

  }

  get(index: number) {
    return new Promise<Article | void>((resolve, reject) => {
      const tx = this.db.transaction(ArticlesObjectStore.NAME, 'readonly');
      const objectStore = tx.objectStore(ArticlesObjectStore.NAME);

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

  getAll() {
    return new Promise<Article[]>((resolve, reject) => {
      const tx = this.db.transaction(ArticlesObjectStore.NAME, 'readonly');
      const objectStore = tx.objectStore(ArticlesObjectStore.NAME);

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

  update(article: Article, options: any) {
    return new Promise<Article[] | void>((resolve, reject) => {
      const tx = this.db.transaction(ArticlesObjectStore.NAME, 'readwrite');
      const objectStore = tx.objectStore(ArticlesObjectStore.NAME);
      const updateReq = objectStore.put(article);
      let readReq: IDBRequest<any[]>;

      updateReq.onerror = function (e) {
        // @ts-ignore
        reject(e.target.error)
      }
      tx.onerror = function (e) {
        // @ts-ignore
        reject(e.target.error)
      }

      if(options.returnAllArticles){
        readReq = objectStore.getAll();
        readReq.onerror = function (e) {
          // @ts-ignore
          reject(e.target.error);
        }
        tx.oncomplete = function (e){
          resolve(readReq.result);
        }
      }
      else {
        tx.oncomplete = function (e) {
          resolve();
        }
      }
    })
  }

  delete() {

  }
}
