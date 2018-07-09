import { $post } from './api';

const svc = process.env.SVC;

export const login = async (username, password) => {
    const res = await $post(`${svc}/login`, JSON.stringify({
        username,
        password
    }));

    return res;
}
