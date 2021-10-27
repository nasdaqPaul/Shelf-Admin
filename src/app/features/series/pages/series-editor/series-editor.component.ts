import {Component, OnInit} from "@angular/core";
import EditorJS from "@editorjs/editorjs";
import SeriesService from "../../services/series.service";
import {Series} from "../../types";
import {ActivatedRoute} from "@angular/router";
import {FormControl} from "@angular/forms";
import {editorjsConfig} from "../../../../shared/editor.config";

@Component({
  templateUrl: 'series-editor.component.html',
  styleUrls: [
    'series-editor.component.scss'
  ]
})
export default class SeriesEditorComponent implements OnInit {
  series!: Series
  private editor!: EditorJS;
  seriesTitle!: FormControl;

  constructor(private seriesService: SeriesService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.series = this.activatedRoute.snapshot.data['series'];
    if (this.series) {
      // @ts-ignore
      this.editor = new EditorJS({
        ...editorjsConfig,
        placeholder: 'Click to Add Series Description...',
        data: {
          time: this.series.updated.getTime(),
          blocks: this.series.description,
        },
        onReady: () => {
          // this.editorReady = true;
        }
      });
      this.seriesTitle = new FormControl(this.series.title);
    } else {
      // @ts-ignore
      this.editor = new EditorJS({
          ...editorjsConfig,
        placeholder: 'Click to Add Series Description...',
          onReady: () => {
            // this.editorReady = true;
          }
        },
      );
      this.seriesTitle = new FormControl('');
    }

  }

  saveSeries() {
    this.editor.save().then(editorData => {
      this.seriesService.saveSeries({
        ...this.series,
        title: this.seriesTitle.value,
        description: editorData.blocks,
        updated: new Date(editorData.time!),
        articles: []
      }).catch(err => {
        console.log(err);
      })
    })
  }

  autoSaveSeries() {
    this.editor.save().then(data => {
      if(!data.blocks.length && this.seriesTitle.value.trim() === ''){
        return
      }else {
        if(this.series){
          //TODO: Check if data has changed
          this.seriesService.saveSeries({
            ...this.series,
            title: this.seriesTitle.value,
            updated: new Date(data.time!),
            description: data.blocks
          }).catch(err => {
            console.log(err);
          })
        }
        else {
          this.seriesService.saveSeries({
            title: this.seriesTitle.value,
            updated: new Date(data.time!),
            description: data.blocks,
            articles: []
          }).catch(err => {
            console.log(err);
          })
        }

      }
    })
  }
}
