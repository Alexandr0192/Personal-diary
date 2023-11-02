import React, {useState} from 'react';
import Editor from "../components/UI/Editor/editor";
import Search from "../components/UI/search/Search";
import Loader from "../components/UI/Loader/Loader";


const PageEditor = () => {

    //для постов
    const [posts, setPosts] = useState([]);

    //Отображение добавления поста
    const [modal, setModal] = useState(false);

    return (<div className="App">
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
                    <Editor/>
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
        </div>)
}

export default PageEditor;