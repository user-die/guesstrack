import React from "react";
import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="nav">
      <NavLink to="/">
        <p>К поиску</p>
      </NavLink>
      <NavLink to="/main">
        <p>На главную</p>
      </NavLink>
    </nav>
  );
}
