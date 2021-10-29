import {Pipe, PipeTransform} from "@angular/core";
import {ArticleService} from "../services/article.service";
import {Article} from "../types";

@Pipe({
  name: 'toTitle'
})
export default class ArticleIdToTitlePipe implements PipeTransform{

  transform(value: string, allArticles: Article[]): any {
    const article = allArticles.find(article => article.id === value)
    return article? article.title : `Not Found!! - ${value}`
  }
}
