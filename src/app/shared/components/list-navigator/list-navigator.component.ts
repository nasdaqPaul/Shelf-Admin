import {Component, Input, Output, EventEmitter} from "@angular/core";

@Component({
  selector: 'list-navigator',
  templateUrl: 'list-navigator.component.html'
})
export default class ListNavigatorComponent {
  @Input() sortList!: string[];
  @Output() sorted = new EventEmitter<string>();


}
