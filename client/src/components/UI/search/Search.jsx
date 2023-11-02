import React, {useContext, useEffect, useState} from 'react';
import MyInput from "../input/MyInput";
import MyButton from "../button/MyButton";
import classes from "../button/MyButton.module.css";
import {AuthContext} from "../../../context";
import {usePosts} from "../../../hooks/usePosts";


const Search = ({posts, setModal}) => {
    const {setSortedAndSearchPosts} = useContext(AuthContext);
    //для сортировки
    //sort - сортировка
    //query - поиск
    const [filter, setFilter] = useState({sort: '', query: '' });

    //видимость блока сортировки
    const [sortBoxVisibility, setSortBoxVisibility] = useState(false);

    // Сортировка и поиск
    const PostsSorted = usePosts(posts, filter.sort, filter.query);
    useEffect(() => {
        setSortedAndSearchPosts(PostsSorted);
    }, [PostsSorted, setSortedAndSearchPosts]);

    return (
        <div className="search-bar">
            {/*строка поиска плюс кнопки*/}
            <div className="search-content">
                <div className="search">
                    {/*Поисковая строка*/}
                    <MyInput
                        value={filter.query}
                        onChange={e => setFilter({...filter, query: e.target.value})}
                        placeholder="Поиск"
                        type="text"
                    />
                    <img className="icon-search" src="../img/icon-search.svg" alt="icon-search"/>
                </div>
                {/*Кнопка создания нового поста*/}
                <MyButton classValue = "new_post" onClick = {()=>setModal(true)}>
                    <div className={classes.img_myBtn_new_post}></div>
                    <div className={classes.text_myBtn_new_post}>Создать</div>
                </MyButton>
            </div>
            {/*Кнопка расширенного поиска*/}
            <MyButton classValue = "advanced-search-button" onClick = {()=>setModal(true)}>
                <div className={classes.advanced_search_button_text}>расширенный поиск</div>
                <div className={classes.advanced_search_button_img}></div>
            </MyButton>
        </div>
    );
};

export default Search;