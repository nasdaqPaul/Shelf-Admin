import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {CanDeactivate, UrlTree} from "@angular/router";
import EditorComponent from "../pages/article-editor/editor.component";


@Injectable()
export default class AutosaveGuard implements CanDeactivate<EditorComponent> {
  canDeactivate(component: EditorComponent): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    component.autoSave();
    return true;
  }
}
