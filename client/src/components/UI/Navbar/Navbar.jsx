import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import MyButton from "../button/MyButton";
import {AuthContext} from "../../../context";

const Navbar = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext);

    /**
     * Функция меняет маркет авторизации на false и
     * Удаляет с локальной области хранения
     */
    const logout =() => {
        setIsAuth(false);
        localStorage.removeItem('auth')
    }

    return (
        <div>
            <MyButton onClick = {logout}>
                Выйти
            </MyButton>
        <Link className="link" to = "/posts">
            Посты
        </Link>
        </div>
    );
};

export default Navbar;