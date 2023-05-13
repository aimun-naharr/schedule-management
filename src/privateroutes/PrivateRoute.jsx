import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserData } from "../store/actions";

export const isAuth = () => {
  if (localStorage.getItem("user-token")) {
    return JSON.parse(localStorage.getItem("user-token"));
  } else {
    return false;
  }
};
export default function PrivateRoute({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, role } = useSelector((state) => state.user);

  useEffect(() => {
    if (!isAuth()) {
      navigate("/login");
    } else {
      dispatch(getUserData());
    }
  }, []);
  if (role.length) return children;
}
