import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useDate} from "../hooks/useDate";

/**
 * Один пост в пост листе
 * @param props
 * @returns {JSX.Element}
 *
 */
const PostItem = (props) => {
    const navigate = useNavigate()
    return (
        <div className="post">
            <div className="post__content">

                {/*Картинка + название + описание*/}
                <div className="post__content_description">


                    <div>
                        <Link className="link" to={`/posts/${props.post.id}`}>
                            <div className="post_title">{props.post.id}. {props.post.title}</div>
                        </Link>
                        <div className="post_body">
                            {props.post.content}
                        </div>
                    </div>

                    <div className="post__content_img">
                        <div className="post__content_img_text">Code</div>
                    </div>


                </div>

                {/*Внешняя ссылка*/}
                <div
                    style={{cursor: "pointer"}}
                    onClick={()=> {
                            window.open(props.post.externalLink)
                        }
                    }>
                    {props.post.externalLink}
                </div>

                {/*Линия + хэштег + последняя дата изменения(создания)*/}
                <div className="post__content_footer">
                    <div>#CSS #JavaScript #Code</div>
                    <div>{useDate(props.post.updated_at)}</div>
                </div>
            </div>
            {/*<MyButton onClick={() => navigate(`/posts/${props.post.id}`)}>*/}
            {/*    Открыть*/}
            {/*</MyButton>*/}

            {/*<MyButton onClick={() => props.remove(props.post)}>*/}
            {/*    Удалить*/}
            {/*</MyButton>*/}
        </div>
    );
};

export default PostItem;