import React, { useState } from "react";
import { FormFeedback, Input, Label } from "reactstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import time from "../assets/bg.jpg";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../store/actions";

export default function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
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
    name: user.name.length ? yup.string() : yup.string().required(),
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
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const onSubmit = () => {
    dispatch(registerUser(user));
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
          <div>
            <Label>Name</Label>
            <Input
              placeholder="Your Name"
              onChange={(e) => handleOnChange(e)}
              name="name"
              value={user.name}
              invalid={errors.name ? true : false}
            />
            <FormFeedback>
              {!user.email.length ? "Required" : errors?.name?.message}
            </FormFeedback>
          </div>
          <div>
            <Label>Email</Label>
            <Input
              placeholder="you@email.com"
              onChange={(e) => handleOnChange(e)}
              name="email"
              value={user.email}
              invalid={errors.email ? true : false}
            />
            <FormFeedback>{!user.email.length && "Required"}</FormFeedback>
          </div>
          <div className="mb-4">
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="password"
              value={user.password}
              name="password"
              onChange={(e) => handleOnChange(e)}
              invalid={errors.password ? true : false}
            />
            <FormFeedback>
              {!user.email.length ? "Required" : errors?.password?.message}
            </FormFeedback>
          </div>
          <p>
            Already registered? <Link to="/login">Please login</Link>
          </p>
          <button onClick={handleSubmit(onSubmit)} className="secondary-button">
            REGISTER
          </button>
        </div>
      </div>
    </div>
  );
}
