import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Article} from '../../../core/types';
import DatabaseService from "../../../storage/local/db";


@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private articlesObservable = new BehaviorSubject<Article[]>([]);

  constructor(private db: DatabaseService) {
    db.articles.getAll().then(articles => {
      for (const localArticle of articles) {
        delete localArticle.content;
      }
      this.articlesObservable.next(articles)
    })
  }

  get localArticles() {
    return this.articlesObservable.asObservable();
  }

  getArticle(id: string) {
    return this.db.articles.get(id)
  }

  saveArticle(article: Article, local = false) {
    return new Promise<void | string>((resolve, reject) => {
      if (article.id) {
        this.db.articles.update(article, {returnAllArticles: true}).then((articles) => {
          for (const article of articles!) {
            delete article.content;
          }
          this.articlesObservable.next([...articles!])
          resolve()
        }).catch(err => {
          reject(err)
        })
      } else {
        this.db.articles.create(article, {returnAllArticles: true}).then((results) => {
          const {createdId} = results;
          for (const article of results.allArticles!) {
            delete article.content;
          }
          this.articlesObservable.next([...results.allArticles!])
          resolve(results.createdId)
        }).catch(err => {
          reject(err)
        })
      }
    })
  }

  deleteArticle(id: string) {
    // if (typeof id == "number") {
      // const localArticles: Article[] = this.localStorageService.deleteArticle(id);
      // localArticles.forEach((article) => {
      //   delete article.content;
      // })
      // this.localArticlesObservable.next([...localArticles]);
    // }
  }
}
