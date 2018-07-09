import fetch from 'isomorphic-fetch';

export const request = async function (uri, method, body) {
    const res = await fetch(uri, {
        method,
        headers: {
            'Content-Type': 'application/json'
        },
        body
    });
    const json = await res.json();

    if (!res.ok) {
        throw json;
    }
    return json;
};

export const $get = async (uri) => request(uri, 'GET');
export const $post = async (uri, body) => request(uri, 'POST', body);
export const $put = async (uri, body) => request(uri, 'PUT', body);
export const $delete = async (uri, body) => request(uri, 'DELETE', body);
