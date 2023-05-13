import React, { useState } from "react";
import { Button, Offcanvas, OffcanvasBody, OffcanvasHeader } from "reactstrap";

export default function Drawer(props) {
  const { isOpen, setIsOpen, title, body } = props;
  return (
    <div>
      {" "}
      <Offcanvas
        direction="end"
        isOpen={isOpen}
        toggle={() => setIsOpen((prev) => !prev)}
      >
        <OffcanvasHeader toggle={() => setIsOpen((prev) => !prev)}>
          {title}
        </OffcanvasHeader>
        <OffcanvasBody>{body}</OffcanvasBody>
      </Offcanvas>
    </div>
  );
}
