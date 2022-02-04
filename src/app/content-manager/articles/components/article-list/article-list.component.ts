import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Modal } from 'bootstrap';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../types';
import {animate, animateChild, query, stagger, style, transition, trigger} from "@angular/animations";

function sortArticlesByDate(articles: Article[], fromLatest: boolean) {
  if (fromLatest) {
    articles.sort((a, b) => {
      if (a.updated > b.updated) return 1;
      if (a.updated < b.updated) return -1;
      return 0;
    });
  } else {
    articles.sort((a, b) => {
      if (a.updated < b.updated) return 1;
      if (a.updated > b.updated) return -1;
      return 0;
    });
  }
}

function sortArticlesByTitle(articles: Article[], ascending: boolean) {
  if (ascending) {

  } else {

  }
}

@Component({
  selector: 'article-list',
  templateUrl: 'article-list.component.html',
  styleUrls: ['article-list.component.css'],
  animations: [
    trigger('staggerAnimation', [
      transition('* => *', [
        query('main.row', [
          animate('0.8s ease-in', style({opacity: 0})),
          animate('0.2s ease-out', style({opacity: '*'}))
        ])
      ])
    ]),
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-10px)' }),
        animate('250ms', style({ opacity: 1, transform: 'translateX(0px)' }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('250ms', style({ opacity: 0, transform: 'translateX(10px)' }))
      ])
    ])
  ]
})
export default class ArticleListComponent implements OnInit, OnDestroy {
  private localArticlesSubscription!: Subscription;
  private confirmDeleteDialog!: Modal;
  readonly articlesPerPage = 9;

  localArticles: Article[] = [];
  numberOfPages!: number;
  page!: Article[];
  articleToDelete!: Article | null;
  sortList = ['updated', 'title'];
  sortToggles = {
    updated: true,
  }

  constructor(private articleService: ArticleService) {
  }

  ngOnInit() {
    this.localArticlesSubscription = this.articleService.allArticles.subscribe((articles) => {
      this.localArticles = articles;
      this.buildPages();
    });
    this.confirmDeleteDialog = new Modal('#confirm-delete-local-article');
  }

  private buildPages() {
    if (this.localArticles.length > this.articlesPerPage) {
      if (this.localArticles.length % this.articlesPerPage) {
        this.numberOfPages = Math.trunc(this.localArticles.length / this.articlesPerPage) + 1;
      } else {
        this.numberOfPages = this.localArticles.length / this.articlesPerPage;
      }
    }
    this.page = this.localArticles.slice(0, this.articlesPerPage);
  }

  ngOnDestroy() {
    this.localArticlesSubscription.unsubscribe();
    this.confirmDeleteDialog.dispose();
  }

  updatePage(page: number) {
    this.page = this.localArticles.slice((page - 1) * this.articlesPerPage, (page * this.articlesPerPage));
  }

  requestDeleteArticle(article: Article) {
    this.articleToDelete = article;
    this.confirmDeleteDialog.show();
  }

  confirmDeleteArticle() {
    this.articleService.deleteArticle(this.articleToDelete?.id!);
    this.articleToDelete = null;
  }

  sort(by: string) {
    switch (by) {
      case 'updated':
        sortArticlesByDate(this.localArticles, !this.sortToggles.updated);
        this.sortToggles.updated = !this.sortToggles.updated;
        this.buildPages();
        break;
    }
  }
}
