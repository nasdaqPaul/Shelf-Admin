import {API, BlockTool} from "@editorjs/editorjs";
import {File} from "@angular/compiler-cli/src/ngtsc/file_system/testing/src/mock_file_system";

const imageIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-image" viewBox="0 0 16 16">
            <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
            <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"/>
          </svg>`

export default class ImageTool implements BlockTool{
  private api: API
  private imageFile: File;
  private wrapperDiv?: HTMLElement;
  private imageCaption?: string;

  constructor({api, data}:any) {
    this.api = api;
    this.imageFile = data.imageFile;
    this.imageCaption = data.caption;
    this.wrapperDiv = undefined;
  }
  static get toolbox(){
    return {
      title: 'Image',
      icon: imageIcon
    }
  }
  handleFileInput = (event: Event) =>{
    // @ts-ignore
    this.imageFile = event.target.files[0];
    // @ts-ignore
    this.wrapperDiv.children[1].src = URL.createObjectURL(this.imageFile);
  }
  render() {
    this.wrapperDiv = document.createElement('div');
    const fileInput = document.createElement('input');
    const imgElement = document.createElement('img');
    const captionElem = document.createElement('p');

    imgElement.src = this.imageFile? URL.createObjectURL(this.imageFile) : "";
    imgElement.classList.add('border', 'border-primary', 'border-1', 'rounded', 'my-1',)
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.hidden = true;
    fileInput.onchange = this.handleFileInput;

    captionElem.contentEditable = 'true';
    captionElem.innerText = this.imageCaption || "Add image caption"
    captionElem.classList.add('text-muted', 'ps-5', 'image-caption', 'ce-paragraph')

    this.wrapperDiv.appendChild(fileInput);
    this.wrapperDiv.appendChild(imgElement);
    this.wrapperDiv.appendChild(captionElem);
    this.wrapperDiv.classList.add('editor-image-elem')

    if (!this.imageFile) fileInput.click();
    return this.wrapperDiv;
  }

  save() {
    return {
      imageFile: this.imageFile,
      caption: this.imageCaption
    }
  }
}
