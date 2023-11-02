/*
* PostService.js - это сервис, отвечающий за управление постами или сообщениями в контексте
* данного проекта или приложения. Он может содержать методы для создания, чтения,
* обновления и удаления постов, а также для получения комментариев к постам, лайков,
* репостов и других связанных операций. PostService обычно используется для взаимодействия
* с базой данных или другими сервисами для обработки операций, связанных с постами.*
*/

import axios from "axios";

// URL сервера
let URL2 = 'https://jsonplaceholder.typicode.com/';
// let URL = 'https://jsonplaceholder.typicode.com/';
let URL = 'http://localhost:5000/';


export default class PostService {

    //метод возвращает список постов
    // Асинхронная функция для получения данных
    // Используется библиотека axios
    // axios.get('https://jsonplaceholder.typicode.com/posts') get запрос к серверу
    /**
     * метод возвращает список постов axios.get('https://jsonplaceholder.typicode.com/posts') get запрос к серверу
     * @param limit максимальное количество постов на странице
     * @param page номер страницы
     * @returns {Promise<AxiosResponse<any>>} Список постов
     */
    static async getAll(limit = 10, page = 1) {
        const response = await axios.get(URL + 'posts', {
            params: {
                _limit: limit,
                _page: page
            }
        })
        return response;
    }

    /**
     * Метод получает даннные поста по заданному id с сервера
     * @param id {number} id поста
     * @returns {Promise<AxiosResponse<any>>} Возвращает данные поста
     */
    static async getById(id) {
        const response = await axios.get(URL + 'posts/' + id)
        return response;
    }

    static async updatePostDataById(postId, updatedData) {
        try {
            const response = await axios.post(URL + 'updatePost/' + postId, {updatedData});
            return response.data;
        } catch (error) {
            console.error('Failed to update post data:', error);
            throw error;
        }
    }

    static async getCommentsByPostId(id) {
        const response = await axios.get(URL2 + `posts/${id}/comments`)
        return response;
    }

}