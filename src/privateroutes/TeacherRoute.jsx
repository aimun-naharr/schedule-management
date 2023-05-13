import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isAuth } from "./AdminRoute";
import { getUserData } from "../store/actions";

export default function TeacherRoute({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, role } = useSelector((state) => state.user);
  useEffect(() => {
    if (!isAuth()) {
      navigate("/login");
    } else if (isAuth()) {
      dispatch(getUserData());
    }
  }, []);
  if (role === "teacher"|| role==='admin') return children;
}
