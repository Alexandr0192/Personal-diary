// Импортируем React хуки и компоненты
import React, { useState, useRef, useEffect } from 'react';
import MyButton from "../button/MyButton";
import classes from "../button/MyButton.module.css";
import DropdownMenuStyle from "./dropdownmenu.module.css";

// Определяем пользовательский компонент для выпадающего меню
const DropdownMenu = ({ children, setisOpenItemClick, isOpenItemClick}) => {
    //Состояние наведения мышки на кнопку сортировки (используется для изменения цвета)
    const [over, setOver] = useState(false);
    // Используем хук состояния для хранения статуса открытия/закрытия меню
    const [isOpen, setIsOpen] = useState(false);
    // Используем хук ссылки для доступа к элементу меню в DOM
    const menuRef = useRef(null);

    // Определяем функцию для переключения статуса меню
    function toggleMenu() {
        setIsOpen(!isOpen);
    }

    // useEffect - При использовании этого хука мы говорим React, что наш компонент должен сделать что-то
    // после отрисовки, передавая функцию. React запоминает функцию,
    // которую мы передали в useEffect () hook и вызывает ее позже после выполнения обновлений DOM.
    useEffect(() => {
        if (isOpenItemClick && isOpen) {
            setIsOpen(!isOpen);
            setisOpenItemClick(!isOpenItemClick);
        };
    }, [isOpenItemClick]);


    // Определяем функцию для закрытия меню при клике вне его
    function handleClickOutside(event) {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    }

    // Используем хук эффекта для добавления и удаления обработчиков событий для кликов
    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    // Возвращаем JSX элементы для рендеринга компонента меню
    return (
        <div className={DropdownMenuStyle.dropdown_menu} ref={menuRef}>
            <MyButton
                onClick={toggleMenu}
                onMouseOver = {() => setOver(true)}
                onMouseOut={() => setOver(false)}
                classValue = "sort_post">
                <div className={classes.text_myBtn_sort_post}>Сортировка</div>
                <img
                    src={
                        over ?
                            './img/icon_sort_blue.svg' :
                            './img/icon_sort.svg'
                    }
                    className={classes.img_myBtn_sort_post}
                />
            </MyButton>
            {isOpen && <div className={DropdownMenuStyle.dropdown_content}>{children}</div>}
        </div>
    );
};

// Экспортируем компонент по умолчанию
export default DropdownMenu;