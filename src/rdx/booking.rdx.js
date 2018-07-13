import moment from 'moment';
import * as bookingApi from './xhr/booking';

const initialState = {
    apiPending: true,
    daily: [],
    weekly: [],
    monthly: [],
    dailySupplier: [],
    weeklySupplier: [],
    monthlySupplier: [],
    userBooking: {labels: [], datasets: []},
    supplierBooking: {labels: [], datasets: []},
    lastBooking: [],
    dailySupplier: {labels: [], datasets: []},
    weeklySupplier: {labels: [], datasets: []},
    monthlySupplier: {labels: [], datasets: []},
    dailyUser: {labels: [], datasets: []},
    weeklyUser: {labels: [], datasets: []},
    monthlyUser: {labels: [], datasets: []},
};

/* TYPES */
const GET_DASHBOARD = 'booking/GET_DASHBOARD';

/* ACTIONS */
export const getDashboard = () => {
    let daily, dailySup, weekly, weeklySup, monthly, monthlySup, userBooking, supplierBooking, lastBooking;
    let dailyData, dailySupData, weeklyData, weeklySupData, monthlyData, monthlySupData, userBookingData, supplierBookingData, lastBookingData;

    const now = moment();

    const date = now.format('YYYY-MM-DD');
    const week = now.week();
    const month = now.format('YYYY-MM');
    return async (dispatch) => {
        
        await Promise.all([
            daily = await bookingApi.getDaily(date),
            weekly = await bookingApi.getWeekly(week),
            monthly = await bookingApi.getMonthly(month),
            dailySup = await bookingApi.getDaily(date, true),
            weeklySup = await bookingApi.getWeekly(week, true),
            monthlySup = await bookingApi.getMonthly(month, true),
            userBooking = await bookingApi.getTotalBookings('user'),
            supplierBooking = await bookingApi.getTotalBookings('supplier'),
            lastBooking = await bookingApi.getLastBooking()
        ]);

        // General stats
        dailyData = daily.success ? daily.data : [];
        weeklyData = weekly.success ? weekly.data : [];
        monthlyData = monthly.success ? monthly.data : [];
        dailySupData = dailySup.success ? dailySup.data : [];
        weeklySupData = weeklySup.success ? weeklySup.data : [];
        monthlySupData = monthlySup.success ? monthlySup.data : [];

        // Total bookings       
        userBookingData = userBooking.success ? userBooking.data : [];
        supplierBookingData = supplierBooking.success ? supplierBooking.data : [];

        const userData = createInitData('By User', userBookingData.length);
        const supplierData = createInitData('By Suppliers', supplierBookingData.length);

        userBookingData.forEach(booking => {
            userData.labels.push(booking.user_name);
            userData.datasets[0].data.push(booking.bookings);
        });
        supplierBookingData.forEach(booking => {
            supplierData.labels.push(booking.supplier_code);
            supplierData.datasets[0].data.push(booking.bookings);
        });
        // End total bookings

        // Daily, Weekly, Monthly Bookings by User and Supplier
        const dailyUserData = createInitData('Today Bookings By Users', dailyData.length);
        const weeklyUserData = createInitData('This Week Bookings By Users', dailyData.length);
        const monthlyUserData = createInitData('This Month Bookings By Users', monthlyData.length);
        const dailySupplierData = createInitData('Today Bookings By Suppliers', dailySupData.length);
        const weeklySupplierData = createInitData('This Week Bookings By Suppliers', weeklySupData.length);
        const monthlySupplierData = createInitData('This Month Bookings By Suppliers', monthlySupData.length);

        dailySupData.forEach(d => {
            dailySupplierData.labels.push(d.supplier_code);
            dailySupplierData.datasets[0].data.push(d.bookings);
        });
        weeklySupData.forEach(d => {
            weeklySupplierData.labels.push(d.supplier_code);
            weeklySupplierData.datasets[0].data.push(d.bookings);
        });
        monthlySupData.forEach(d => {
            monthlySupplierData.labels.push(d.supplier_code);
            monthlySupplierData.datasets[0].data.push(d.bookings);
        });
        dailyData.forEach(d => {
            dailyUserData.labels.push(d.user_name);
            dailyUserData.datasets[0].data.push(d.bookings);
        });
        weeklyData.forEach(d => {
            weeklyUserData.labels.push(d.user_name);
            weeklyUserData.datasets[0].data.push(d.bookings);
        });
        monthlyData.forEach(d => {
            monthlyUserData.labels.push(d.user_name);
            monthlyUserData.datasets[0].data.push(d.bookings);
        });
        // End Daily, Weekly, Monthly Bookings by User and Supplier

        // Last booking
        lastBookingData = lastBooking.success ? lastBooking.data : [];

        dispatch({
            type: GET_DASHBOARD,
            dailyData,
            weeklyData,
            monthlyData,
            dailySupplierData,
            weeklySupplierData,
            monthlySupplierData,
            dailyUserData,
            weeklyUserData,
            monthlyUserData,
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
                dailySupplier: action.dailySupplierData,
                weeklySupplier: action.weeklySupplierData,
                monthlySupplier: action.monthlySupplierData,
                dailyUser: action.dailyUserData,
                weeklyUser: action.weeklyUserData,
                monthlyUser: action.monthlyUserData,
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
const createInitData = (title, length) => {
    return {
        labels: [],
        datasets: [{
            label: title,
            data: [],
            backgroundColor: poolColors(length),
            borderWidth: 1
        }]
    };
}
