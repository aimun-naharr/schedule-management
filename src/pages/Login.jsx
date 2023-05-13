import React, { useEffect, useState } from "react";
import { Alert, FormFeedback, Input, Label } from "reactstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { loginUser } from "../store/actions";
import { useDispatch, useSelector } from "react-redux";
import time from "../assets/bg.jpg";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { loading, errorMsg } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const token = JSON.parse(localStorage.getItem("user-token"));
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, []);
  // email validation

  const isMailIsValid = (email) => {
    if (
      email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      return true;
    } else {
      return false;
    }
  };
  // password validation
  const isPasswordValid = (pass) => {
    if (pass.length < 6) {
      return false;
    } else {
      return true;
    }
  };
  const schema = yup.object().shape({
    email:
      user.email?.length && isMailIsValid(user.email)
        ? yup.string()
        : yup.string().required("Email is not valid"),
    password:
      user.password.length && isPasswordValid(user.password)
        ? yup.string()
        : yup.string().required("Password must be at least 6 characters"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const onSubmit = (data) => {
    dispatch(loginUser(user, navigate));
  };
  return (
    <div className="d-flex gap-4 auth">
      <div>
        <img
          src={time}
          alt=""
          style={{ maxWidth: "60vw", height: "100%", objectFit: "cover" }}
        />
      </div>
      <div className="flex ">
        <div className="auth-container">
          <h5 className="">SCHEDULE</h5>
          <p>Let's login to manage it</p>
          {errorMsg && <Alert color="danger">{errorMsg}</Alert>}
          <div className="mb-2">
            <Label>Email</Label>
            <Input
              placeholder="you@email.com"
              onChange={(e) => handleOnChange(e)}
              name="email"
              value={user.email}
              invalid={errors.email ? true : false}
            />
            <FormFeedback>
              {!user.email.length ? "Required" : errors?.email?.message}
            </FormFeedback>
          </div>
          <div className="mb-4">
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="password"
              value={user.password}
              invalid={errors.password ? true : false}
              name="password"
              onChange={(e) => handleOnChange(e)}
            />
            <FormFeedback>
              {!user.email.length ? "Required" : errors?.password?.message}
            </FormFeedback>
          </div>
          {/* <p>
            New to Schedule? <Link to="/register">Register first</Link>
          </p> */}
          <button onClick={handleSubmit(onSubmit)} className="secondary-button">
            {loading ? "Please Wait..." : "LOGIN"}
          </button>
        </div>
      </div>
    </div>
  );
}
