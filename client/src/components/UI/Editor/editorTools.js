import Header from '@editorjs/header';
import Paragraph from '@editorjs/paragraph';
import List from '@editorjs/list';
import ImageTool from '@editorjs/image';
import CodeTool from '@editorjs/code';
import Delimiter from '@editorjs/delimiter';
import Embed from '@editorjs/embed';
import Marker from '@editorjs/marker';
import InlineCode from '@editorjs/inline-code';
import Table from '@editorjs/table';
import Strikethrough from 'editorjs-strikethrough';

export const EDITOR_JS_TOOLS = {
    header: {
        class: Header,
        inlineToolbar: true,
    },

    table: {
        class: Table,
        inlineToolbar: true,
        config: {
            rows: 2, cols: 3, withHeadings: true, // Включение заголовков   почему то не работают
        },
    },

    list: {
        class: List,
        inlineToolbar: true,
    },

    //Инструмент «Параграф(Абзац)»
    paragraph: {
        class: Paragraph,
        inlineToolbar: true,
    },

    code: {
        class: CodeTool,
        inlineToolbar: true,
    },

    strikethrough: {
        class: Strikethrough,
        // Настройка клавиш
        shortcut: 'CMD+SHIFT+X',
    },
    /*
    Надо подумать как реализовать загрузку картинок на сервер
    https://www.npmjs.com/package/@editorjs/image
     */
    image: {
        class: ImageTool, config: {
            endpoints: {
                byFile: 'http://localhost:5000/uploadFile', // Конечная точка серверной загрузки файлов
                byUrl: 'http://localhost:5000/fetchUrl', // Ваша конечная точка, обеспечивающая загрузку по URL-адресу.
                // uploader: {
                //     uploadByFile(file) {
                //         // обработка загрузки файла здесь
                //     }}
            }
        },
    },

    //разделить
    delimiter: Delimiter,

    embed: {
        class: Embed,
    },

    // marker выделение маркером текст
    marker: {
        class: Marker,
        shortcut: 'CMD+SHIFT+M'
    },

    //inlineCode предназначен для выделения фрагментов кода внутри текстового контента.
    inlineCode: {
        class: InlineCode,
        shortcut: 'CMD+SHIFT+M',
    },
};