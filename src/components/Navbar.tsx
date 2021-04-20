import React from 'react';
import { NavLink } from 'react-router-dom';

export default () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <NavLink className="navbar-brand" to="/converter">
      Money
    </NavLink>
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink className="nav-link" to="/converter">
            Converter Page
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/currency">
            Currency Page
          </NavLink>
        </li>
      </ul>
    </div>
  </nav>
);
