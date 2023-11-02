import React from 'react';
import {getPagesArray} from "../../../utils/pages";

/**
 * Пагинация страниц
 * @param {number} totalPages Количество странц
 * @param {number} page Номер текущей страницы
 * @param changePage
 * @returns {JSX.Element}
 * @constructor
 */

const Pagination = ({totalPages, page, changePage}) => {
    let pagesArray = getPagesArray(totalPages);
    return (
        <div className="page__wrapper">
            {/*где p количество странц*/}
            {pagesArray.map(p =>
                <span
                    onClick={() => changePage(p)}
                    key= {p}
                    className={page === p ? 'page page__current' : 'page'}
                >
                    {p}
                </span>
            )}
        </div>
    );
};

export default Pagination;