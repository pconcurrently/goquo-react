import { $get, $post } from './api';

const svc = process.env.SVC;

export const login = async (username, password) => {
    const res = await $post(`${svc}/login`, JSON.stringify({
        email: username,
        password
    }));

    return res;
}
export const getUsers = async () => {
    const res = await $get(`${svc}/users`);

    return res;
}
export const getSuppliers = async () => {
    const res = await $get(`${svc}/suppliers`);

    return res;
}
export const getUserSuppliers = async (id) => {
    const res = await $get(`${svc}/user-suppliers?user_id=${id}`);

    return res;
}