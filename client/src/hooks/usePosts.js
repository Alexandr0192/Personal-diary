import {useMemo} from 'react';

//posts - посты , а sort - метод сортировки
export const useSortedPosts = (posts, sort) => {

    //sortedPost возвращает отсортированные посты
    //localeCompare - функция используется для сравнения строк
    const sortedPosts = useMemo(() => {
        if (sort) {
            return [...posts].sort((a, b) => a[sort].localeCompare(b[sort]))
        }
        return posts;
    }, [sort, posts])

    return sortedPosts;
}

//usePosts - возвращает отфильтрованнные и отсортированные посты (по названию(title) поста)
//posts - посты, sort - метод сортировки, query - поисковая строка
export const usePosts = (posts, sort, query) => {
    const sortedPosts = useSortedPosts(posts, sort);
    // Функция отображает посты сортировки и поиска
    //Метод filter() создаёт новый массив со всеми элементами, прошедшими проверку, задаваемую в передаваемой функции.
    //Метод toLowerCase() возвращает значение строки, на которой он был вызван, преобразованное в нижний регистр.
    //Метод includes() определяет, содержит ли массив определённый элемент, возвращая в зависимости от этого true или false.
    const sortedAndSearchPosts = useMemo(() => {
        return sortedPosts.filter(posts => posts.title.toLowerCase().includes(query.toLowerCase()))
    }, [query, sortedPosts])

    return sortedAndSearchPosts;
}