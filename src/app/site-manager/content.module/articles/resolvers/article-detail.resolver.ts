import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ArticleService } from '../services/article.service';
import { Article } from '../types';

@Injectable()
export default class ArticleDetailResolver implements Resolve<Article| void> {
  constructor(private articleService: ArticleService, private router: Router) {
  }

  async handleError(error: HttpErrorResponse) {
    console.log(error);
    await this.router.navigate(['/site/']);
    return of(null);
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Article| void> {
    try {
      return await this.articleService.getArticle(route.params.id).toPromise();
    } catch (e) {
      await this.router.navigate(['/site/content/articles/not-found']);
    }
  }
}
