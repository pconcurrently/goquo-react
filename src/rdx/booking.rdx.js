import moment from 'moment';
import * as bookingApi from './xhr/booking';

const initialState = {
    apiPending: true,
    daily: [],
    weekly: [],
    monthly: []
};

/* TYPES */
const GET_DASHBOARD = 'booking/GET_DASHBOARD';

/* ACTIONS */
export const getDashboard = () => {
    let daily, weekly, monthly;
    let dailyData, weeklyData, monthlyData;

    const now = moment();

    const date = now.format('YYYY-MM-DD');
    const week = now.week();
    const month = now.format('YYYY-MM');
    return async (dispatch) => {
        await Promise.all([
            daily = await bookingApi.getDaily(date),
            weekly = await bookingApi.getWeekly(week),
            monthly = await bookingApi.getMonthly(month)
        ]);
        
        dailyData = daily.success ? daily.data : [];
        weeklyData = weekly.success ? weekly.data : [];
        monthlyData = monthly.success ? monthly.data : [];

        dispatch({
            type: GET_DASHBOARD,
            dailyData,
            weeklyData,
            monthlyData
        })
    }
}


/* SELECTORS */


/* REDUCER */
export const bookingReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DASHBOARD:
            return {
                ...state,
                apiPending: false,
                daily: action.dailyData,
                weekly: action.weeklyData,
                monthly: action.monthlyData
            }
        default:
            return state;
    }
}
