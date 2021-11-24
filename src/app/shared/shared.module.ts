import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import ListPaginatorComponent from './components/list-paginator/list-paginator.component';
import ListNavigatorComponent from './components/list-navigator/list-navigator.component';

@NgModule({
  declarations: [
    ListPaginatorComponent,
    ListNavigatorComponent,
  ],
  exports: [
    ListNavigatorComponent,
    ListPaginatorComponent,
  ],
  imports: [
    CommonModule,
  ],
})
export class SharedModule {}
