import './style/App.css';
import React, {useEffect, useState} from "react";
import AppRouter from "./components/AppRouter";
import {AuthContext} from "./context";

function App() {

    const [sortedAndSearchPosts, setSortedAndSearchPosts] = useState([]);
    /**
     * Состояние авторизирован пользователь либо нет по умолчанию нет
     */
    const [isAuth, setIsAuth] = useState(false);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=> {

        /**
         * localStorage.getItem('auth') Считывать данные из localStorage
         * Если в локальной области есть данные, что пользователь авторизован, то маркет состояния isAuth = true
         */
        if (localStorage.getItem('auth')) {
            setIsAuth(true);
        }
        setIsLoading(false);
    }, [])

    return (
        <AuthContext.Provider value={{
            isAuth,
            setIsAuth,
            isLoading,
            sortedAndSearchPosts,
            setSortedAndSearchPosts
        }}>
            <AppRouter/>

        </AuthContext.Provider>
    )
}

export default App;
