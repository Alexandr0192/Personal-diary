/*
Компонент  MyButton , который представляет собой кнопку с различными классами стилей,
в зависимости от значения  classValue .
Компонент принимает дочерние элементы ( children ) и пропсы ( props ),
которые включают обработчики событий  onClick ,  onMouseOver  и  onMouseOut .

onMouseOver  - это пропс, который принимает функцию-обработчик события для события  onMouseOver . Когда указатель мыши наводится на кнопку, будет вызвана переданная функция.
MyButton  с атрибутом  onMouseOut , то вы можете передать функцию-обработчик события для события  onMouseOut . Когда указатель мыши покидает кнопку, будет вызвана переданная функция.

Возвращаемый JSX содержит кнопку с классом стиля, определенным на основе значения classValue .
В зависимости от значения  classValue , будет применен соответствующий класс из модуля стилей
MyButton.module.css .
*/

import React from 'react';
import classes from './MyButton.module.css';

const MyButton = ({children, ...props}) => {
    return (
        <button onClick={props.onClick} onMouseOver={props.onMouseOver} onMouseOut={props.onMouseOut} className={
            props.classValue === 'new_post' ? classes.new_post:
            props.classValue === 'advanced-search-button' ? classes.advanced_search_button:
            props.classValue === 'sort_post' ? classes.sort_post:
                ''
        }>
            {children}
        </button>
    );
};

export default MyButton;