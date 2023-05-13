import React, { useState } from "react";
import { Input, Label } from "reactstrap";
import Drawer from "./Drawer";
import DropDownContainer from "../DropDownContainer";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { registerUser } from "../../store/actions";
import { useDispatch } from "react-redux";

export default function AddUserDrawer(props) {
  const { openAddUserDrawer, setOpenAddUserDrawer } = props;
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
    isActive: "",
    password: "",
  });
  const isPasswordValid = (pass) => {
    if (pass.length < 6) {
      return false;
    } else {
      return true;
    }
  };
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
  const schema = yup.object().shape({
    name: user.name.length ? yup.string() : yup.string().required(),

    email:
      user.email?.length && isMailIsValid(user.email)
        ? yup.string()
        : yup.string().required("Email is not valid"),
    role: user.role.length ? yup.string() : yup.string().required(),
    isActive: user.isActive ? yup.boolean() : yup.boolean().required(),
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
  console.log(errors);

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const handleDropDownChange = (e) => {
    const { name, value } = e;
    if (name === "isActive") {
      if (value === "active") {
        setUser({ ...user, [name]: true });
      } else {
        setUser({ ...user, [name]: false });
      }
    } else {
      setUser({
        ...user,
        [name]: value,
      });
    }
  };
  const dispatch = useDispatch();
  const onSubmit = () => {
    dispatch(registerUser(user));
    setUser({
      name: "",
      email: "",
      role: "",
      isActive: "",
      password: "",
    });
  };
  const body = (
    <div>
      <div>
        <Label size="sm">Name</Label>
        <Input
          bsSize="sm"
          placeholder="Your name"
          name="name"
          onChange={(e) => handleOnchange(e)}
          value={user.name}
          invalid={errors?.name?.message?.length ? true : false}
        />
      </div>
      <div>
        <Label size="sm">Email</Label>
        <Input
          invalid={errors?.email?.message?.length ? true : false}
          bsSize="sm"
          placeholder="you@email.com"
          type="email"
          name="email"
          onChange={(e) => handleOnchange(e)}
          value={user.email}
        />
      </div>
      <div>
        <Label size="sm">Password</Label>
        <Input
          invalid={errors?.password?.message?.length ? true : false}
          bsSize="sm"
          placeholder="password"
          type="password"
          name="password"
          onChange={(e) => handleOnchange(e)}
          value={user.password}
        />
      </div>
      <div>
        <Label size="sm">Role</Label>
        <DropDownContainer
          name="role"
          items={["admin", "teacher"]}
          title="Role"
          onChange={handleDropDownChange}
          value={user.role}
          error={errors?.role?.message?.length ? true : false}
        />
      </div>
      <div className="mb-4">
        <Label size="sm">Active status</Label>
        <DropDownContainer
          error={errors?.isActive?.message?.length ? true : false}
          name="isActive"
          items={["active", "inactive"]}
          title="Status"
          onChange={handleDropDownChange}
          value={user.isActive ? "active" : "inactive"}
        />
      </div>
      <button onClick={handleSubmit(onSubmit)} className="primary-button">
        Save
      </button>
    </div>
  );

  return (
    <div>
      <Drawer
        isOpen={openAddUserDrawer}
        setIsOpen={setOpenAddUserDrawer}
        body={body}
        title="Add User"
      />
    </div>
  );
}
