import React from 'react';
import {Link} from "react-router-dom";

const Error404 = () => {
    return (
        <main style={{ padding: "1rem" }}>
            <p>Страница не найдена</p>
            <Link to="/">Вернутся на главную</Link>
        </main>
    );
};

export default Error404;