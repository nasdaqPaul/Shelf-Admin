import {Component, OnDestroy, OnInit} from "@angular/core";
import {editorjsConfig} from "../../../../shared/editor.config";
import {ActivatedRoute, Router} from "@angular/router";
import {ArticleService} from "../../services/article.service";
import {Article} from "../../../../core/types";
import EditorJS from "@editorjs/editorjs";
import {FormControl} from "@angular/forms";
import NotificationService from "../../../../core/services/notification.service";
import {Title} from "@angular/platform-browser";
import {Modal, Toast, Tooltip} from "bootstrap";
import {Location} from "@angular/common";

const PAGE_TITLE = 'Shelf | Editor';

// document.addEventListener("keydown", function(e) {
//   console.log('key pressed')
//   if (e.key === 's' && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
//     e.preventDefault();
//     alert('captured');
//   }
// }, false);

@Component({
  templateUrl: 'editor.page.html',
  styleUrls: ['editor.page.css'],
})
export default class EditorComponent implements OnInit, OnDestroy {
  private editor!: EditorJS;
  private tagsModal!: Modal;
  private toolTips!: Tooltip[];
  private emptyEditorWarning!: Toast;
  private article!: Article;
  articleTitle!: FormControl;
  editorReady = false;

  constructor(private activatedRoute: ActivatedRoute, private articleService: ArticleService, private notificationService: NotificationService, private titleService: Title, private location: Location, private router: Router) {
    titleService.setTitle(PAGE_TITLE);
  }

  buildToolTips() {
    let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    this.toolTips = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new Tooltip(tooltipTriggerEl)
    })
  }

  async ngOnInit() {
    this.article = this.activatedRoute.snapshot.data['article'];
    if (this.article) {
      // @ts-ignore
      this.editor = new EditorJS({
        ...editorjsConfig,
        data: {
          blocks: this.article.content,
        },
        onReady: () => {
          this.editorReady = true;
        }
      });
      this.articleTitle = new FormControl(this.article.title);
    } else {
      // @ts-ignore
      this.editor = new EditorJS({
          ...editorjsConfig,
          onReady: () => {
            this.editorReady = true;
          }
        },
      );
      this.articleTitle = new FormControl('');
    }
    this.tagsModal = new Modal('#exampleModal');
    this.emptyEditorWarning = new Toast('#emptyEditorToast');
    this.buildToolTips();
  }

  ngOnDestroy() {
    this.editor.destroy();
    this.tagsModal.dispose();
    this.emptyEditorWarning.dispose();
    this.toolTips.forEach(toolTip => toolTip.dispose())
  }

  articleTags() {
    this.tagsModal.show();
  }

  saveArticle() {
    //pull data from the editorJs instance
    //check if content has changed
    //if it has
    //  set the editor status to saving
    //  create a new article
    //  call the asycn function saveArticle from articl service with the new article
    //  on success:
    //    set editor status to not saving
    //    show toast
    //  on failure
    //    set editor status to not saving
    this.editor.save().then(data => {
      if (!data.blocks.length && this.articleTitle.value.trim() === '') {
        this.emptyEditorWarning.show();
        return;
      }
      const newArticle: Article = this.article ? {
        ...this.article,
        title: this.articleTitle.value,
        updated: new Date(data.time!),
        content: data.blocks
      } : {
        title: this.articleTitle.value,
        updated: new Date(data.time!),
        content: data.blocks,
      }
      this.articleService.saveArticle(newArticle).then((id: string | void) => {
        if (id) {
          this.article = {...newArticle, id: id};
          // this.router.createUrlTree([this.location.path() + '/' + id])
          this.router.navigate(['/editor', id]);
        }
      }).catch(err => {
        console.log(err);
      });
    })
  }

  autoSave() {
    //Called any time user navigates from the editor
    this.editor.save().then(content => {
      if (this.article) {
        //TODO: Check if content has changed
        this.articleService.saveArticle({
          ...this.article,
          title: this.articleTitle.value,
          updated: new Date(content.time!),
          content: content.blocks,
        }).catch(err => {
          console.log(err)
        })
      } else {
        if (content.blocks.length) {
          this.articleService.saveArticle({
            title: this.articleTitle.value,
            updated: new Date(content.time!),
            content: content.blocks,
          }).catch(err => {
            console.log(err)
          })
        }
      }
    })
  }

}
