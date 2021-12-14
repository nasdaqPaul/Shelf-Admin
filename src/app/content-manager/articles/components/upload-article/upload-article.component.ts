import {Component, OnInit} from '@angular/core';
import {Modal} from "bootstrap";
import {Article} from "../../types";
import {SitesService} from "../../../../site-manager/services/sites.service";
import {SiteConnection} from "../../../../storage/local/db/connected-sites.object-store";
import {FormControl} from "@angular/forms";
import {UploaderService} from "../../services/uploader.service";
import DatabaseService from "../../../../storage/local/db";

@Component({
  selector: 'upload-article',
  templateUrl: './upload-article.component.html',
  styleUrls: ['./upload-article.component.css']
})
export class UploadArticleComponent implements OnInit {
  private uploadArticleModal!: Modal;
  uploadArticle!: Article | null;
  allSites!: SiteConnection[];
  uploadSiteFormControl = new FormControl(null);


  constructor(private sites: SitesService, private uploader: UploaderService, private db: DatabaseService) {
    this.sites.connectedSites.subscribe(connections => {
      this.allSites = connections;
    })
  }

  ngOnInit(): void {
    this.uploadArticleModal = new Modal('#uploadArticleModal');
  }

  upload(uploadArticle: Article) {
    this.uploadArticle = uploadArticle;
    this.uploadArticleModal.show();
  }
  async up() {
    const article = await this.db.articles.get(this.uploadArticle!.id!)
    this.uploader.upload(article!, this.uploadSiteFormControl.value).subscribe({
      next: ()=> {
        this.uploadArticleModal.hide();
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
