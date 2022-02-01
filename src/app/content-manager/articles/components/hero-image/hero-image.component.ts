import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {ImageProcessorService} from "../../../../core/services/image-processor/image-processor.service";

@Component({
  selector: '[hero-image]',
  template: `
    <div id="toolBar" class="d-inline-flex w-100 bg-opacity-50 shadow bg-primary ps-2 rounded">
      <h6 class="image-info m-0 my-auto">{{image.size | formatBytes: 3}} ({{image.name}})</h6>
      <button class="rem btn btn-sm btn-danger m-1 ms-auto" (click)="remove.emit()" id="removeButton">Remove</button>
    </div>
    <img [src]="imageSrc">

  `,
  styles: [
    `
      #toolBar {
        position: absolute;
        top: 0;
        right: 0;
        z-index: 1;
      }

      img {
        height: 100%;
        width: 100%;
        object-fit: contain;
      }
    `
  ],
})
export class HeroImageComponent implements OnChanges {
  @Input('imageFile') image!: File;
  @Output('removeCoverImage') remove = new EventEmitter();

  imageSrc: any;

  constructor(private sanitizer: DomSanitizer, private imageProcessor: ImageProcessorService) {

  }

  async ngOnChanges(changes: SimpleChanges) {
    this.imageSrc = this.sanitizer.bypassSecurityTrustUrl(await this.imageProcessor.generateImageULR(this.image))
    URL.revokeObjectURL(this.imageSrc);
  }

}
