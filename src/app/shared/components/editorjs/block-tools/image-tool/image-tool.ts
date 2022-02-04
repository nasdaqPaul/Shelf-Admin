import {API, BlockTool} from "@editorjs/editorjs";

const imageIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-image" viewBox="0 0 16 16">
            <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
            <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"/>
          </svg>`

export default class ImageTool implements BlockTool{
  private api: API
  private imageElement?: HTMLImageElement;
  private imageFile: File;
  private captionInputElement?: HTMLInputElement;
  private savedCaption: string;

  constructor({api, data}:any) {
    console.log('Image tool creation')
    this.api = api;
    this.imageFile = data.imageFile;
    this.savedCaption = data.caption;
  }
  static get toolbox(){
    return {
      title: 'Image',
      icon: imageIcon
    }
  }
  private handleFileInput = (event: Event) =>{
    //@ts-ignore
    this.imageFile = event.target!.files![0]
    this.imageElement!.src = URL.createObjectURL(this.imageFile);
  }
  private buildToolHeader() {
    const headerElem = document.createElement('header');
    headerElem.classList.add('rounded', 'bg-dark', 'shadow-lg', 'm-2', 'px-3');
    headerElem.innerHTML = '<h6 class="text-muted my-auto py-1">filename (file-size)</h6>'

    const fileInputElement = document.createElement('input');
    fileInputElement.type = 'file';
    fileInputElement.accept = 'image/*';
    fileInputElement.hidden = true;
    fileInputElement.onchange = this.handleFileInput;
    if (!this.imageFile) fileInputElement!.click();

    headerElem.appendChild(fileInputElement);
    return headerElem;
  }
  private buildImageElement() {
    this.imageElement = document.createElement('img');
    this.imageElement.src = this.imageFile? URL.createObjectURL(this.imageFile) : "";
    this.imageElement.classList.add('rounded', 'img-thumbnail');
    return this.imageElement
  }
  private buildFooter() {
    const footer = document.createElement('footer');
    footer.classList.add('d-inline-flex', 'w-100')
    this.captionInputElement = document.createElement('input');
    this.captionInputElement.type = 'text';
    this.captionInputElement.classList.add('form-control','form-control-sm', 'mt-1');
    this.captionInputElement.placeholder = 'Add a caption'
    if (this.savedCaption) this.captionInputElement.value = this.savedCaption;
    footer.appendChild(this.captionInputElement);
    return footer
  }
  render() {
    const wrapperDiv = document.createElement('article');
    wrapperDiv.classList.add('image-tool', 'mt-2', 'mb-4')

    wrapperDiv.appendChild(this.buildToolHeader());
    wrapperDiv.appendChild(this.buildImageElement());
    wrapperDiv.appendChild(this.buildFooter());

    return wrapperDiv;
  }

  save() {
    console.log('caption', this.captionInputElement?.value)
    return {
      imageFile: this.imageFile,
      caption: this.captionInputElement?.value
    }
  }
}
