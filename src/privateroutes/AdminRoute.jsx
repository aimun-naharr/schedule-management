import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserData } from "../store/actions/index";
import { GET_USER_DATA } from "../store/actionTypes";

export const isAuth = () => {
  if (localStorage.getItem("user-token")) {
    return JSON.parse(localStorage.getItem("user-token"));
  } else {
    return false;
  }
};

export default function AdminRoute({ children }) {
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
  if (role === "admin") return children;
}
