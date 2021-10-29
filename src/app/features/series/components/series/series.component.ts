import {Component, Input} from "@angular/core";
import {Article} from "../../../articles/types";
import {Series} from "../../types";

@Component({
  selector: 'local-series',
  templateUrl: 'series.component.html',
  styleUrls: [
    'series.component.scss'
  ]
})
export default class SeriesComponent {
  @Input() series!: Series
}
