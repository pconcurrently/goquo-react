import * as React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import store from '../../rdx';
import { getDashboard } from '../../rdx/booking.rdx';

class Dashboard extends React.Component {
  constructor(state, props) {
    super(state, props);
  }

  componentWillMount() {
    store.dispatch(getDashboard());
  }

  render() {
    const { apiPending, daily, weekly, monthly } = this.props;

    const now = moment();
    const today = now.format('ddd, DD MMM, YYYY');
     const thisMonth = now.format('MMM, YYYY');
    const weekMonday = moment(now.startOf('isoWeek')); // Avoid object reference (to weekSunday)
    const weekSunday = now.add(7, 'days').startOf('week');
    const thisWeek = weekMonday.format('ddd, DD') + ' - ' + weekSunday.format('ddd, DD, YYYY');
    return (
      <div className={`${apiPending ? 'xloading' : ''} content-container`}>
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
                    <canvas id="chart-1" height="300"></canvas>
                  </div>
                  <div className="totalbookings__chart-container-2">
                    <canvas id="chart-2" height="300"></canvas>
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
                      <tr>
                        <td>DOTW </td>
                        <td>28 Jule 2017</td>
                      </tr>
                      <tr>
                        <td>DOTW2</td>
                        <td>26 Jule 2017</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="table-addons">
                    <div className="table-info">
                      <p>Showing 2 of 6 entries</p>
                    </div>
                    <div className="table-paging-indicators"><span className="prev inactive">Previous</span><span className="active">1</span><span>2</span><span>3</span><span className="next">Next</span></div>
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
  monthly: state.booking.monthly
})

export default connect(mapStateToProps)(Dashboard);
