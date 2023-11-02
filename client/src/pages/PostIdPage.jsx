/*
    Страница одного поста с определенным id
*/
import Blocks from 'editorjs-blocks-react-renderer';
import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";
import Loader from "../components/UI/Loader/Loader";
import MyModal from "../components/UI/MyModal/MyModal";
import PostForm from "../components/PostForm";
import MyButton from "../components/UI/button/MyButton";
import Search from "../components/UI/search/Search";

const PostIdPage = () => {

    //Отображение добавления поста
    const [modal, setModal] = useState(false);
    //для постов
    const [posts, setPosts] = useState([]);

    /**
     * Функция добавляет новый пост в конец массива
     * @param newPost
     */
    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false);
    }


    /**
     * Узнаем id поста с помощью useParams
     * useParams()  является хуком, предоставляемым React Router, который позволяет получить параметры из URL.
     * @type {}
     */
    const params = useParams()

    /**
     * Состояние поста
     */
    const [post, setPost] = useState('');

    /**
     * Состояние комментариев
     * В данном проект не будем использовать комментарии, но оставим заготовку
     */
    const [comments, setComments] = useState([]);

    /**
     * Получаем данные поста
     */
    const [fetchPostById, isLoading, error] = useFetching(async (id) => {
        const response = await PostService.getById(id);
        // получаем дату со временем редактирования(создания) в формате ISO 8601
        const time = +new Date(response.data.updated_at);
        const blocks = JSON.parse(response.data.content);
        const version = response.data.version;
        const title = response.data.title;
        const data = {}
        data.title = title;
        data.time = time;
        data.blocks = blocks;
        data.version = version;
        //Помещаем полученные данные в пост
        setPost(data);
    })

    /**
     * Получаем данные комментарий для заданного поста
     * В данном проект не будем использовать комментарии, но оставим заготовку
     */
    const [fetchComments, isComLoading, comError] = useFetching(async (id) => {
        const response = await PostService.getCommentsByPostId(id)
        //Помещаем полученные данные в пост
        setComments(response.data);
    })

    /**
     * Вызываем вызов функции fetchPostById(params.id) для получения данных о посте
     * В данном проекте не будем использовать комментарии, но оставим заготовку fetchComments(params.id)
     * */
    useEffect(() => {
        fetchPostById(params.id)
        //fetchComments(params.id)
    }, [])

    return (
        <div className="App">

            {/* MyModal - блок создания нового поста */}
            <MyModal visible={modal} setVisible={setModal} stopPropagation={true} classValue='createPost'>
                <div className="formPostForm">
                    <PostForm create={createPost}/>
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
                    </div>

                    {isLoading
                        ? <Loader/>
                        : <div>
                            <h2>{post.title}</h2>
                            <div>
                                {post.blocks !== null && typeof post.blocks !== 'undefined'
                                   ? <Blocks data={post} />
                                   : <Loader/>
                                }
                            </div>
                            <div>{post.content}</div>
                            <Link className="link" to={`/postsEditor/${params.id}`}>
                                <MyButton>
                                    Редактировать
                                </MyButton>
                            </Link>

                        </div>
                    }

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

            {/*В данном проекте не будем использовать комментарии, но оставим заготовку*/}
            {/*<h1>Комментарии</h1>*/}
            {/*{isLoading*/}
            {/*    ? <Loader/>*/}
            {/*    : <div>*/}
            {/*        {comments.map( comm =>*/}
            {/*            <div key={comm.id} style={{marginTop: 15}}>*/}
            {/*                <h3>{comm.name}</h3>*/}
            {/*                <h3>{comm.email}</h3>*/}
            {/*                <div>{comm.body}</div>*/}
            {/*            </div>*/}
            {/*        )}*/}

            {/*    </div>*/}
            {/*}*/}
        </div>
    );
};

export default PostIdPage;