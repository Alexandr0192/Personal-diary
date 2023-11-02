/*
Преобразует дату и время из формата ISO 8601 в удобочитаемый формат
 */

/**
 * Выводит дату в формате соответсвующая локации
 * @param dateString дата и время в формате ISO 8601
 * @param locales ru-Ru, en-US
 */
export const useDate = (dateString) => {
    const now = new Date(); // создаем объект Date, который содержит текущую дату и время
    const datetimeNow = now.toISOString(); // получаем текущую дату со временем в формате ISO 8601
    const date = new Date(dateString);// получаем дату со временем редактирования(создания) в формате ISO 8601

    /*
    меньше минуты назад | <60000 мс
    1 минуту назад | 60000<=x<120000 мс
    2-4 минуты назад | 120000<=x<300000 мс
    5-20 минут назад | 300000<=x<1260000 мс
    21-59 минут назад | 1260000<=x<3600000 мс
    21 минуту назад
    22-24 минуты назад
    25-30 минут назад
    31 минуту назад
    32-34 минуты назад
    35-40 минут назад
    41 минуту назад
    42 минуты
    1, 21 час назад | 3600000<=x<7200000 мс    75600000<=x<79200000 мс
    2-4 часа назад | 7200000<=x<18000000 мс
    5-20 часов назад | 18000000<=x<75600000 мс
    22-23 часа назад | 79200000<=x<86400000 мс
    вчера в  | 86400000<=x<172800000 мс
     */
    let differenceGetTime = now.getTime()-date.getTime();
    let timeDifference;
    let locales = 'ru-Ru';
    if (differenceGetTime<60000) {
        timeDifference = 'меньше минуты назад'
    } else if (differenceGetTime>=60000 && differenceGetTime<120000) {
        timeDifference = '1 минуту назад'
    } else if (differenceGetTime>=120000 && differenceGetTime<300000) {
        timeDifference = Math.floor(differenceGetTime/60000)+' минуты назад';
    } else if (differenceGetTime>=300000 && differenceGetTime<1260000) {
        timeDifference = Math.floor(differenceGetTime/60000)+' минут назад';
    } else if (differenceGetTime>=1260000 && differenceGetTime<3600000) {
        const minutes = Math.floor(differenceGetTime/60000);
        if (minutes === 21 || minutes === 31 || minutes === 41) {
            timeDifference = `${minutes} минуту назад`;
        } else if (minutes >= 25 && minutes <= 30 || minutes >= 35 && minutes <= 40) {
            timeDifference = `${minutes} минут назад`;
        } else {
            timeDifference = `${minutes} минуты назад`;
        }
    } else if (differenceGetTime>=3600000 && differenceGetTime<7200000) {
        timeDifference = '1 час назад';
    } else if (differenceGetTime>=7200000 && differenceGetTime<18000000) {
        timeDifference = Math.floor(differenceGetTime/3600000)+' часа назад';
    } else if (differenceGetTime>=18000000 && differenceGetTime<75600000) {
        timeDifference = Math.floor(differenceGetTime/3600000)+' часов назад';
    } else if (differenceGetTime>=75600000 && differenceGetTime<79200000) {
        timeDifference = '21 час назад';
    } else if (differenceGetTime>=79200000 && differenceGetTime<86400000) {
        timeDifference = Math.floor(differenceGetTime/3600000)+' часа назад';
    } else if (differenceGetTime>=86400000 && differenceGetTime<172800000) {
        timeDifference = 'вчера в '+date.getHours()+':'+date.getMinutes();
    } else if (differenceGetTime>=172800000) {
        timeDifference = date.toLocaleDateString(locales);
    }
    // const options = {hour12: false, timeZone: 'UTC'}; // параметры форматирования, чтобы получить 24-часовой формат времени и использовать UTC
    // const formattedDate = date.toLocaleDateString(locales); // получение даты в формате mm/dd/yyyy
    // const formattedTime = date.toLocaleTimeString(locales, options); // получение времени в формате hh:mm:ss
    return timeDifference;
}

