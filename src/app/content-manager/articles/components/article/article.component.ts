import {
  Component, EventEmitter, Input, OnChanges, Output, SimpleChanges,
} from '@angular/core';
import { Article } from '../../types';
import {animate, style, transition, trigger} from "@angular/animations";
import {ImageProcessorService} from "../../../../core/services/image-processor/image-processor.service";

@Component({
  selector: 'article',
  template: `
    <div class="card">
      <div class="card-header p-1 bg-dark">
        <i class="bi bi-cloud-upload-fill text-muted upload-local-article-icon ms-1" (click)="uploadArticle.emit(article)"></i>
        <i class="bi bi-trash-fill text-muted float-end delete-local-article-icon me-2" (click)="delete()"></i>
      </div>
      <div class="row g-0">
        <div class="col-4 article-thumbnail p-2">
            <img  [src]="thumbnailSrc" alt="" class="rounded shadow">
        </div>
        <div class="col-8">
          <div class="card-body p-2">
            <abbr [title]="article.title"><h6 *ngIf="article.title; else untitled" class="card-title text-truncate m-0" [routerLink]="['/editor', article.id]">{{article.title | titlecase}}</h6></abbr>
            <ng-template #untitled><h6 class="card-title text-truncate m-0" [routerLink]="['/editor', article.id]" style="cursor: pointer">Untitled</h6></ng-template>
            <small class="mb-0 text-muted fw-light">Updated: {{article.updated | date}}</small>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['article.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-10px)' }),
        animate('250ms', style({ opacity: 1, transform: 'translateX(0px)' }))
      ])
    ])
  ]
})
export default class ArticleComponent implements OnChanges{
  @Input() article!: Article
  @Output() deleteArticle = new EventEmitter<Article>()
  @Output() uploadArticle = new EventEmitter<Article>()
  thumbnailSrc?: string;

  constructor(private imageProcessor: ImageProcessorService) {

  }
  ngOnChanges(changes: SimpleChanges) {
    if (this.article.thumbnail){
      this.imageProcessor.generateImageULR(this.article.thumbnail).then(src => {
        this.thumbnailSrc = src
      })
    }
  }

  delete() {
    this.deleteArticle.emit(this.article);
  }
}
