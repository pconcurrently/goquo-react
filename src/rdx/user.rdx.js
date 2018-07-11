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
    editUserPending: {
        setMarkup: false,
        addSupplier: false,
        setSingleMarkup: false
    },
    supplierIds: []
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
export const PENDING_EDIT_USER_BUTTON = 'user/PENDING_EDIT_USER_BUTTON';
export const SET_MARKUP = 'user/SET_MARKUP';
export const SWITCH_SUPPLIER_STATUS = 'user/SWITCH_SUPPLIER_STATUS';
export const SWITCH_USER_SUPPLIER_STATUS = 'user/SWITCH_USER_SUPPLIER_STATUS';
export const ADD_USER_SUPPLIER = 'user/ADD_USER_SUPPLIER';
export const SET_SINGLE_MARKUP = 'user/SET_SINGLE_MARKUP';


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
        });
    }
}

export const pendingUserSuppliersPage = () => {
    return async dispatch => {
        dispatch({
            type: PENDING_USER_EDIT_PAGE
        })
    }
}

export const pendingEditUserButton = button => {
    return async dispatch => {
        dispatch({
            type: PENDING_EDIT_USER_BUTTON,
            button
        })
    }
}

export const submitMarkup = (markup, email) => {
    return async dispatch => {
        const res = await userApi.setMarkup(markup, email);

        if (res.success) {
            dispatch({
                type: SET_MARKUP,
                markup
            })
        }
    }
}

export const switchSupplierStatus = (supplier_code, active) => {
    return async dispatch => {
        const res = await userApi.supplierConfig(supplier_code, active);

        if (res.success) {
            dispatch({
                type: SWITCH_SUPPLIER_STATUS,
                code: supplier_code,
                status: active
            })
        }
    }
}
export const switchUserSupplierStatus = (supplier_code, active, user_email) => {
    return async dispatch => {
        const res = await userApi.supplierConfig(supplier_code, active, user_email);

        if (res.success) {
            dispatch({
                type: SWITCH_USER_SUPPLIER_STATUS,
                code: supplier_code,
                status: active
            })
        }
    }
}

export const addSupplierToUser = (supplier_id, user_id) => {
    return async dispatch => {
        const res = await userApi.addSupplier(supplier_id, user_id);

        if (res.success) {
            const newSuppliers = await userApi.getUserSuppliers(user_id);
            dispatch({
                type: ADD_USER_SUPPLIER,
                userSuppliers: newSuppliers.success ? newSuppliers.suppliers : [],
                supplier_id
            })
        }
    }
}

export const setSingleMarkup = (supplier_code, markup, user_email) => {
    return async dispatch => {
        const res = await userApi.setSingleMarkup(supplier_code, markup, user_email);

        if (res.success) {
            dispatch({
                type: SET_SINGLE_MARKUP,
                supplier_code,
                markup
            })
        }
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
            const supplierIds = action.userSuppliers.map(sup => sup.id)
            return {
                ...state,
                editUserPagePending: false,
                userSuppliers: action.userSuppliers,
                supplierIds
            };
        case ADD_USER_SUPPLIER:
            const newSupplierIds = state.supplierIds;
            newSupplierIds.push(parseInt(action.supplier_id));
            return {
                ...state,
                userSuppliers: action.userSuppliers,
                editUserPending: {
                    addSupplier: false
                },
                supplierIds: newSupplierIds
            };
        case PENDING_USER_EDIT_PAGE:
            return {
                ...state,
                editUserPagePending: true
            };
        case PENDING_EDIT_USER_BUTTON:
            return {
                ...state,
                editUserPending: {
                    [action.button]: true
                }
            };
        case SET_MARKUP:
            const userSuppliers = state.userSuppliers.map(sup => {
                sup.markup_percent = action.markup;

                return sup;
            });
            const editUserPending = state.editUserPending;
            editUserPending.setMarkup = false;
            return {
                ...state,
                userSuppliers,
                editUserPending
            };
        case SET_SINGLE_MARKUP:
            const singleUserSuppliers = state.userSuppliers.map(sup => {
                if (sup.code === action.supplier_code) {
                    sup.markup_percent = action.markup;
                }
                return sup;
            });
            const editUserPendingClone = state.editUserPending;
            editUserPendingClone.setSingleMarkup = false;
            return {
                ...state,
                userSuppliers: singleUserSuppliers,
                editUserPending: editUserPendingClone
            };
        case SWITCH_SUPPLIER_STATUS:
            const suppliers = state.suppliers.map(sup => {
                if (sup.code === action.code) {
                    sup.del_flag = action.status ? 0 : 1;
                }
                return sup;
            })
            return {
                ...state,
                suppliers
            };
        case SWITCH_USER_SUPPLIER_STATUS:
            const userSuppliers_2 = state.userSuppliers.map(sup => {
                if (sup.code === action.code) {
                    sup.inactive = !action.status;
                }
                return sup;
            })
            return {
                ...state,
                userSuppliers: userSuppliers_2
            };
        default:
            return state;
    }
}
