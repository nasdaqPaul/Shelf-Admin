import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../../types';
import { parserBlocks } from '../../../utils/parser';

@Component({
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss'],
})
export class ArticleDetailsComponent implements OnInit {
  article!: Article;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.article = this.activatedRoute.snapshot.data.article;
  }

  get parsedArticle() {
    return parserBlocks(this.article.content!);
  }
}
