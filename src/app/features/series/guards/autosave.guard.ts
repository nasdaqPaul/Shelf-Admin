import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree} from "@angular/router";
import SeriesEditorComponent from "../pages/series-editor/series-editor.component";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export default class AutosaveGuard implements CanDeactivate<SeriesEditorComponent> {
  canDeactivate(component: SeriesEditorComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    component.autoSaveSeries()
    return true;
  }
}
