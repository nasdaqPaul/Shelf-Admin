import {Component, Input, OnChanges, Output, SimpleChanges, EventEmitter} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: '[hero-image]',
  template: `
    <div class="img-container shadow">
      <img [src]="imageSrc">
    </div>
    <div class="d-inline-flex w-100">
      <button class="btn btn-outline-danger btn-sm mt-1 text-center ms-auto" (click)="remove.emit()">Remove Cover Image</button>
    </div>
  `,
  styles:[
    `.img-container {
      overflow: hidden;
      border-radius: 5px;
    }
    img {
      height: auto;
      width: 100%;
    }
    `
  ],
})
export class HeroImageComponent implements OnChanges {
  @Input('imageFile') image!: File;
  @Output('removeCoverImage') remove = new EventEmitter();

  imageSrc: any;
  constructor(private sanitizer: DomSanitizer) {

  }

  ngOnChanges(changes: SimpleChanges) {
    //TODO: Consider using FileReader, it is async
    this.imageSrc = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.image))
    URL.revokeObjectURL(this.imageSrc);
  }

}
