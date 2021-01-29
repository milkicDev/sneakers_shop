import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";

import Header from "./components/Header";
import Checkout from "./components/Checkout";
import Home from "./components/Home";
import OrderHistory from "./components/OrderHistory";

axios.defaults.baseURL = "http://localhost:8000/api";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />

          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/checkout" component={Checkout} />
            <Route exact path="/order-history" component={OrderHistory} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
