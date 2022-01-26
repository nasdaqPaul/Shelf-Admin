import Header from '@editorjs/header';
// @ts-ignore
import List from '@editorjs/list';
// @ts-ignore
import Embed from '@editorjs/embed';
// @ts-ignore
import Marker from '@editorjs/marker';

export const editorjsConfig = {
  logLevel: 'ERROR',
  placeholder: 'Click to start typing',
  holder: 'editorjs',
  tools: {
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
