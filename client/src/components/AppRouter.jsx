import React, {useContext} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {privateRoutes, publicRoutes} from "../router";
import {AuthContext} from "../context";
import Navbar from "./UI/Navbar/Navbar";
import Loader from "./UI/Loader/Loader";


/**
 * Маршруты приложения
 * @returns {JSX.Element}
 *
 */
const AppRouter = () => {
    /**
     * Контекст позволяет передавать данные через дерево компонентов без необходимости передавать пропсы на промежуточных уровнях
     * в данном случаем получаем данные из контекста
     * isLoading - прогружается ли страница (true =да, false = нет)
     * isAuth - Флаг авторизации (true = да, false = нет)
     * @type {boolean}
     */
    const {isAuth, isLoading} = useContext(AuthContext);

    /**
     * Если страница прогружается (isLoading = true), то крутим иконку загрузки
     */
    if (isLoading) {
        return <Loader/>
    }
    return (
        /** Если пользователь авторизован, то подгружаем Маршруты страниц авторизированных пользователей
         *  Иначе подгружаем Маршруты страниц не авторизированных пользователей
         */
        isAuth
            ?
            <BrowserRouter>
                <Navbar/>
                <Routes>
                    {
                        privateRoutes.map(route =>
                            <Route
                                key={route.toString()}
                                path={route.path}
                                element={route.element}
                            />
                        )
                    }
                    {/**
                     *Примеры
                     *<Route path="/about" element={<About/>}/>
                     *<Route path="/posts" element={<Posts/>}/>
                     *<Route path="/posts/:id" element={<PostIdPage/>}/>
                     *<Route path="/" element={<Posts/>}/>
                     *<Route
                     *    path="*"
                     *    element={*
                     *        <main style={{ padding: "1rem" }}>
                     *            <p>Страница не найдена</p>
                     *            <Link to="/">Вернутся на главную</Link>*
                     *        </main>
                     *    }
                     />
                     */}
                </Routes>
            </BrowserRouter>
            :
            <BrowserRouter>
                <Routes>
                    {
                        // Метод map() создаёт новый массив
                        publicRoutes.map(route =>
                            <Route
                                key={route.toString()}
                                path={route.path}
                                element={route.element}
                            />
                        )
                    }
                </Routes>
            </BrowserRouter>
    );
};

export default AppRouter;