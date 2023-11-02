// Функция которая возвращает количество страниц округленную в большую сторону
// где totalCount количество постов
// limit максимальное количество постов на странице

export const getPageCount = (totalCount, limit) => {
    return Math.ceil(totalCount / limit)
}

export const getPagesArray = (totalPages) => {
    let result = []
    for (let i = 0; i < totalPages; i++) {
        // Метод push() добавляет один или более элементов в конец массива и возвращает новую длину массива.
        result.push(i + 1);
    }
    return result;
}