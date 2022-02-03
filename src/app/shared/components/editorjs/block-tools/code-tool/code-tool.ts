import {API, BlockTool, BlockToolData} from "@editorjs/editorjs";
import syntaxHighlighter from "highlight.js";
const codeIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-code-slash" viewBox="0 0 16 16">
  <path d="M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294l4-13zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0zm6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0z"/>
</svg>
`
const languageOptions: {name: string, value: string}[] = [
  {
    name: 'Python',
    value: 'python'
  },
  {
    name: 'Java',
    value: 'java'
  }
]

export default class CodeTool implements BlockTool {
  private wrapperDiv?: HTMLElement;
  private codeTextArea?: HTMLTextAreaElement;
  private highlightResult?: HTMLPreElement;
  private language?: HTMLSelectElement;
  private savedData?: {code: string, language: string}
  private api?: API

  // @ts-ignore
  constructor({data, api}) {
    console.log('saved', data)
    this.savedData = data;
    this.api = api;
  }
  static get toolbox() {
    return {
      title: 'Code',
      icon: codeIcon
    }
  }
  private highlightCode(){
    //TODO: Find a more non-repeating way of modifying this class-list
    this.highlightResult!.className = 'border border-secondary w-100 rounded p-1 h-100 hljs language-' + this.language?.value
    this.highlightResult!.innerHTML = syntaxHighlighter.highlight(this.codeTextArea!.value, {language: this.language!.value}).value;
  }
  private buildCodeTextArea(): HTMLElement{
    const containerElem = document.createElement('section');
    this.codeTextArea = document.createElement('textarea');
    containerElem.classList.add('col');
    this.codeTextArea.addEventListener("keydown", this.handleTextAreaKeyDown);
    this.codeTextArea.addEventListener('blur', e => {
      this.highlightCode();
    })
    this.codeTextArea.classList.add( 'form-control','w-100');
    // this.codeTextArea.rows = 10;
    this.codeTextArea.placeholder = 'Code here..'
    if (this.savedData?.code){
      this.codeTextArea.value = this.savedData.code;
    }
    containerElem.appendChild(this.codeTextArea);
    return containerElem;
  }
  private buildHeaderComponent(){
    const containerElem = document.createElement('header');
    containerElem.classList.add('col-12', 'rounded', 'bg-primary', 'shadow', 'd-inline-flex');
    containerElem.innerHTML = '<h6 class="d-inline-block my-auto text-light">Language</h6>'
    this.language = document.createElement('select');
    this.language.classList.add('form-select', 'form-select-sm', 'm-1', 'ms-auto');
    for (let languageOption of languageOptions){
      const option = document.createElement('option');
      option.value = languageOption.value;
      option.innerText = languageOption.name;
      this.language.appendChild(option);
    }
    if(this.savedData?.language){
      this.language.value = this.savedData.language
    }
    containerElem.appendChild(this.language);
    return containerElem
  }
  private buildResultComponent(){
    const containerElem = document.createElement('section');
    this.highlightResult = document.createElement('pre');
    containerElem.classList.add('col')
    this.highlightResult.classList.add('border', 'border-secondary', 'w-100', 'rounded', 'p-1', 'h-100');
    if(this.savedData?.language){
      this.highlightCode();
    }
    containerElem.appendChild(this.highlightResult);
    return containerElem;
  }
  private handleTextAreaKeyDown(e: KeyboardEvent){
    //@ts-ignore
    const textArea: HTMLTextAreaElement = this;
    if (e.key == 'Tab') {
      textArea.value = textArea.value.substr(0, textArea.selectionStart) + "\t" + textArea.value.substr(textArea.selectionStart);
      textArea.selectionEnd = textArea.selectionStart + 1;
      e.stopPropagation();
      e.preventDefault();
    }
    else if (e.key == 'Enter'){
      e.stopPropagation();
    }
  }
  render(): HTMLElement {
    this.wrapperDiv = document.createElement('article');
    this.wrapperDiv.classList.add('row', 'g-2', 'code-tool');
    this.wrapperDiv.appendChild(this.buildHeaderComponent());
    this.wrapperDiv.appendChild(this.buildCodeTextArea());
    this.wrapperDiv.appendChild(this.buildResultComponent());
    return this.wrapperDiv;
  }


  save(block: HTMLElement): BlockToolData {
    return {
      code: this.codeTextArea?.value,
      language: this.language?.value
    }
  }

}
