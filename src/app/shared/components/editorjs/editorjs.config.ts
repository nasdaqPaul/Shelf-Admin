import Header from '@editorjs/header';
// @ts-ignore
import List from '@editorjs/list';
// @ts-ignore
import Embed from '@editorjs/embed';
// @ts-ignore
import Marker from '@editorjs/marker';
import ImageTool from "./block-tools/image-tool/image-tool";
import CodeTool from "./block-tools/code-tool/code-tool";

export const editorjsConfig = {
  logLevel: 'ERROR',
  placeholder: 'Click to start typing',
  holder: 'editorjs',
  tools: {
    image: {
      class: ImageTool
    },
    code: {
      class: CodeTool
    },
    Marker: {
      class: Marker,
      shortcut: 'CMD+SHIFT+M',
    },
    header: {
      class: Header,
      inlineToolbar: [
        'link', 'bold', 'italic',
      ],
    },
    list: {
      class: List,
      inlineToolbar: [
        'link', 'bold',
      ],
    },
    embed: {
      class: Embed,
      inlineToolbar: false,
      config: {
        services: {
          youtube: true,
          coub: true,
        },
      },
    },
  },
};
