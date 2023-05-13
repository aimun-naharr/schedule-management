import React, { useEffect, useState } from "react";
import { Input, Label } from "reactstrap";
import Drawer from "./Drawer";
import DropDownContainer from "../DropDownContainer";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { registerUser, updateUser } from "../../store/actions";
import { useDispatch } from "react-redux";

export default function EditUserDrawer(props) {
  const { openEditUserDrawer, setOpenEditUserDrawer, currentUser } = props;
  const [user, setUser] = useState(currentUser);
  useEffect(() => {
    setUser(currentUser);
  }, [currentUser]);

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
    name: user.name?.length ? yup.string() : yup.string().required(),

    email:
      user.email?.length && isMailIsValid(user.email)
        ? yup.string()
        : yup.string().required("Email is not valid"),
    role: user.role?.length ? yup.string() : yup.string().required(),
    isActive: user.isActive ? yup.boolean() : yup.boolean().required(),
  });

  const {
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

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
    dispatch(updateUser(user, user.id));
    setUser({
      name: "",
      email: "",
      role: "",
      isActive: "",
    });
    setOpenEditUserDrawer(false);
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
        isOpen={openEditUserDrawer}
        setIsOpen={setOpenEditUserDrawer}
        body={body}
        title="Edit User"
      />
    </div>
  );
}
