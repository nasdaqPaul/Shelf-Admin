import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {Modal, Toast, Tooltip} from 'bootstrap';
import {Location} from '@angular/common';
import NotificationService from '../../../../core/services/notification.service';
import {Article} from '../../types';
import {ArticleService} from '../../services/article.service';
import {animate, style, transition, trigger} from "@angular/animations";
import {EditorjsComponent} from "../../../../shared/components/editorjs/editorjs.component";
import {ImageProcessorService} from "../../../../core/services/image-processor/image-processor.service";

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
  animations: [
    trigger('growShrink', [
      transition(':enter', [
        style({
          height: 0,
          opacity: 0,
        }),
        animate('0.3s ease-in', style({
          height: '*',
          opacity: 1
        }))
      ]),
      transition(':leave', [
        animate('0.3s ease-out', style({
          opacity: 0.5,
          height: 0
        }))
      ]),
    ])
  ]
})
export default class EditorComponent implements OnInit, OnDestroy {
  @ViewChild(EditorjsComponent)
  private editorJsComponent!: EditorjsComponent;
  private tagsModal!: Modal;
  private toolTips!: Tooltip[];
  private emptyEditorWarning!: Toast;
  article!: Article;
  articleTitle!: FormControl;
  articleHeroImage?: File;

  editorReady = false;
  editorChanged = false;

  constructor(private imageService: ImageProcessorService, private activatedRoute: ActivatedRoute, private articleService: ArticleService, private notificationService: NotificationService, private titleService: Title, private location: Location, private router: Router) {
    titleService.setTitle(PAGE_TITLE);
  }

