import React, {useEffect, useRef, useState} from 'react';
import classes from './editor.module.css'
import EditorJS from '@editorjs/editorjs';
import {EDITOR_JS_TOOLS} from './editorTools';
import {EDITOR_JS_I18N} from "./editorI18n";
import {PostDataContext, TitlePostDataContext} from "../../../context/DataContext";
import {debounce} from 'lodash';
import {Link, useParams} from "react-router-dom";
import {useFetching} from "../../../hooks/useFetching";
import PostService from "../../../API/PostService";

const Editor = () => {

    /**
     * Узнаем id поста с помощью useParams
     * useParams()  является хуком, предоставляемым React Router, который позволяет получить параметры из URL.
     * @type {}
     */
    const params = useParams()

    // Для автоматического увелечения и уменьшения textarea
    const titleTextareaRef = useRef(null);

    /**
     вместо EDITOR_JS_DEFAULT_INITIAL_DATA надо будет добавить переменную для передачи данных из PostService.js
     savedTitleData содержит название Темы поста, setSavedTitleData ее обновляет
     ?надо подумать как сделать чтобы часто не обновлялось?
     */
    const [savedTitleData, setSavedTitleData] = useState('');

    // Обновляем данные поста
    const [savedData, setSavedData] = useState(null);

    const [loadingPost, setLoadingPost] = useState(false);

    /**
     * Получаем данные поста
     * в процессе написания
     */
    const [fetchPostById, isLoadingPost, error] = useFetching(async (id) => {
        const response = await PostService.getById(id);
        // получаем дату со временем редактирования(создания) в формате ISO 8601
        const time = +new Date(response.data.updated_at);
        const blocks = JSON.parse(response.data.content);
        const version = response.data.version;
        const title = response.data.title;
        setSavedTitleData(title);
        const data = {}
        data.time = time;
        data.blocks = blocks;
        data.version = version;
        setSavedData(data);
    })

    useEffect(() => {
        fetchPostById(params.id);
    }, [])

    // Функция handleSave выполняет сохранение данных, введенных в редактор.
    const handleSave = async () => {
        if (editorInstance.current || titleTextareaRef.current) {
            try {
                const content = await editorInstance.current.save();
                setSavedData(content);
                adjustTextareaHeight();
                setSavedTitleData(await titleTextareaRef.current.value);
            } catch (error) {
                console.error('Saving failed:', error);
            }
            // } finally {
            //     setIsLoading(false); // Устанавливаем isLoading в false после завершения сохранения данных
            // }
        }
    };

    /*
        Задержка для сохранения данных
     */
    const debouncedHandleSave = useRef(debounce(handleSave, 1000));

//??
    useEffect(() => {
        const updatedData = savedData;
        if (savedData) {
            updatedData["title"] = savedTitleData;
            updatePostDataById(params.id, JSON.stringify(updatedData));
            // console.log(updatedData);
        }
    }, [savedData, savedTitleData])
    /*
    В данном коде используется хук useEffect, который выполняет определенные действия при изменении компонента.
    Внутри useEffect определена функция handleTitleChange, которая будет вызываться при изменении заголовка.
    debouncedHandleSave.current() - функция, которая будет вызываться с задержкой,
    чтобы избежать частых обращений к серверу при изменении заголовка.
    Далее проверяется, существует ли элемент titleTextareaRef в DOM. Если да,
    то добавляется слушатель события 'input', который вызывает функцию handleTitleChange при изменении значения в поле ввода заголовка.
    Возвращаемая функция в useEffect удаляет слушатель события 'input',
    если элемент titleTextareaRef все еще существует.
    */
    useEffect(() => {
        const handleTitleChange = () => {
            debouncedHandleSave.current();
        };
        if (titleTextareaRef.current) {
            titleTextareaRef.current.addEventListener('input', handleTitleChange);
        }

        return () => {
            if (titleTextareaRef.current) {
                titleTextareaRef.current.removeEventListener('input', handleTitleChange);
            }
        };
    }, []);

    /*
    Функция adjustTextareaHeight используется для автоматической настройки высоты текстового поля.
    Она сначала устанавливает высоту поля в значение "auto", чтобы сбросить предыдущие настройки высоты.
    Затем она устанавливает высоту поля равной его полному содержимому, измеренному в пикселях.
    Это позволяет текстовому полю автоматически растягиваться в зависимости от количества текста в нем.
    */
    const adjustTextareaHeight = () => {
        titleTextareaRef.current.style.height = 'auto';
        titleTextareaRef.current.style.height = `${titleTextareaRef.current.scrollHeight}px`;
    };

    useEffect(() => {
        if (titleTextareaRef.current) {
            titleTextareaRef.current.addEventListener('input', adjustTextareaHeight);
            // Установка высоты в 0px при монтировании компонента
            titleTextareaRef.current.style.height = '47px';
        }

        return () => {
            if (titleTextareaRef.current) {
                titleTextareaRef.current.removeEventListener('input', adjustTextareaHeight);
            }
        };
    }, []);

    const editorInstance = useRef(null);

    useEffect(() => {
        if (isLoadingPost) {
            setLoadingPost(true);
        }
        // console.log(!editorInstance.current, loadingPost, savedData)
        if (!editorInstance.current && loadingPost) {
            initEditor();
        }

        return () => {
            if (editorInstance.current) {
                editorInstance.current.destroy();
                editorInstance.current = null;
            }
        }
    }, [isLoadingPost]);

    const initEditor = () => {
        const editor = new EditorJS({
            minHeight: 0, output: {
                format: 'html',
            }, holder: 'editor-container', // Идентификатор или класс элемента контейнера.
            onReady: () => {
                editorInstance.current = editor;
            },
            placeholder: 'Нажмите Tab для выбора инструмента', inlineToolbar: true,// включить меню при нажатии левой кнопки на текст
            tools: EDITOR_JS_TOOLS,
            i18n: EDITOR_JS_I18N,
            data: savedData,
            autofocus: true,
            onChange: debouncedHandleSave.current,
        });
    }

    const editorContainerRef = useRef(null);
    /*
    Толком не работает
     */
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            console.log('нажата кнопка ENTER')
            event.preventDefault();
            titleTextareaRef.current.blur();
            editorContainerRef.current.focus();
        }
    };


    //Надо преобразовать данные из объектов savedData и savedTitleData в JSON формат определенного вида и передать на сервер
    /*
    функция преобразует данные в JSON формат
    Добавляем в объект savedData заголовок поста
    Затем переводим даннные в JSON формат
    и передаем в PostService.js для отправки данных на сервер
    */
    // const dataPostJSON= (savedTitleData) => {
    //     savedData["title"] = savedTitleData;
    //     return JSON.stringify(savedData);
    // }

    /**
     * Обновляем данные поста
     * в процессе написания
     */
    const [updatePostDataById, isLoading1, error1] = useFetching(async (postId, updatedData) => {
        await PostService.updatePostDataById(postId, updatedData);
        console.log('данные обновились');
    })

    return (
        <div>
            <TitlePostDataContext.Provider value={savedTitleData}>
                <PostDataContext.Provider value={savedData}>
                    <div className={`${classes.contentEditable}`}>
                    <textarea
                        defaultValue={savedTitleData}
                        onKeyDown={handleKeyDown}
                        ref={titleTextareaRef}
                        placeholder="Заголовок"
                        maxLength="99"
                        rows="1"
                        className={`${classes.titleTextarea}`}
                    >
            </textarea>
                        <div id="editor-container" ref={editorContainerRef}></div>
                    </div>
                </PostDataContext.Provider>
            </TitlePostDataContext.Provider>
        </div>
    );
};

export default Editor;