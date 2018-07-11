const initialState = {
    sidebarCollapsed: false
};

/* TYPES */
const COLLAPSE_SIDEBAR = 'utils/COLLAPSE_SIDEBAR';

/* ACTIONS */
export const collapseSidebar = () => {
    return dispatch => {
        dispatch({
            type: COLLAPSE_SIDEBAR
        });
    };
}

/* SELECTORS */


/* REDUCER */
export const ultilsReducer = (state = initialState, action) => {
    switch (action.type) {
        case COLLAPSE_SIDEBAR:
            return {
                ...state,
                sidebarCollapsed: !state.sidebarCollapsed
            };
        default:
            return state;
    }
}