  buildToolTips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    this.toolTips = tooltipTriggerList.map((tooltipTriggerEl) => new Tooltip(tooltipTriggerEl));
  }

  uploadHeroImage(event: any) {
    this.articleHeroImage = event.target.files[0];
  }

  async ngOnInit() {
    this.article = this.activatedRoute.snapshot.data.article;
    if (this.article) {
      this.articleTitle = new FormControl(this.article.title);
      this.articleHeroImage = this.article.heroImage;
    } else {
      this.articleTitle = new FormControl('');
    }
    this.tagsModal = new Modal('#exampleModal');
    this.emptyEditorWarning = new Toast('#emptyEditorToast');
    this.buildToolTips();
  }

  ngOnDestroy() {
    this.tagsModal.dispose();
    this.emptyEditorWarning.dispose();
    this.toolTips.forEach((toolTip) => toolTip.dispose());
  }

  articleTags() {
    this.tagsModal.show();
  }

  async anotherSaveArticle() {
    if (!this.article) {
      if (this.editorChanged || this.articleTitle.value.trim() || this.articleHeroImage) {
        const newArticle: any = {}
        if (this.editorChanged) {
          let editorContent = await this.editorJsComponent.editor.save();
          if (editorContent.blocks.length) newArticle.content = editorContent.blocks;
        }
        if (this.articleHeroImage){
          newArticle.heroImage = this.articleHeroImage;
          newArticle.thumbnail = await this.imageService.generateThumbnail(this.articleHeroImage);
        }
        newArticle.created = new Date();
        newArticle.updated = new Date();
        newArticle.title = this.articleTitle.value.trim();
        const newId = await this.articleService.saveArticle(newArticle);
        this.article = newArticle;
        this.editorChanged = false;
        await this.router.navigate(['/editor', newId]);
      }
    }
    else {
      if(this.editorChanged || this.articleTitle.value.trim() !== this.article.title || this.article.heroImage?.name !== this.articleHeroImage?.name){
        const newArticle = {...this.article};
        if(this.editorChanged){
          let editorContent = await this.editorJsComponent.editor.save();
          if(editorContent.blocks.length){
            newArticle.content = editorContent.blocks;
          }
        }
        if(this.article.heroImage?.name !== this.articleHeroImage?.name && this.articleHeroImage){
          newArticle.heroImage = this.articleHeroImage;
          newArticle.thumbnail = await this.imageService.generateThumbnail(this.articleHeroImage);
        }
        else {
          newArticle.heroImage = this.articleHeroImage;
        }
        newArticle.title = this.articleTitle.value.trim();
        newArticle.updated = new Date();
        this.article = newArticle;
        this.editorChanged = false;
        await this.articleService.saveArticle(newArticle)
      }
    }
  }

  saveArticle() {
    if (!this.article) {
      if (this.editorChanged || this.articleHeroImage || this.articleTitle.value.trim()) {
        if (this.editorChanged) {
          this.editorJsComponent.editor.save().then((data) => {
            if (data.blocks.length || this.articleHeroImage || this.articleTitle.value.trim()) {
              return this.articleService.saveArticle({
                title: this.articleTitle.value.trim(),
                content: data.blocks,
                created: new Date(data.time!),
                updated: new Date(data.time!)
              }).then((savedId) => {
                return savedId ? this.router.navigate(['/editor', savedId]) : undefined
              }).then()
            } else {
              return;
            }
          })
        } else {
          this.articleService.saveArticle({
            title: this.articleTitle.value.trim(),
            heroImage: this.articleHeroImage ? this.articleHeroImage : undefined,
            created: new Date(),
            updated: new Date()
          })
        }
      }
    } else {
      if (this.editorChanged || this.articleTitle.value.trim() !== this.article.title || this.articleHeroImage?.name !== this.article.heroImage?.name) {
        if (this.editorChanged) {
          this.editorJsComponent.editor.save().then(data => {
            return this.articleService.saveArticle({
              ...this.article,
              updated: new Date(),
              title: this.articleTitle.value.trim(),
              heroImage: this.articleHeroImage,
              content: data.blocks
            })
          })
        } else {
          this.articleService.saveArticle({
            ...this.article,
            updated: new Date(),
            title: this.articleTitle.value.trim(),
            heroImage: this.articleHeroImage
          })
        }
      }
    }
    // if (!this.article && !this.editorChanged){
    //   this.emptyEditorWarning.show();
    //   return;
    // }
    // this.editorJsComponent.editor.save().then((data) => {
    //   if (!data.blocks.length && this.articleTitle.value.trim() === '' && !this.articleHeroImage) {
    //     this.emptyEditorWarning.show();
    //     return;
    //   }
    //   const newArticle: Article = this.article ? {
    //     ...this.article,
    //     title: this.articleTitle.value,
    //     heroImage: this.articleHeroImage,
    //     updated: new Date(data.time!),
    //     content: data.blocks,
    //   } : {
    //     title: this.articleTitle.value,
    //     heroImage: this.articleHeroImage,
    //     created: new Date(data.time!),
    //     updated: new Date(data.time!),
    //     content: data.blocks,
    //   };
    //
    //   this.articleService.saveArticle(newArticle).then((id: string | void) => {
    //     if (id) {
    //       this.router.navigate(['/editor', id]);
    //     }
    //     this.article = newArticle;
    //   }).catch((err) => {
    //     console.log(err);
    //   });
    // });
  }

  autoSave() {
    if (!this.article) {
      if (this.editorChanged || this.articleTitle.value.trim() || this.articleHeroImage) {
        if (this.editorChanged) {
          this.editorJsComponent.editor.save().then(data => {
            if (data.blocks.length || this.articleTitle.value.trim() || this.articleHeroImage) {
              this.articleService.saveArticle({
                title: this.articleTitle.value.trim(),
                created: new Date(),
                updated: new Date(),
                heroImage: this.articleHeroImage,
                content: data.blocks
              })
            }
          })
        } else {
          this.articleService.saveArticle({
            title: this.articleTitle.value.trim(),
            heroImage: this.articleHeroImage,
            created: new Date(),
            updated: new Date()
          })
        }
      }
    } else {
      if (this.editorChanged || this.articleHeroImage?.name !== this.article.heroImage?.name || this.articleTitle.value.trim() !== this.article.title) {
        if (this.editorChanged) {
          this.editorJsComponent.editor.save().then(data => {
            if (data.blocks.length || this.articleHeroImage?.name !== this.article.heroImage?.name || this.articleTitle.value.trim() !== this.article.title) {
              this.articleService.saveArticle({
                ...this.article,
                title: this.articleTitle.value.trim(),
                updated: new Date(),
                heroImage: this.articleHeroImage,
                content: data.blocks
              })
            }
          })
        } else {
          this.articleService.saveArticle({
            ...this.article,
            title: this.articleTitle.value.trim(),
            updated: new Date(),
            heroImage: this.articleHeroImage
          })
        }
      }
    }
    // Called any time user navigates from the editor
    // this.editor.save().then((content) => {
    //   if (this.article) {
    //     // TODO: Check if content has changed
    //     this.articleService.saveArticle({
    //       ...this.article,
    //       title: this.articleTitle.value,
    //       heroImage: this.articleHeroImage,
    //       updated: new Date(content.time!),
    //       content: content.blocks,
    //     }).catch((err) => {
    //       console.log(err);
    //     });
    //   } else if (content.blocks.length || this.articleHeroImage || this.articleTitle.value) {
    //     this.articleService.saveArticle({
    //       title: this.articleTitle.value,
    //       updated: new Date(content.time!),
    //       heroImage: this.articleHeroImage,
    //       created: new Date(content.time!),
    //       content: content.blocks,
    //     }).catch((err) => {
    //       console.log(err);
    //     });
    //   }
    // });
  }
}
