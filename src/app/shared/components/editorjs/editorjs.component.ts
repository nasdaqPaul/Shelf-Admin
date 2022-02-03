import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import EditorJS, {API, BlockAPI} from "@editorjs/editorjs";
import {editorjsConfig} from "./editorjs.config";

@Component({
  selector: 'app-editorjs',
  template: '<div id="editorjs"></div>',
})
export class EditorjsComponent implements OnInit, OnDestroy {
  @Input('blocks') blocks: any;
  @Input('placeholder') placeholder?: string
  @Output('loaded') loaded = new EventEmitter<boolean>();
  @Output('changed') changed = new EventEmitter<boolean>();
  editor!: EditorJS

  constructor() {
  }

  async ngOnInit() {
    // @ts-ignore
    this.editor = new EditorJS({
      ...editorjsConfig,
      data: this.blocks ? {blocks: this.blocks} : undefined,
      placeholder: this.placeholder ? this.placeholder : 'Click to start typing',
      onReady: () => {
        this.loaded.emit(true);
      },
      onChange: (api: API, block: BlockAPI) => {
        this.changed.emit(true);
      }
    })
  }

  ngOnDestroy(): void {
    this.editor.destroy();
    console.log('Editor Component destroyed')
  }

}
