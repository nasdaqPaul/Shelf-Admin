import {Component, OnDestroy, OnInit} from "@angular/core";
import {ArticleService} from "../../services/article.service";
import {Subscription} from "rxjs";
import {Article} from "../../../../core/types";
import {Modal} from "bootstrap";

function sortArticlesByDate(articles: Article[], fromLatest: boolean) {
  if (fromLatest) {
    articles.sort((a, b) => {
      if (a.updated > b.updated) return 1;
      if (a.updated < b.updated) return -1;
      return 0;
    })
  } else {
    articles.sort((a, b) => {
      if (a.updated < b.updated) return 1;
      if (a.updated > b.updated) return -1;
      return 0;
    })
  }
}

function sortArticlesByTitle(articles: Article[], ascending: boolean) {
  if (ascending) {

  } else {

  }
}

@Component({
  selector: 'local-article-list',
  templateUrl: 'local-article-list.component.html',
  styleUrls: ['local-article-list.component.css']
})
export default class LocalArticleListComponent implements OnInit, OnDestroy {
  private localArticlesSubscription!: Subscription;
  private confirmDeleteDialog!: Modal;
  readonly articlesPerPage = 6;
  localArticles: Article[] = [];
  numberOfPages!: number;
  page!: Article[];
  articleToDelete!: Article | null;
  sortList = ['updated', 'title'];
  sortToggles = {
    updated: true
  }

  constructor(private articleService: ArticleService) {
  }

  ngOnInit() {
    this.localArticlesSubscription = this.articleService.localArticles.subscribe((articles) => {
      this.localArticles = articles;
      this.buildPages();
    });
    this.confirmDeleteDialog = new Modal('#confirm-delete-local-article');
  }

  private buildPages() {
    if (this.localArticles.length > this.articlesPerPage) {
      if (this.localArticles.length % this.articlesPerPage) {
        this.numberOfPages = Math.trunc(this.localArticles.length / this.articlesPerPage) + 1
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
    this.articleService.deleteArticle(this.articleToDelete?.index!);
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

