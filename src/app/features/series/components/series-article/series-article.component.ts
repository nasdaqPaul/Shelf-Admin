import {
  Component, EventEmitter, Input, OnDestroy, OnInit, Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { SeriesArticle } from '../../types';
import { ArticleService } from '../../../articles/services/article.service';
import { Article } from '../../../articles/types';

@Component({
  selector: 'series-article',
  templateUrl: 'series-article.component.html',
  styleUrls: [
    'series-article.component.scss',
  ],
})
export default class SeriesArticleComponent implements OnInit, OnDestroy {
  @Input() seriesArticle!: SeriesArticle;

  @Output() moveUp = new EventEmitter<SeriesArticle>();

  @Output() moveDown = new EventEmitter<SeriesArticle>();

  @Output() remove = new EventEmitter<SeriesArticle>();

  private allArticlesSub!: Subscription;

  private allArticle!: Article[];

  constructor(private articleService: ArticleService) {

  }

  ngOnInit() {
    this.allArticlesSub = this.articleService.allArticles.subscribe((articles) => {
      this.allArticle = articles;
    });
  }

  ngOnDestroy() {
    this.allArticlesSub.unsubscribe();
  }

  get article() {
    return this.allArticle.find((article) => article.id === this.seriesArticle.id);
  }
}
