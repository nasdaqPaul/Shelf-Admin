import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Article } from '../types';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private readonly API_URL = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  getAllArticles() {
    return this.http.get<Article[]>('http://localhost:3000/articles');
  }

  getArticle(id: string) {
    return this.http.get<Article>(`${this.API_URL}/articles/${id}`);
  }

  logArticles() {
    this.getAllArticles().subscribe((data) => {
      console.log(data);
    });
  }
}
