import * as React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Bar as BarChart } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';
import store from '../../rdx';
import { getDashboard } from '../../rdx/booking.rdx';

class Dashboard extends React.Component {
  constructor(state, props) {
    super(state, props);
    this.state = {
      currentLastBookingPage: 1
    };

    this.switchPage = this.switchPage.bind(this);
  }

  componentWillMount() {
    store.dispatch(getDashboard());
  }

  switchPage(num) {
    if (num > 0 && num <= Math.ceil(this.props.lastBooking.length / 5)) {
      this.setState({
        currentLastBookingPage: num
      })
    }
  }

  render() {
    const {
      apiPending,
      daily,
      weekly,
      monthly,
      userBooking,
      supplierBooking,
      lastBooking,
      collapsed,
      dailySupplier,
      weeklySupplier,
      monthlySupplier,
      dailyUser,
      weeklyUser,
      monthlyUser,
    } = this.props;

    const chartGlobalOptions = { 
      responsive: true, 
      maintainAspectRatio: false, 
      height: 400, 
      scales: {
        xAxes: [{
          ticks: {
            autoSkip: false,
            minRotation: 40
          }
        }]
      },
      plugins: { 
        datalabels: { 
          display: true, 
          color: 'black', 
          anchor: 'top',
          align: 'top',
          font: {
            size: 10
          }
        }
      } 
    };

    const now = moment();
    const today = now.format('ddd, DD MMM, YYYY');
    const thisMonth = now.format('MMM, YYYY');
    const weekMonday = moment(now.startOf('isoWeek')); // Avoid object reference (to weekSunday)
    const weekSunday = now.add(7, 'days').startOf('week');
    const thisWeek = weekMonday.format('ddd, DD') + ' - ' + weekSunday.format('ddd, DD, YYYY');

    // Last booking
    const numberOfPages = Math.ceil(lastBooking.length / 5);
    let pageStart = (this.state.currentLastBookingPage - 1) * 5;
    const currentLastBooking = lastBooking.slice(pageStart, pageStart + 5); 
    const pageNumbers = [];
    for (let i = 1; i <= numberOfPages; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className={`${apiPending ? 'xloading' : ''} ${collapsed ? 'extend' : ''} content-container`}>
        <div className="block-content-wrapper">
            <div className="container">
              <section className="dashboard__section overall-stats">
                <div className="overall-stats__today-bookings">
                  <div className="heading">Today Bookings</div><small>{today}</small>
                  <h2>{daily.length}</h2>
                </div>
                <div className="overall-stats__this-week">
                  <div className="heading">This week</div><small>{thisWeek}</small>
                  <h2>{weekly.length}</h2>
                </div>
                <div className="overall-stats__this-month">
                  <div className="heading">This month</div><small>{thisMonth}</small>
                  <h2>{monthly.length}</h2>
                </div>
              </section>
              <section className="dashboard__section total-bookings">
                <div className="heading">Total Bookings</div><small>A bar chart for demonstrating bookings</small>
                <div className="totalbookings__chart-container">
                  <div className="totalbookings__chart-container-1">
                    <BarChart data={userBooking} options={chartGlobalOptions} height={400} />
                  </div>
                  <div className="totalbookings__chart-container-2">
                    <BarChart data={supplierBooking} options={chartGlobalOptions} height={400} />
                  </div>
                </div>
              </section>
              <section className="dashboard__section total-bookings">
                <div className="heading">Last Booking</div><small>Last booking by suppliers</small>
                <div className="section-container last-booking__table-container">
                  <table className="table--cross">
                    <thead>
                      <tr>
                        <th>Supplier Code </th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentLastBooking.map(booking => (
                        <tr key={booking.supplier_code}>
                          <td>{booking.supplier_code}</td>
                          <td>{booking.booking_date}</td>
                      </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="table-addons">
                    <div className="table-info">
                      <p>Showing {currentLastBooking.length} of {lastBooking.length} entries</p>
                    </div>
                    <div className="table-paging-indicators">
                      <span 
                        className={`prev ${this.state.currentLastBookingPage === 1 ? 'inactive' : ''}`}
                        onClick={() => this.switchPage(this.state.currentLastBookingPage - 1)}
                      >
                        Previous
                      </span>
                      {pageNumbers.map(num => (
                        <span 
                          className={`${num === this.state.currentLastBookingPage ? 'active' : ''}`}
                          onClick={() => this.switchPage(num)}
                          key={num}
                        >
                          {num}
                        </span>
                      ))}
                      <span 
                        className={`next ${this.state.currentLastBookingPage === numberOfPages ? 'inactive' : ''}`}
                        onClick={() => this.switchPage(this.state.currentLastBookingPage + 1)}
                      >
                        Next
                      </span></div>
                  </div>
                </div>
              </section>
              <section className="dashboard__section total-bookings">
                <div className="heading">Today Bookings</div><small>{today}</small>
                <div className="totalbookings__chart-container">
                  <div className="totalbookings__chart-container-1">
                    <BarChart data={dailySupplier} options={chartGlobalOptions} height={400} />
                  </div>
                  <div className="totalbookings__chart-container-2">
                    <BarChart data={dailyUser} options={chartGlobalOptions} height={400} />
                  </div>
                </div>
              </section>
              <section className="dashboard__section total-bookings">
                <div className="heading">This Week Bookings</div><small>{thisWeek}</small>
                <div className="totalbookings__chart-container">
                  <div className="totalbookings__chart-container-1">
                    <BarChart data={weeklySupplier} options={chartGlobalOptions} height={400} />
                  </div>
                  <div className="totalbookings__chart-container-2">
                    <BarChart data={weeklyUser} options={chartGlobalOptions} height={400} />
                  </div>
                </div>
              </section>
              <section className="dashboard__section total-bookings">
                <div className="heading">This Month Bookings</div><small>{thisMonth}</small>
                <div className="totalbookings__chart-container">
                  <div className="totalbookings__chart-container-1">
                    <BarChart data={monthlySupplier} options={chartGlobalOptions} height={400} />
                  </div>
                  <div className="totalbookings__chart-container-2">
                    <BarChart data={monthlyUser} options={chartGlobalOptions} height={400} />
                  </div>
                </div>
              </section>
          </div>
        </div>
        <div className={`loader-container ${apiPending ? 'xloading' : ''}`}>
          <div className="svg-loader"></div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  apiPending: state.booking.apiPending,
  daily: state.booking.daily,
  weekly: state.booking.weekly,
  monthly: state.booking.monthly,
  dailyUser: state.booking.dailyUser,
  weeklyUser: state.booking.weeklyUser,
  monthlyUser: state.booking.monthlyUser,
  dailySupplier: state.booking.dailySupplier,
  weeklySupplier: state.booking.weeklySupplier,
  monthlySupplier: state.booking.monthlySupplier,
  userBooking: state.booking.userBooking,
  supplierBooking: state.booking.supplierBooking,
  lastBooking: state.booking.lastBooking,
  collapsed: state.utils.sidebarCollapsed
})

export default connect(mapStateToProps)(Dashboard);
