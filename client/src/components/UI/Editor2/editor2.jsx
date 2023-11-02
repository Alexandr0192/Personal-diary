import React, {useEffect, useRef, useState, Component} from 'react';
import classes from './editor2.module.css'
import { createReactEditorJS } from "react-editor-js";
import {EDITOR_JS_i18n, EDITOR_JS_TOOLS} from "./constants";


const Editor2 = () => {

    // Для автоматического увелечения и уменьшения textarea
    const textareaRef = useRef(null);
    // Обновляем данные
    const [savedData, setSavedData] = useState(null);

    useEffect(() => {
        const textarea = textareaRef.current;

        const adjustTextareaHeight = () => {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
            // Получение данных из textarea
            const textareaValue = textareaRef.current.value;
            console.log(textareaValue);
        };

        textarea.addEventListener('input', adjustTextareaHeight);

        // Установка высоты в 0px при монтировании компонента
        textarea.style.height = '47px';
        return () => {
            textarea.removeEventListener('input', adjustTextareaHeight);
        };
    }, []);

    const editorInstance = useRef(null);

    const ReactEditorJS = createReactEditorJS();

    const handleSave = async (savedData) => {
        if (editorInstance.current) {
            try {
                const savedData = await editorInstance.current.save();
                setSavedData(savedData);
                console.log('Saved data:', savedData);
                // Выполните дополнительные действия с сохраненными данными
            } catch (error) {
                console.error('Saving failed:', error);
            }
        }
    };


    return (<div className={`${classes.contentEditable}`}>
            <textarea ref={textareaRef} placeholder="Заголовок" maxLength="120" rows="1"
                      className={`${classes.titleTextarea}`}></textarea>
        <ReactEditorJS
            tools={EDITOR_JS_TOOLS}
            i18n={EDITOR_JS_i18n}
            onChange={handleSave}
            //defaultValue={blocks}
        />
    </div>);
};

export default Editor2;