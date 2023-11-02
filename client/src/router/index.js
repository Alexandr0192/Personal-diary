import Posts from "../pages/Posts";
import PostIdPage from "../pages/PostIdPage";
import About from "../pages/About";
import Error404 from "../pages/Error404";
import Login from "../pages/Login";
import PageEditor from "../pages/PageEditor";

/**
 *
 * Маршруты страниц не авторизированных пользователей
 */
export const publicRoutes = [
    {path: '/test', element: <About/>},
    {path: '/', element: <Posts/>},
    {path: '*', element: <Error404/>},
    {path: '/login', element: <Login/>},
]

/**
 *
 * Маршруты страниц авторизированных пользователей
 */
export const privateRoutes = [
    {path: '/test', element: <About/>},
    {path: '/posts', element: <Posts/>},
    {path: '/posts/:id', element: <PostIdPage/>},
    {path: '/postsEditor/:id', element: <PageEditor/>},
    {path: '/', element: <Posts/>},
    {path: '*', element: <Error404/>},
]