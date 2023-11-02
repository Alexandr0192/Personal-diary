import {useEffect, useRef} from "react";

/**
 *
 * @param ref
 * @param canLoad значение которое ограничивает вызов функции setPage(page+1)
 * @param isLoading
 * @param pagination
 * @param callback
 *
 */
export const useObserver = (ref, canLoad, isLoading, pagination, callback) => {
    // Intersection Observer API
    // https://developer.mozilla.org/ru/docs/Web/API/Intersection_Observer_API
    const observer = useRef();

    useEffect(() => {
        if (isLoading || pagination) return;
        if (observer.current) observer.current.disconnect();
        let cb = function (entries, observer) {
            /* Content excerpted, show below */
            if (entries[0].isIntersecting && canLoad) {
                callback()
            }

        };
        observer.current = new IntersectionObserver(cb);
        //указываем за каким элементом мы следим
        observer.current.observe(ref.current)
    }, [isLoading])
}