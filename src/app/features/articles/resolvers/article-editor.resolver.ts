import {Injectable} from "@angular/core";
import {ArticleService} from "../services/article.service";
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {Article} from "../../../core/types";

@Injectable({
  providedIn: 'root'
})
export default class ArticleEditorResolver implements Resolve<Article | void> {
  constructor(private articleService: ArticleService, private route: Router) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Article | void> {
    const article = await this.articleService.getArticle(route.params['id']);
    if(!article){
      await this.route.navigate(['/'])
      return
    }
    else {
      return article
    }
  }
}
