import { Injectable } from '@angular/core';
import ArticlesObjectStore from './articles.object-store';
import SeriesObjectStore from './series.object-store';
import ConnectedSitesObjectStore from './connected-sites.object-store';

const DATABASE_NAME = 'shelf';
const DATABASE_VERSION = 6;

function initializeDatabase() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const openDbRequest = window.indexedDB.open(DATABASE_NAME, DATABASE_VERSION);
    openDbRequest.onerror = function (errEvent) {
      // @ts-ignore
      reject(errEvent.target.error);
    };
    openDbRequest.onupgradeneeded = function (ev) {
      console.info('Database upgraded');
      // @ts-ignore
      const db: IDBDatabase = ev.target.result;
      if (!db.objectStoreNames.contains('articles')) {
        db.createObjectStore('articles', {
          keyPath: 'id',
        });
      }
      if (!db.objectStoreNames.contains('series')) {
        db.createObjectStore('series', {
          keyPath: 'id',
        });
      }
      if (db.objectStoreNames.contains('connected-sites')) {
        db.deleteObjectStore('connected-sites');
        const store = db.createObjectStore('connected-sites', {
          keyPath: ['username', 'host']
        });
      }
    };
    openDbRequest.onsuccess = function (ev) {
      console.info('Database initialized');
      resolve(openDbRequest.result);
    };
  });
}

@Injectable()
export default class DatabaseService {
  private static db: IDBDatabase;

  articles!: ArticlesObjectStore;

  series!: SeriesObjectStore;

  connectedSites! :ConnectedSitesObjectStore;

  constructor() {
    this.articles = new ArticlesObjectStore('articles', DatabaseService.db);
    this.series = new SeriesObjectStore('series', DatabaseService.db);
    this.connectedSites = new ConnectedSitesObjectStore('connected-sites', DatabaseService.db);
  }

  public static async initDb() {
    DatabaseService.db = await initializeDatabase();
  }

  async getInstance() {
    if (DatabaseService.db) {
      return DatabaseService.db;
    }
    await DatabaseService.initDb();
    return DatabaseService.db;
  }
}
