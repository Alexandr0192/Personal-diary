/*
* Страница со списком постов
*/

import React, {useContext, useEffect, useMemo, useRef, useState} from 'react';
import PostList from "../components/PostList";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import MyModal from "../components/UI/MyModal/MyModal";
import MyButton from "../components/UI/button/MyButton";
import {usePosts} from "../hooks/usePosts";
import PostService from "../API/PostService";
import Loader from "../components/UI/Loader/Loader";
import {useFetching} from "../hooks/useFetching";
import Pagination from "../components/UI/pagination/Pagination";
import {getPageCount} from "../utils/pages";
import {useObserver} from "../hooks/useObserver";
import MySelect from "../components/UI/select/MySelect";
import {publicRoutes} from "../router";
import MyInput from "../components/UI/input/MyInput";
import classes from "../components/UI/button/MyButton.module.css";
import classess from "../components/UI/MyModal/MyModal.module.css";
import DropdownMenu from "../components/UI/dropdownmenu/dropdownmenu";
import DropdownMenuStyle from "../components/UI/dropdownmenu/dropdownmenu.module.css";
import Search from "../components/UI/search/Search";
import {AuthContext} from "../context";

const Posts = () => {
    const {sortedAndSearchPosts, setSortedAndSearchPosts} = useContext(AuthContext);

    // Используем хук состояния для хранения статуса открытия/закрытия меню
    const [isOpen, setIsOpen] = useState(false);
    //totalPages- всего количество страниц
    const [totalPages, setTotalPages] = useState(0);
    //limit - количество постов на странице
    const [limit, setLimit] = useState(10);
    //page - количество страниц
    const [page, setPage] = useState(1);
    //pagination - нумерация страниц по умолчанию включена, если выключена, то включается режим бесконечной ленты
    const [pagination, setPagination] = useState(true);

    //fetchPost  ????
    const [fetchPost, isPostLoading, postError] = useFetching(async (limit, page) => {
        // Вызываем метод getAll в котором содержатся посты и записываем их в массив posts
        const response = await PostService.getAll(limit, page);
        if (pagination) {
            //помещаем полученные данные в setPost в конец массива с даннными, тем самым обновляем posts с новыми данными используя useState
            setPosts(response.data);
        }
        else
        {
            //помещаем полученные данные в setPost в конец массива с даннными, тем самым обновляем posts с новыми данными используя useState
            setPosts([...posts, ...response.data]);
        }
        const totalCount = (response.headers['x-total-count']);
        //обновляем количество страниц
        setTotalPages(getPageCount(totalCount, limit));
    })

        /**
        * useRef возвращает изменяемый ref-объект. Возвращённый объект будет сохраняться в течение всего времени жизни компонента.
        * @type {React.MutableRefObject<undefined>}
        */
        const lastElement = useRef()

        // Intersection Observer API
        // https://developer.mozilla.org/ru/docs/Web/API/Intersection_Observer_API

        useObserver(lastElement, page < totalPages, isPostLoading, pagination, () => {
            setPage(page+1);
        })



    // Отработает если количество page изменилось
    useEffect(()=> {
        fetchPost(limit, page)
    }, [page, limit])



    // //для постов
    // const [posts, setPosts] = useState([
    //     {id: 1, title: 'Аватар картинка человека', body: 'a', externalLink: ''},
    //     {id: 2, title: 'php код', body: 'c', externalLink: ''},
    //     {id: 3, title: 'js код', body: 'b', externalLink: ''},
    //     {id: 4, title: 'Делегирование событий', body: 'Event.target', externalLink: 'https://learn.javascript.ru/event-delegation'},
    // ]);

    //для постов
    const [posts, setPosts] = useState([]);

    //Отображение добавления поста
    const [modal, setModal] = useState(false);



    /**
     * Функция удаления поста
     * @param post
     */
    const removePost = (post) => {
        //Получаем новый массив, который содержит все посты, кроме того, который должен быть удален.
        setPosts(posts.filter(p => p.id !== post.id))
    }

    /**
     * Функция изменения страницы
     * @param {number} page Номер страницы
     */
    const changePage = (page) => {
        setPage(page)
    }

    /**
     * Функция добавляет новый пост в конец массива
     * @param newPost
     */
    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false);
    }

    return (
        <div className="App">


            {/*<MyModal visible={sortBoxVisibility} setVisible={setSortBoxVisibility} classValue='sortBox'>*/}
            {/*    <div className={classess.my_modal_sort_box}>*/}
            {/*        <div>По популярности</div>*/}
            {/*        <div>По дате создания</div>*/}
            {/*        <div>По редактирования</div>*/}
            {/*    </div>*/}
            {/*</MyModal>*/}

            {/* MyModal - блок создания нового поста */}
            <MyModal visible={modal} setVisible={setModal} stopPropagation={true} classValue='createPost'>
                <div className="formPostForm">
                    <PostForm create = {createPost}/>
                </div>
            </MyModal>

            {/* Левый блок категорий */}
            <div className="sidebar-left">
                <div className="sidebar-content">
                    <div className="sidebar-content-title">
                        Категории
                        Ширина экрана: {window.screen.width} .
                        Ширина браузера:{window.outerWidth}
                    </div>
                </div>
            </div>

            {/* Центральный блок */}
            <div className="main-bar">
                <div className="main-content">
                    {/* MyModal - блок создания нового поста */}

                    {/*Блок поиска*/}
                    <Search posts={posts} setModal={setModal}/>

                        {/*Поиск + сортировка*/}
                        {/*<PostFilter*/}
                        {/*    filter={filter}*/}
                        {/*    setFilter={setFilter}*/}
                        {/*/>*/}


                        {/*Количество элементов на странице*/}
                        {/*<MySelect*/}
                        {/*    value={limit}*/}
                        {/*    onChange={value => setLimit(value)}*/}
                        {/*    defaultValue="количество элементов на странице"*/}
                        {/*    options={[*/}
                        {/*        {value: 5, name: '5'},*/}
                        {/*        {value: 10, name: '10'},*/}
                        {/*        {value: -1, name: 'Показать всё'},*/}
                        {/*    ]}*/}
                        {/*/>*/}

                    {/*навигационная цепочка + кнопка сортировки*/}
                    <div className="breadcrumbs_bar">
                        <div className="breadcrumbs">
                            <div className="icon-home"></div>
                            <div className="icon-arrow-right"></div>
                            <div className="breadcrumbs-item">Web</div>
                            <div className="icon-arrow-right"></div>
                            <div className="breadcrumbs-item">Frontend</div>
                            <div className="icon-arrow-right"></div>
                            <div className="breadcrumbs-item">CSS</div>
                        </div>

                        {/*Кнопка выбора сортировки (выпадающее меню)*/}
                        <DropdownMenu isOpenItemClick={isOpen} setisOpenItemClick={setIsOpen}>
                            <div className={DropdownMenuStyle.dropdown_item} onClick={()=> setIsOpen(true)}>По популярности</div>
                            <div className={DropdownMenuStyle.dropdown_item} onClick={()=> setIsOpen(true)}>По дате создания</div>
                            <div className={DropdownMenuStyle.dropdown_item} onClick={()=> setIsOpen(true)}>По дате редактирования</div>
                        </DropdownMenu>

                    </div>
                        <PostList remove = {removePost} posts={sortedAndSearchPosts} />
                        <div ref={lastElement}/>
                        {isPostLoading &&
                            <div style={{display:'flex', justifyContent:'center', marginTop: 50}}><Loader/></div>
                        }

                        <Pagination
                            page={page}
                            changePage={changePage}
                            totalPages={totalPages}
                        />
                </div>
            </div>

            {/* правый блок категорий */}
            <div className="sidebar-right">
                <div className="sidebar-content">
                    <div className="sidebar-content-title">
                        Настройки
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Posts;
