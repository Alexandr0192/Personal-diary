const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const {parse} = require("nodemon/lib/cli");
const {stringify} = require("nodemon/lib/utils");

//Определяем на каком порту будет работать сервер
const PORT = 5000;

//Настройки для подключения БД MySQL
const connection = mysql.createConnection({
    host     : 'localhost',
    port     : '3306',
    user     : 'root',
    password : 'ghbdtn1989',
    database : 'dom'
});

const app = express();
// разрешить доступ всем источникам к маршрутам /posts/*
app.use('/posts', cors());
app.use('/updatePost', cors());
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    next();
})

function startApp() {
    try {
        // Подключаемся к БД
        connection.connect((err) => {
            if (err) throw err;
            console.log('Connected!');
        });

        //Запуск сервера на заданном порту
        app.listen(PORT, () => {
            console.log('Server started on port ' + PORT);
        });
    } catch (e) {
        console.log(e);
    }
}

startApp();

//настройка маршрутов и запросов и ответов
app.get('/', (req, res) => {
    res.send('Hello World!');
    // res.status(200).json('Сервер работает')
});

app.get('/users', (req, res) => {
    connection.query('SELECT * FROM actor', (err, rows) => {
        if (err) throw err;
        res.status(200).json(rows);
    });
});

/*
    Этот маршрут используется для получения поста по его ID.
    ID передается в качестве параметра в URL-адресе,
    а затем используется в запросе для получения поста из базы данных.
    Затем он отправляет пост в формате JSON в качестве ответа.

    В данном коде создается маршрут (/posts/:id), где :id является параметром запроса.
    Внутри обработчика запроса получаем значение параметра id (const id = req.params.id)
    и выполняем запрос к базе данных, где выбираются посты с указанным id (SELECT * FROM posts WHERE id = ?).
    В качестве значения для параметра '?' подставляется значение переменной id, которая была получена из URL.
    Если выполнение запроса прошло успешно, то сервер отправляет ответ со статусом 200 и данными в формате JSON (res.status(200).json(rows)).
    Если произошла ошибка, сервер выбрасывает исключение и отправляет соответствующий ответ с ошибкой.
 */
app.get('/posts/:id', (req, res) => {
    const id = req.params.id;
    connection.query('SELECT * FROM posts WHERE id = ?', [id], (err, rows) => {
        if (err) throw err;
        res.status(200).json(rows[0]);
    });
});


/*
    Post запрос для обновления поста с определенным id
    в процессе написания
 */

app.post('/updatePost/:id', (req, res) => {
    //Определяем id поста
    const id = req.params.id;
    //вытаскиваем строку данных updatedData в JSON формате
    const dataJSON = req.body.updatedData;
    //Преобразуем данные из JSON в объект
    const data = JSON.parse(dataJSON);
    // Вытаскиваем из объекта нужные нам данные по отдельности
    const date = new Date(data.time);
    const updated_at = date.toISOString().slice(0, 19).replace('T', ' ');
    const content = JSON.stringify(data.blocks);
    const version  = data.version ;
    const title  = data.title ;
    console.log(updated_at);
    //проверяем существует ли нужный пост по id, если нет то выдаем ошибку
    connection.query('SELECT * FROM posts WHERE id = ?', [id], (err, rows) => {
        if (err) throw err;
        if (rows.length === 0) {
            res.status(404).json({ error: 'Post not found' });
        } else {
            connection.query('UPDATE posts SET title = ?, content = ?, updated_at = ?, version = ? WHERE id = ?', [title, content, updated_at, version, id], (err, result) => {
            if (err) throw err;
            res.status(200).json({ success: true });
            });
        }
    });
});

/*
    Отобразим все посты (а если их будет 3453453453 шт надо будет подумать)
 */
app.get('/posts', (req, res) => {
    //const id = req.params.id;
    connection.query('SELECT * FROM posts', (err, rows) => {
        if (err) throw err;
        res.status(200).json(rows);
    });
});

