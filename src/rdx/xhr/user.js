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
export const setMarkup = async (markup, email) => {
    const res = await $post(`${svc}/set-markup`, JSON.stringify({
        user_email: email,
        markup
    }));

    return res;
}
export const setSingleMarkup = async (supplier_code, markup, user_email) => {
    const res = await $post(`${svc}/set-markup`, JSON.stringify({
        supplier_code,
        user_email,
        markup
    }));

    return res;
}
export const supplierConfig = async (supplier_code, active, user_email) => {
    const res = await $post(`${svc}/supplier-config`, JSON.stringify({
        supplier_code,
        active,
        user_email
    }));

    return res;
}
export const addSupplier = async (supplier_id, user_id,) => {
    const res = await $post(`${svc}/add-supplier`, JSON.stringify({
        supplier_id, user_id
    }));

    return res;
}