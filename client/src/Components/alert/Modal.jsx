import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteVaccine } from "../../redux/actions/vaccineAction";
function ShowModal({ body, handleOpenModal, itemId, auth, functDelete }) {
  const dispatch = useDispatch();
  const handleClick = () => {
    handleOpenModal();
  };
  const handleOnClickDelete = () => {
    dispatch(functDelete(itemId, auth.access_token));
    handleClick();
  };
  return (
    <Modal.Dialog style={{ position: "fixed", top: "20%", right: "35%" }}>
      <Modal.Header closeButton>
        <Modal.Title>Thông báo</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Bạn có chắc chắn muốn xoá {body} này không ?</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClick}>
          Huỷ
        </Button>
        <Button variant="primary" onClick={() => handleOnClickDelete()}>
          Xác Nhận
        </Button>
      </Modal.Footer>
    </Modal.Dialog>
  );
}

export default ShowModal;
