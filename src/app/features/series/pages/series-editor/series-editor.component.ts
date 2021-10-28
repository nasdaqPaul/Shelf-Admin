import {Component, OnInit} from "@angular/core";
import EditorJS from "@editorjs/editorjs";
import SeriesService from "../../services/series.service";
import {Series, SeriesArticle} from "../../types";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl} from "@angular/forms";
import {editorjsConfig} from "../../../../shared/editor.config";
import {Article} from "../../../../core/types";

@Component({
  templateUrl: 'series-editor.component.html',
  styleUrls: [
    'series-editor.component.scss'
  ]
})
export default class SeriesEditorComponent implements OnInit {
  series?: Series
  private editor!: EditorJS;
  seriesTitle!: FormControl;
  seriesArticles!: SeriesArticle[];
  private newArticles: SeriesArticle[] = [];


  constructor(private seriesService: SeriesService, private activatedRoute: ActivatedRoute, private router: Router) {
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
      this.seriesArticles = [...this.series.articles];
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
      this.seriesArticles = [];
    }
  }

  saveSeries() {
    this.editor.save().then(editorData => {
      if (!editorData.blocks.length && this.seriesTitle.value.trim() === '') {
        //show toast of empty series
        this.seriesArticles = [];
        return;
      }
      const seriesToSave = this.series ? {
        ...this.series,
        title: this.seriesTitle.value,
        description: editorData.blocks,
        updated: new Date(editorData.time!),
      } : {
        title: this.seriesTitle.value,
        description: editorData.blocks,
        updated: new Date(editorData.time!),
        articles: [...this.newArticles]
      }
      this.seriesService.saveSeries(seriesToSave).then(id => {
        if (id) {
          this.router.navigate(['series-editor', id]);
        }
        this.seriesArticles = [...this.series?.articles!]
      }).catch(err => {

      })
    })
  }

  autoSaveSeries() {
    this.editor.save().then(data => {
      if (!data.blocks.length && this.seriesTitle.value.trim() === '') {
        return
      } else {
        if (this.series) {
          //TODO: Check if data has changed
          this.seriesService.saveSeries({
            ...this.series,
            title: this.seriesTitle.value,
            updated: new Date(data.time!),
            description: data.blocks
          }).catch(err => {
            console.log(err);
          })
        } else {
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

  addArticlesToSeries(articles: Article[]) {
    const seriesArticles: SeriesArticle[] = articles.map(article => {
      return {
        id: article.id!,
        source: article.source
      }
    });

    if (this.series) {
      this.series.articles.push(...seriesArticles);
    } else {
      this.seriesArticles = [];
      this.newArticles.push(...seriesArticles);
    }
    // @ts-ignore
    this.saveSeries();
  }
}
