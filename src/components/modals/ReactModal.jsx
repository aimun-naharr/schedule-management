import { Button } from "bootstrap";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const ReactModal = (props) => {
  const { openModal, setOpenModal, title, body } = props;
  const toggle = () => {
    setOpenModal(false);
  };
  return (
    <div>
      <Modal isOpen={openModal} toggle={toggle}>
        {title && (
          <ModalHeader className="border-none" toggle={toggle}>
            {title}
          </ModalHeader>
        )}
        <div className="modal-body">{body}</div>
      </Modal>
    </div>
  );
};
export default ReactModal;
