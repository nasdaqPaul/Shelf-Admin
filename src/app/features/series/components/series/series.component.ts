import {Component, Input} from "@angular/core";
import {Article} from "../../../../core/types";
import {Series} from "../../types";

@Component({
  selector: 'local-series',
  templateUrl: 'series.component.html'
})
export default class SeriesComponent {
  @Input() series!: Series
}
