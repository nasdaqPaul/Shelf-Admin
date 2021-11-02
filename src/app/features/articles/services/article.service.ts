import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Article } from '../types';
import DatabaseService from '../../../storage/local/db';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private articlesObservable = new BehaviorSubject<Article[]>([]);

  constructor(private db: DatabaseService) {
    db.articles.getAll().then((articles) => {
      this.pushArticlesIntoObservable(articles);
    });
  }

  private pushArticlesIntoObservable(articles: Article[]) {
    for (const article of articles) {
      delete article.content;
    }
    this.articlesObservable.next([...articles]);
  }

  get allArticles() {
    return this.articlesObservable.asObservable();
  }

  getArticle(id: string) {
    return this.db.articles.get(id);
  }

  saveArticle(article: Article) {
    return new Promise<void | string>((resolve, reject) => {
      if (article.id) {
        this.db.articles.update(article, { returnAllItems: true }).then((articles) => {
          this.pushArticlesIntoObservable(articles!);
          resolve();
        }).catch((err) => {
          reject(err);
        });
      } else {
        this.db.articles.create(article, { returnAllItems: true }).then((results) => {
          this.pushArticlesIntoObservable(results.allItems!);
          resolve(results.createdId);
        }).catch((err) => {
          reject(err);
        });
      }
    });
  }

  deleteArticle(id: string) {
    return this.db.articles.delete(id, { returnAllItems: true }).then((articles) => {
      this.pushArticlesIntoObservable(articles!);
    });
  }
}
