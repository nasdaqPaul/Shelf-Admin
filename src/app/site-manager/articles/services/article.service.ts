import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private http: HttpClient) { }

  getAllArticles() {
    return this.http.get('http://localhost:3000/articles');
  }

  logArticles() {
    this.getAllArticles().subscribe((data) => {
      console.log(data);
    });
  }
}
