import React, {useState} from 'react';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";

/**
 *
 * @param create
 * @returns {JSX.Element}
 * @constructor
 */
const PostForm = ({create}) => {

    const [post, setPost] = useState({title:'', content: ''})

    //Создаем новые данные поста
    const addNewPost = (e) => {
        const newPost = {
            ...post, id: Date.now()
        }
        create(newPost)
        setPost({title:'', content:''})
        //предотвращает дефолтное поведение бразуера (не перезагружает страницу при нажатии кнопки)
        e.preventDefault()
    }

    return (
        <form className="form">
            {/*Управляемый компонент*/}
            <MyInput
                value = {post.title}
                // отслеживает что пользователь вводит
                onChange={ e=> setPost ({...post, title: e.target.value})}
                type="text"
                placeholder="Название поста"
            />
            <MyInput
                value = {post.content}
                onChange={ e=> setPost ({...post, content: e.target.value})}
                type="text"
                placeholder="Описание поста"
            />


            <MyButton onClick={addNewPost}>Создать пост</MyButton>
        </form>
    );
};

export default PostForm;