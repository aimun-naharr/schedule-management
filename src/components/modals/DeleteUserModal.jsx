import React from "react";
import { useDispatch } from "react-redux";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { deleteUser } from "../../store/actions";

export default function DeleteUserModal(props) {
  const { isOpen, setIsOpen, currentUser } = props;
  const dispatch = useDispatch();
  const toggle = () => {
    setIsOpen((prev) => !prev);
  };
  const handleDelete = () => {
    dispatch(deleteUser(currentUser.id));
    setIsOpen(false);
  };
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      {/* <ModalHeader toggle={toggle}>Delete User</ModalHeader> */}
      <ModalBody className="pb-4 pt-4">
        <h6 className="text-center mb-4">
          Are your sure you want to delete {currentUser.name}?
        </h6>
        <div className="d-flex justify-content-center gap-4">
          <Button onClick={handleDelete} color="danger">
            Confirm
          </Button>{" "}
          <Button
            color="secondary"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Cancel
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
}
