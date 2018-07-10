import moment from 'moment';
import * as bookingApi from './xhr/booking';

const initialState = {
    apiPending: true,
    daily: [],
    weekly: [],
    monthly: [],
    userBooking: {labels: [], datasets: []},
    supplierBooking: {labels: [], datasets: []},
    lastBooking: []
};

/* TYPES */
const GET_DASHBOARD = 'booking/GET_DASHBOARD';

/* ACTIONS */
export const getDashboard = () => {
    let daily, weekly, monthly, userBooking, supplierBooking, lastBooking;
    let dailyData, weeklyData, monthlyData, userBookingData, supplierBookingData, lastBookingData;

    const now = moment();

    const date = now.format('YYYY-MM-DD');
    const week = now.week();
    const month = now.format('YYYY-MM');
    return async (dispatch) => {
        
        await Promise.all([
            daily = await bookingApi.getDaily(date),
            weekly = await bookingApi.getWeekly(week),
            monthly = await bookingApi.getMonthly(month),
            userBooking = await bookingApi.getTotalBookings('user'),
            supplierBooking = await bookingApi.getTotalBookings('supplier'),
            lastBooking = await bookingApi.getLastBooking()
        ]);

        // General stats
        dailyData = daily.success ? daily.data : [];
        weeklyData = weekly.success ? weekly.data : [];
        monthlyData = monthly.success ? monthly.data : [];

        // Total bookings       
        userBookingData = userBooking.success ? userBooking.data : [];
        supplierBookingData = supplierBooking.success ? supplierBooking.data : [];
        const userData = { labels: [], datasets: [{
            label: 'By Users',
            data: [],
            backgroundColor: poolColors(userBookingData.length),
            borderWidth: 1
        }]};

        const supplierData = { labels: [], datasets: [{
            label: 'By Suppliers',
            data: [],
            backgroundColor: poolColors(supplierBookingData.length),
            borderWidth: 1
        }]};
        userBookingData.forEach(booking => {
            userData.labels.push(booking.user_name);
            userData.datasets[0].data.push(booking.bookings);
        });
        supplierBookingData.forEach(booking => {
            supplierData.labels.push(booking.supplier_code);
            supplierData.datasets[0].data.push(booking.bookings);
        });
        // End total bookings

        // Last booking
        lastBookingData = lastBooking.success ? lastBooking.data : [];

        dispatch({
            type: GET_DASHBOARD,
            dailyData,
            weeklyData,
            monthlyData,
            userData,
            supplierData,
            lastBookingData
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
                monthly: action.monthlyData,
                userBooking: action.userData,
                supplierBooking: action.supplierData,
                lastBooking: action.lastBookingData
            }
        default:
            return state;
    }
}

// Utilities
const dynamicColors = () => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ", 0.4)";
}
const poolColors = (a)=>  {
    const pool = [];
    for (let i = 0; i < a; i++) {
        pool.push(dynamicColors());
    }
    return pool;
}
