import {Injectable} from "@angular/core";
import ArticlesObjectStore from "./articles.object-store";
import SeriesObjectStore from "./series.object-store";
const DATABASE_NAME = 'shelf';
const DATABASE_VERSION = 3;

function initializeDatabase() {
  return new Promise<IDBDatabase>(function (resolve, reject) {
    let openDbRequest = window.indexedDB.open(DATABASE_NAME, DATABASE_VERSION);
    openDbRequest.onerror = function (errEvent) {
      // @ts-ignore
      reject(errEvent.target.error);
    }
    openDbRequest.onupgradeneeded = function (ev) {
      console.info('Database upgraded')
      // @ts-ignore
      const db: IDBDatabase = ev.target.result;
      if (!db.objectStoreNames.contains("articles")) {
        db.createObjectStore("articles", {
          keyPath: "index",
          autoIncrement: true
        });
      }
      if (!db.objectStoreNames.contains("series")) {
        db.createObjectStore("series", {
          keyPath: "index",
          autoIncrement: true
        });
      }
    }
    openDbRequest.onsuccess = function (ev) {
      console.info('Database initialized')
      resolve(openDbRequest.result);
    }
  })
}

@Injectable()
export default class DatabaseService {
  private static db: IDBDatabase;
  articles!: ArticlesObjectStore
  series!: SeriesObjectStore

  constructor() {
    this.articles = new ArticlesObjectStore(DatabaseService.db);
    this.series = new SeriesObjectStore(DatabaseService.db);
  }

  public static async initDb() {
    DatabaseService.db = await initializeDatabase();
  }

  async getInstance() {
    if (DatabaseService.db) {
      return DatabaseService.db
    } else {
      await DatabaseService.initDb();
      return DatabaseService.db
    }
  }
}
