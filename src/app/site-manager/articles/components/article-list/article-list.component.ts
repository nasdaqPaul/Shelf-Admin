import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css'],
})
export class ArticleListComponent implements OnInit {
  items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
    this.articleService.logArticles();
  }
}
