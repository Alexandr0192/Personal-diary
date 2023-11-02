import React, {useLayoutEffect} from 'react';
import classess from './MyModal.module.css';

// props visible отвечает за то видно оконо или нет
//setVisible функция которая будет скрывать, если мы нажмем на темную область
/**
 * компонент, который отвечает за отображение блока (к примеру для добавления нового поста по нажатию кнопки)
 * @param children
 * @param visible
 * @param setVisible
 * @param stopPropagation - прекратить дальнейшую передачу текущего события или нет (по умолчанию false)
 * @returns {JSX.Element}
 * @constructor
 */
const MyModal = ({children, visible, setVisible, stopPropagation=false, classValue, ...props}) => {
    const rootClasses = [classess.myModal]

    if (visible && classValue === "createPost") {
        // Метод push() добавляет один или более элементов в конец массива и возвращает новую длину массива
        rootClasses.push(classess.active, classess.createPost);
    }

        if (stopPropagation) {
            return (
                <div className={rootClasses.join(' ')} onClick={()=>setVisible(false)}>
                    {/*onClick={(e)=>e.stopPropagation() Прекращает дальнейшую передачу текущего события. (чтобы при нажатии не закрывалось окно)*/}
                    <div className={classess.myModalContent} onClick={(e)=>e.stopPropagation()}>
                        {children}
                    </div>
                </div>
            );
        }
        else {
            return (
                <div className={rootClasses.join(' ')} onClick={()=>setVisible(false)}>
                    {/*onClick={(e)=>e.stopPropagation() Прекращает дальнейшую передачу текущего события. (чтобы при нажатии не закрывалось окно)*/}
                        {children}
                </div>
            );
        }

};

export default MyModal;