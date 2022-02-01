import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import ListPaginatorComponent from './components/list-paginator/list-paginator.component';
import ListNavigatorComponent from './components/list-navigator/list-navigator.component';
import { EditorjsComponent } from './components/editorjs/editorjs.component';
import { FormatBytesPipe } from './pipes/format-bytes.pipe';

@NgModule({
  declarations: [
    ListPaginatorComponent,
    ListNavigatorComponent,
    EditorjsComponent,
    FormatBytesPipe,
  ],
  exports: [
    ListNavigatorComponent,
    ListPaginatorComponent,
    EditorjsComponent,
    FormatBytesPipe
  ],
  imports: [
    CommonModule,
  ],
})
export class SharedModule {}
