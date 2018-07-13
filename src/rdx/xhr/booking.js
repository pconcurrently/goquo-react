import { $get } from './api';

const book_svc = process.env.BOOK_SVC;

export const getDaily = async (date, isSupplier) => {
    const uri = isSupplier ? `${book_svc}/booking/daily?type=supplier&date=${date}` : `${book_svc}/booking/daily?type=user&date=${date}`;
    const res = await $get(uri);

    return res;
}
export const getWeekly = async (week, isSupplier) => {
    const uri = isSupplier ? `${book_svc}/booking/weekly?type=supplier&week=${week}` : `${book_svc}/booking/weekly?type=user&week=${week}`;
    const res = await $get(uri);

    return res;
}
export const getMonthly = async (month, isSupplier) => {
    const uri = isSupplier ? `${book_svc}/booking/monthly?type=supplier&month=${month}` : `${book_svc}/booking/monthly?type=user&month=${month}`;
    const res = await $get(uri);

    return res;
}
export const getTotalBookings = async (by) => {
    const res = await $get(`${book_svc}/total-booking/${by}`);

    return res;
}
export const getLastBooking = async () => {
    const res = await $get(`${book_svc}/last-booking`);

    return res;
}