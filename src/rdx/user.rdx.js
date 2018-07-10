import Cookie from 'js-cookie';
import * as userApi from './xhr/user';

/* Cookies constants */
export const C_USER = 'goquo_u';
export const C_TOKEN = 'goquo_u_auth';

const initialState = {
    isLoggedIn: false,
    errorMessage: '',
    user: '',
    token: '',
    loginPending: false,
    usersPagePending: true,
    suppliersPagePending: true,
    editUserPagePending: true,
    userSuppliers: [],
};

/* TYPES */
export const LOGIN = 'user/LOGIN';
export const GET_LOGGED_IN = 'user/GET_LOGGED_IN';
export const LOGOUT = 'user/LOGOUT';
export const GET_USERS = 'user/GET_USERS';
export const GET_SUPPLIERS = 'user/GET_SUPPLIERS';
export const GET_USER_SUPPLIERS = 'user/GET_USER_SUPPLIERS';
export const PENDING_LOGIN = 'user/PENDING_LOGIN';
export const PENDING_USERS_PAGE = 'user/PENDING_LOGIN';
export const PENDING_USER_EDIT_PAGE = 'user/PENDING_USER_EDIT_PAGE';


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

export const pendingLogin = () => {
    return async dispatch => {
        dispatch({
            type: PENDING_LOGIN
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

export const getUsersPage = () => {
    return async dispatch => {
        const res = await userApi.getUsers();

        dispatch({
            type: GET_USERS,
            users: res.success ? res.users : []
        })
    }
}

export const getSuppliersPage = () => {
    return async dispatch => {
        const res = await userApi.getSuppliers();

        dispatch({
            type: GET_SUPPLIERS,
            suppliers: res.success ? res.suppliers : []
        })
    }
}

export const getUserSuppliers = (id) => {
    return async dispatch => {
        const res = await userApi.getUserSuppliers(id);

        dispatch({
            type: GET_USER_SUPPLIERS,
            userSuppliers: res.success ? res.suppliers : []
        })
    }
}
export const pendingUserSuppliersPage = () => {
    return dispatch => {
        dispatch({
            type: PENDING_USER_EDIT_PAGE
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
                token: action.token,
                loginPending: false
            };
        case PENDING_LOGIN:
            return {
                ...state,
                loginPending: true
            };
        case LOGOUT:
            return {
                ...state,
                user: '',
                token: '',
                isLoggedIn: false
            };
        case GET_LOGGED_IN:
            return {
                ...state,
                user: action.user,
                token: action.token
            };  
        case GET_USERS: 
            return {
                ...state,
                users: action.users,
                usersPagePending: false
            };
        case GET_SUPPLIERS:
            return {
                ...state,
                suppliers: action.suppliers,
                suppliersPagePending: false
            };
        case GET_USER_SUPPLIERS:
            return {
                ...state,
                editUserPagePending: false,
                userSuppliers: action.userSuppliers
            };
        case PENDING_USER_EDIT_PAGE:
            return {
                ...state,
                editUserPagePending: true
            };
        default:
            return state;
    }
}
