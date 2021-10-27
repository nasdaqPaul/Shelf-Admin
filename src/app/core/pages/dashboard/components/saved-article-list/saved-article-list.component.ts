import {Component} from "@angular/core";

@Component({
  selector: 'saved-article-list',
  templateUrl: 'saved-article-list.component.html',
  styles: [
    'tr[saved-article]{cursor: pointer}',
  ]
})
export default class SavedArticleListComponent {
  items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
}
