import { createStore, combineReducers, applyMiddleware, compose as reduxCompose } from "redux";
import thunk from 'redux-thunk';

import { userReducer } from './user.rdx';
import { bookingReducer } from './booking.rdx';

const compose = typeof window !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || reduxCompose : reduxCompose;

const rootReducer = combineReducers({
    user: userReducer,
    booking: bookingReducer
});

const store = createStore(
    rootReducer,
    compose(applyMiddleware(thunk))
);

export default store;
