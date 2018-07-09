import { $get } from './api';

const book_svc = process.env.BOOK_SVC;

export const getDaily = async (date) => {
    const res = await $get(`${book_svc}/booking/daily?type=user&date=${date}`);

    return res;
}
export const getWeekly = async (week) => {
    const res = await $get(`${book_svc}/booking/weekly?type=user&week=${week}`);

    return res;
}
export const getMonthly = async (month) => {
    const res = await $get(`${book_svc}/booking/monthly?type=user&month=${month}`);

    return res;
}
