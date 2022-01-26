import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import ListPaginatorComponent from './components/list-paginator/list-paginator.component';
import ListNavigatorComponent from './components/list-navigator/list-navigator.component';
import { EditorjsComponent } from './components/editorjs/editorjs.component';

@NgModule({
  declarations: [
    ListPaginatorComponent,
    ListNavigatorComponent,
    EditorjsComponent,
  ],
  exports: [
    ListNavigatorComponent,
    ListPaginatorComponent,
    EditorjsComponent
  ],
  imports: [
    CommonModule,
  ],
})
export class SharedModule {}
