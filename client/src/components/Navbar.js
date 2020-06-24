import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../App.css";

class Navbar extends Component {
  render() {
    return (
      <div>
        <header className="navbar App-header" id="nav-container">
          <div className="col-4">
            {
              <section className="navbar-section">
                <Link to="/" className="btn btn-link text-secondary">
                  <span className="text-secondary">INVENTORY</span>
                </Link>
                <Link to="/billing" className="btn btn-link text-secondary">
                  <span className="text-secondary">BILLING</span>
                </Link>
              </section>
            }
          </div>
        </header>
      </div>
    );
  }
}

export default Navbar;
