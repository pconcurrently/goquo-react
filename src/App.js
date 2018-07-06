import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom'

import store from "./rdx/index";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Suppliers from "./components/Suppliers";
import Users from "./components/Users";

class App extends Component {
  constructor(state, props) {
    super(state, props);
    this.state = {
      bShow: false
    };
  }

  render() {
    return (
      <div className="wrapper">
        <Header />
        <Sidebar />
        <div className="content-container">
          <div className="block-content-wrapper">
            <Switch>
              <Route path="/" exact component={Users} />
              <Route path="/suppliers" component={Suppliers} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
  };
};
export default App = connect(mapStateToProps)(App);

