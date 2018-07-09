import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom'

import store from "./rdx";
import { getLoggedIn, isLoggedIn, logout } from "./rdx/user.rdx";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Suppliers from "./components/Suppliers";
import Users from "./components/Users";
import Login from "./components/Login";

class App extends Component {
  constructor(state, props) {
    super(state, props);
    this.state = {
    };

    this.onLogout = this.onLogout.bind(this);
  }

  componentWillMount() {
    store.dispatch(getLoggedIn());
  }

  onLogout() {
    store.dispatch(logout());
  }

  render() {
    const { isLoggedIn, user } = this.props;

    return (
      <div className="wrapper">
        {!isLoggedIn ? <Login /> : (
          <div>
            <Header user={user} onLogout={this.onLogout} />
            <Sidebar />
            <Switch>
              <Route path="/" exact component={Dashboard} />
              <Route path="/suppliers" component={Suppliers} />
              <Route path="/users" component={Users} />
            </Switch>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
    user: state.user.user,
    isLoggedIn: isLoggedIn(state)
});
export default App = connect(mapStateToProps)(App);

