import React from 'react';
import PostItem from "./PostItem";
import {TransitionGroup, CSSTransition} from "react-transition-group";

/*
   PostList - Функциональный компонент который создает список постов. Он принимает массив постов и функцию удаления постов
   @param {array} posts - список постов
   @param {function} remove - функция удаляет пост из списка постов
   @return Список постов
 */
const PostList = ({posts, remove}) => {
    {/*Если массив posts не пустой, то отобразим посты иначе посты не найдены*/}
    if (!posts.length) {
        return (
        <h1 className="post">
            Посты не найдены
        </h1>
        )
    }
    return (
            <TransitionGroup>
                {posts.map((post, index) =>
                    <CSSTransition
                        key = {post.id}
                        timeout={500}
                        classNames="post"
                    >
                        <PostItem remove = {remove} number = {index+1} post = {post} key = {post.id}/>
                    </CSSTransition>
                )}
            </TransitionGroup>
    );
};

export default PostList;