import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";

import Inventory from "./components/Inventory";
import Navbar from "./components/Navbar";
import Billing from "./components/Billing";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Route exact path="/" render={() => <Inventory />} />
        <Route path="/billing" render={() => <Billing />} />
      </Router>
    </div>
  );
}

export default App;
