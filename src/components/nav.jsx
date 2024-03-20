import React from "react";
import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="nav">
      <NavLink to="/">
        <p>На главную</p>
      </NavLink>
      <NavLink to="/main">
        <p>К поиску</p>
      </NavLink>
    </nav>
  );
}
