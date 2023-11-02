export const EDITOR_JS_I18N = {
    /**
     * @type {I18nDictionary}
     */
    messages: {
        /**
         * Other below: translation of different UI components of the editor.js core
         */
        ui: {
            filter: 'Фильтр',
            "blockTunes": {
                "toggler": {
                    "Click to tune": "Нажмите, чтобы настроить", "or drag to move": "или перетащите"
                },
            }, "inlineToolbar": {
                "converter": {
                    "Convert to": "Конвертировать в"
                }
            }, "toolbar": {
                "toolbox": {
                    "Add": "Добавить"
                }
            },
            popover: {
                Filter: "Фильтр",
                "Nothing found": "Ничего не найдено"
            }
        },

        /**
         * Section for translation Tool Names: both block and inline tools
         */
        toolNames: {
            "Text": "Текст",
            "Heading": "Заголовок",
            "List": "Список",
            "Warning": "Примечание",
            "Checklist": "Чеклист",
            "Quote": "Цитата",
            "Code": "Код",
            "Delimiter": "Разделитель",
            "Raw HTML": "HTML-фрагмент",
            "Table": "Таблица",
            "Link": "Ссылка",
            "Marker": "Маркер",
            "Bold": "Полужирный",
            "Italic": "Курсив",
            "InlineCode": "Встроенный код",
            "Image": "Фото",
            "Strikethrough": "Зачеркивание",

        },

        /**
         * Section for passing translations to the external tools classes
         */
        tools: {
            "table": {
                "With headings": "С заголовками",
                "Without headings": "Без заголовков",
                "Add row above": "Добавить строку выше",
                "Add row below": "Добавить строку ниже",
                "Delete row": "Удалить строку",
                "Delete column": "Удалить столбец",
                "Add column to left": "Добавить столбец слева",
                "Add column to right": "Добавить столбец справа",
                "Heading": "Заголовок",
            },
            /**
             * Each subsection is the i18n dictionary that will be passed to the corresponded plugin
             * The name of a plugin should be equal the name you specify in the 'tool' section for that plugin
             */
            "warning": { // <-- 'Warning' tool will accept this dictionary section
                "Title": "Название", "Message": "Сообщение",
            },

            /**
             * Link is the internal Inline Tool
             */
            "link": {
                "Add a link": "Вставьте ссылку"
            }, /**
             * The "stub" is an internal block tool, used to fit blocks that does not have the corresponded plugin
             */
            "stub": {
                'The block can not be displayed correctly.': 'Блок не может быть отображен'
            },
            "image": {
                "Couldn’t upload image. Please try another.": "Не удалось загрузить изображение. Пожалуйста, попробуйте другую",
                "Caption": "Подпись",
                "Select an Image": "Выберите файл",
                "With border": "Добавить рамку",
                "Stretch image": "Растянуть",
                "With background": "Добавить подложку",
            },
            "code": {
                "Enter a code": "Код",
            },
            "linkTool": {
                "Link": "Ссылка",
                "Couldn't fetch the link data": "Не удалось получить данные",
                "Couldn't get this link data, try the other one": "Не удалось получить данные по ссылке, попробуйте другую",
                "Wrong response format from the server": "Неполадки на сервере",
            },
            "header": {
                "Header": "Заголовок",
            },
            "paragraph": {
                "Enter something": "Введите текст"
            },
            "list": {
                "Ordered": "Нумерованный",
                "Unordered": "Маркированный",
            },

        },

        /**
         * Section allows to translate Block Tunes
         */
        blockTunes: {
            /**
             * Each subsection is the i18n dictionary that will be passed to the corresponded Block Tune plugin
             * The name of a plugin should be equal the name you specify in the 'tunes' section for that plugin
             *
             * Also, there are few internal block tunes: "delete", "moveUp" and "moveDown"
             */

            "delete": {
                "Delete": "Удалить",
                "Click to delete": "Нажмите, чтобы удалить"
            }, "moveUp": {
                "Move up": "Переместить вверх"
            }, "moveDown": {
                "Move down": "Переместить вниз"
            },
        },
    }
};