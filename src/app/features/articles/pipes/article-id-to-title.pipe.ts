import {Pipe, PipeTransform} from "@angular/core";
import {ArticleService} from "../services/article.service";
import {Article} from "../../../core/types";

@Pipe({
  name: 'toTitle'
})
export default class ArticleIdToTitlePipe implements PipeTransform{

  transform(value: string, allArticles: Article[]): any {
    return allArticles.find(article => article.id === value)?.title;
  }
}
