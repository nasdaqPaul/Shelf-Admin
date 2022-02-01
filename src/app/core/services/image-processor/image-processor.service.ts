import {Injectable} from '@angular/core';
import Compressor from 'compressorjs'

@Injectable({
  providedIn: 'root'
})
export class ImageProcessorService {

  constructor() {
  }

  generateThumbnail(coverImage: File) {
    return new Promise<File>((resolve, reject) => {
      new Compressor(coverImage, {
        width: 50,
        height: 50,
        success(result) {
          // @ts-ignore
          resolve(result)
        },
        error(err) {
          reject(err)
        }
      })
    })
  }

  generateImageULR(imageFile: File | Blob) {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = function (event) {
        // @ts-ignore
        resolve(reader.result);
      }
      reader.readAsDataURL(imageFile);
    })
  }
}
