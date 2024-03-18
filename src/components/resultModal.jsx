import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { resetUserPoints } from "../store/slice";

export default function ResultModal() {
  const points = useSelector((state) => state.state.userPoints);
  const dispatch = useDispatch();
  return (
    <div>
      <p>Вы набрали {points} очков</p>
      <div className="buttons">
        <NavLink to="/" onClick={() => dispatch(resetUserPoints())}>
          К поиску
        </NavLink>
        <NavLink to="/artist" onClick={() => dispatch(resetUserPoints())}>
          Пройти снова
        </NavLink>
      </div>
    </div>
  );
}
