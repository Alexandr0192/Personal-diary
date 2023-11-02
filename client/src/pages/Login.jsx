import React, {useContext} from 'react';
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton";
import {AuthContext} from "../context";

const Login = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext);

    /**
     * Функция меняет состояние isAuth на true (Пользователь авторизирован)
     * @param event
     */
    const login = event => {
        // чтобы страница не обновлялась
        event.preventDefault();
        setIsAuth(true);

        /**
         * Добавляет даннные к локальному объекту
         * Используется для авторизации пользователя (чтобы его запомнить)
         */
        localStorage.setItem('auth', 'true');
    }

    return (
        <div>
            <form onSubmit={login}>
                <MyInput type="text" placeholder="Введите логин"/>
                <MyInput type="password" placeholder="Введите пароль"/>
                <MyButton>
                    Войти
                </MyButton>
            </form>
        </div>
    );
};

export default Login;