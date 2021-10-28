import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from "@angular/core";
import {SeriesArticle} from "../../types";
import {Modal} from "bootstrap";
import {ArticleService} from "../../../articles/services/article.service";
import {Article} from "../../../../core/types";
import {Subscription} from "rxjs";

@Component({
  templateUrl: 'series-article-list.component.html',
  selector: 'series-article-list',
  styleUrls: ['series-article-list.component.scss']
})
export default class SeriesArticleListComponent implements OnInit, OnDestroy, OnChanges {
  @Input() seriesArticles!: SeriesArticle[]
  @Output() addArticlesToSeries = new EventEmitter<Article[]>()
  private addArticleModal!: Modal
  private articlesSub!: Subscription;

  allArticles: Article[] = [];
  availableArticles!: Article[];
  private articlesToBeAdded: Article[] = []

  constructor(private articlesService: ArticleService) {

  }

  private filterArticles() {
    const filterArticles = this.allArticles.filter(article => {
      return this.seriesArticles.filter(seriesArticle => {
        return article.id == seriesArticle.id
      }).length == 0
    })
    console.log('filtered: ', filterArticles)
    this.availableArticles = [...filterArticles]
  }

  ngOnInit() {
    this.addArticleModal = new Modal('#add-articles-modal');
    this.articlesSub = this.articlesService.localArticles.subscribe(articles => {
      this.allArticles = [...articles];
      this.filterArticles();
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    this.filterArticles();
    console.log('Available: ',this.availableArticles);
    console.log('Series:', this.seriesArticles);
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
  }

  emitAddArticles() {
    if (this.articlesToBeAdded.length) {
      this.addArticlesToSeries.emit([...this.articlesToBeAdded]);
      this.articlesToBeAdded = []
    }
  }

  setArticleTobeAdded(event: any, article: Article) {
    if (event.target.checked) {
      this.articlesToBeAdded.push(article);
    } else {
      this.articlesToBeAdded = this.articlesToBeAdded.filter(article_ => article_.id !== article.id);
      console.log(this.articlesToBeAdded);
    }
  }
}
