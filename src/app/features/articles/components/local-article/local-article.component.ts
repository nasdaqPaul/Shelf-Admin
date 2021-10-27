import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Article} from "../../../../core/types";

@Component({
  selector: 'local-article',
  templateUrl: 'local-article.component.html',
  styleUrls: ['local-article.component.css']
})
export default class LocalArticleComponent {
  @Input() article!: Article
  @Output() deleteArticle = new EventEmitter<Article>()

  constructor() {
  }

  delete() {
    this.deleteArticle.emit(this.article);
  }
}
