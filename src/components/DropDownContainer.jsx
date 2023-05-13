import React, { useState } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";

export default function DropDownContainer(props) {
  const { items, title, onChange, value, name, error } = props;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const handleValue = (e, value) => {
    const { name } = e.target;
    onChange({
      name,
      value,
    });
  };
  return (
    <Dropdown
      size="sm"
      className={`w-100  border rounded p-0 m-0 ${
        error ? "border border-danger" : ""
      }`}
      isOpen={dropdownOpen}
      toggle={toggle}
    >
      <DropdownToggle
        className="bg-transparent text-dark border-0 text-left w-100 d-flex justify-content-between align-items-center"
        caret
      >
        {value ? value : title}
      </DropdownToggle>
      <DropdownMenu>
        {items.map((item, i) => (
          <DropdownItem
            name={name}
            onClick={(e) => {
              handleValue(e, item);
            }}
            key={i}
          >
            {item}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
