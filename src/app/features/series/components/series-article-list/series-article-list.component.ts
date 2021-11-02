import {
  Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges,
} from '@angular/core';
import { Modal } from 'bootstrap';
import { Subscription } from 'rxjs';
import { SeriesArticle } from '../../types';
import { ArticleService } from '../../../articles/services/article.service';
import { Article } from '../../../articles/types';

@Component({
  templateUrl: 'series-article-list.component.html',
  selector: 'series-article-list',
  styleUrls: ['series-article-list.component.scss'],
})
export default class SeriesArticleListComponent implements OnInit, OnDestroy, OnChanges {
  @Input() seriesArticles!: SeriesArticle[]

  @Output() newSeriesArticles = new EventEmitter<SeriesArticle[]>();

  private addArticleModal!: Modal

  private articlesSub!: Subscription;

  private articlesToBeAdded: Article[] = [];

  allArticles: Article[] = [];

  availableArticles!: Article[];

  constructor(private articlesService: ArticleService) {

  }

  private filterArticles() {
    const filterArticles = this.allArticles.filter((article) => this.seriesArticles.filter((seriesArticle) => article.id == seriesArticle.id).length == 0);
    this.availableArticles = [...filterArticles];
  }

  ngOnInit() {
    this.addArticleModal = new Modal('#add-articles-modal');
    this.articlesSub = this.articlesService.allArticles.subscribe((articles) => {
      this.allArticles = [...articles];
      this.filterArticles();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.filterArticles();
  }

  ngOnDestroy() {
    this.addArticleModal.dispose();
    this.articlesSub.unsubscribe();
  }

  openAddArticleDialog() {
    this.addArticleModal.show();
  }

  closeAddArticleDialog() {
    this.articlesToBeAdded = [];
    this.filterArticles();
  }

  setArticleTobeAdded(event: any, article: Article) {
    if (event.target.checked) {
      this.articlesToBeAdded.push(article);
    } else {
      this.articlesToBeAdded = this.articlesToBeAdded.filter((article_) => article_.id !== article.id);
    }
  }

  addArticles() {
    if (this.articlesToBeAdded.length) {
      this.newSeriesArticles.emit(this.seriesArticles.concat(this.articlesToBeAdded.map((article) => (article.source ? {
        id: article.id!,
        source: article.source,
      } : { id: article.id! }))));
      this.articlesToBeAdded = [];
    }
  }

  moveArticleUp(article: SeriesArticle) {
    const articleIndex = this.seriesArticles.indexOf(article);
    if (articleIndex > 0) {
      this.seriesArticles.splice(articleIndex, 1);
      this.seriesArticles.splice(articleIndex - 1, 0, article);
      this.newSeriesArticles.emit(this.seriesArticles);
    }
  }

  moveArticleDown(article: SeriesArticle) {
    const articleIndex = this.seriesArticles.indexOf(article);
    if (articleIndex < this.seriesArticles.length) {
      this.seriesArticles.splice(articleIndex, 1);
      this.seriesArticles.splice(articleIndex + 1, 0, article);
      this.newSeriesArticles.emit(this.seriesArticles);
    }
  }

  removeArticle(article: SeriesArticle) {
    const articleIndex = this.seriesArticles.indexOf(article);
    this.seriesArticles.splice(articleIndex, 1);
    this.newSeriesArticles.emit(this.seriesArticles);
  }
}
