import {
  Component, EventEmitter, Input, Output,
} from '@angular/core';
import { Article } from '../../types';

@Component({
  selector: 'article',
  templateUrl: 'article.component.html',
  styleUrls: ['article.component.css'],
})
export default class ArticleComponent {
  @Input() article!: Article

  @Output() deleteArticle = new EventEmitter<Article>()

  constructor() {
  }

  delete() {
    this.deleteArticle.emit(this.article);
  }
}
