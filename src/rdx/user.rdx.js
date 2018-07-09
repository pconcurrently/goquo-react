import Cookie from 'js-cookie';
import * as userApi from './xhr/user';

/* Cookies constants */
export const C_USER = 'goquo_u';
export const C_TOKEN = 'goquo_u_auth';

const initialState = {
    isLoggedIn: false,
    errorMessage: '',
    user: '',
    token: ''
};

/* TYPES */
export const LOGIN = 'user/LOGIN';
export const GET_LOGGED_IN = 'user/GET_LOGGED_IN';
export const LOGOUT = 'user/LOGOUT';


/* ACTIONS */
export const login = (username, password) => {
    return async (dispatch) => {
        const res = await userApi.login(username, password);
        if (res.success) {
            Cookie.set(C_USER, username, { expires: 7 });
            Cookie.set(C_TOKEN, res.data.auth_token, { expires: 7 });
        }

        dispatch({
            type: LOGIN,
            isLoggedIn: res.success,
            errorMessage: res.message,
            username,
            token: res.success ? res.data.auth_token : ''
        })
    }
}

export const logout = () => {
    return async (dispatch) => {
        Cookie.remove(C_USER);
        Cookie.remove(C_TOKEN);

        dispatch({
            type: LOGOUT
        })
    }
}

export const getLoggedIn = () => {
    return async (dispatch) => {
        const user = Cookie.get(C_USER);
        const token = Cookie.get(C_TOKEN);

        dispatch({
            type: GET_LOGGED_IN,
            user,
            token
        })
    }
}


/* SELECTORS */
export const token = Cookie.get(C_TOKEN);
export const isLoggedIn = state => (state.user && state.user.isLoggedIn) || (Cookie.get(C_USER) && Cookie.get(C_TOKEN));


/* REDUCER */
export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                isLoggedIn: action.isLoggedIn,
                errorMessage: action.errorMessage,
                user: action.username,
                token: action.token
            };
        case LOGOUT:
            return {
                ...state,
                user: '',
                token: ''
            };
        case GET_LOGGED_IN:
            return {
                ...state,
                user: action.user,
                token: action.token
            };  
        default:
            return state;
    }
}
