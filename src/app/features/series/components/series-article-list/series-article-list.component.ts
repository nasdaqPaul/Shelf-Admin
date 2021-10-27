import {Component, Input, OnDestroy, OnInit} from "@angular/core";
import {SeriesArticle} from "../../types";
import {Modal} from "bootstrap";

@Component({
  templateUrl: 'series-article-list.component.html',
  selector: 'series-article-list'
})
export default class SeriesArticleListComponent implements OnInit, OnDestroy {
  @Input() seriesArticles!: SeriesArticle[]
  private addArticleModal!: Modal

  ngOnInit() {
    this.addArticleModal = new Modal('#add-articles-modal');
  }

  ngOnDestroy() {
    this.addArticleModal.dispose();
  }
  addArticles() {
    this.addArticleModal.show();
  }
}
