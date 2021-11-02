import {
  Component, Input, Output, EventEmitter, OnInit,
} from '@angular/core';

@Component({
  selector: 'list-paginator',
  templateUrl: 'list-paginator.component.html',
  // styleUrls: ['list-paginator.component.css']
})
export default class ListPaginatorComponent implements OnInit {
  @Input() numberOfPages?: number;

  @Output() page = new EventEmitter<number>();

  pageArray?: number[]

  currentPage!: number

  ngOnInit() {
    this.pageArray = Array(this.numberOfPages).fill(0).map((x, i) => i + 1);
    this.currentPage = 1;
  }

  navigate(page: number) {
    this.page.emit(page);
    this.currentPage = page;
  }
}
