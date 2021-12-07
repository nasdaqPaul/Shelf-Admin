import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../types';

@Component({
  selector: 'article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
})
export class ArticleListComponent implements OnInit {
  items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  allArticles!: Article[]

  private allArticlesSubscription!: Subscription

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
    this.allArticlesSubscription = this.articleService.getAllArticles().subscribe((articles) => {
      this.allArticles = [...articles];
    });
  }
}
