import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalLookUp from "./ModalLookUp";
import Modal from "../alert/Modal";
import {
  DeleteInjectionRegister,
  GetInjectionRegister,
} from "../../redux/actions/injectionRegisterAction";
function LookUp() {
  const dispatch = useDispatch();
  const { injectionRegister, auth } = useSelector((state) => state);
  const [showModal, setShowModal] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const [itemId, setItemId] = useState("");
  useEffect(() => {
    dispatch(GetInjectionRegister(auth.access_token));
  }, []);
  const handleOnchange = () => {
    setShowModal(true);
  };

  const handleOpenModal = (itemId) => {
    // setAction("");
    setItemId(itemId);
    setOpenModal(!openModal);
  };
  return (
    <div className="row justify-content-center">
      <div className="col-8">
        <div className="row mt-4">
          <div className="col-12 text-center">
            <h3>Tra cứu kết quả đăng ký</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-12 table-responsive table-hover ">
            {injectionRegister === "notFound" ? (
              "Hiện tại bạn chưa đăng ký tiêm chủng"
            ) : (
              <>
                <table className="table">
                  <thead className="thead-dark">
                    <tr className="text-center">
                      <th scope="col">STT</th>
                      <th scope="col">Họ và tên</th>
                      <th scope="col">Ngày sinh</th>
                      <th scope="col">Giới tính</th>
                      <th scope="col">Số điện thoại</th>
                      <th scope="col">Số CMND/CCCD</th>
                      <th scope="col">Trạng thái</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-center ">
                      <td>1</td>
                      <td>{auth.user.name}</td>
                      <td>{auth.user.dob}</td>
                      <td>{auth.user.gender}</td>
                      <td>{auth.user.phonenumber}</td>
                      <td>{auth.user.identification}</td>
                      <td
                        className={
                          injectionRegister.status === "pendding"
                            ? "text-danger"
                            : "text-success"
                        }
                      >
                        {injectionRegister.status === "pendding"
                          ? "Đang chờ xét duyệt"
                          : "Xét duyệt thành công"}
                      </td>
                      <td>
                        <div className="row justify-content-center">
                          <button
                            type="button"
                            className="btn btn-success mr-3 "
                            data-toggle="modal"
                            data-target="#exampleModal"
                            onClick={handleOnchange}
                          >
                            <i className="far fa-eye"></i>
                          </button>

                          {injectionRegister.status === "pendding" && (
                            <button
                              type="button"
                              className="btn btn-danger  "
                              data-toggle="modal"
                              data-target="#exampleModal"
                              onClick={() =>
                                handleOpenModal(injectionRegister._id)
                              }
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                {showModal && (
                  <ModalLookUp auth={auth} setShowModal={setShowModal} />
                )}
              </>
            )}
          </div>
        </div>
        {openModal && (
          <Modal
            body="đơn đăng ký"
            handleOpenModal={handleOpenModal}
            itemId={itemId}
            functDelete={DeleteInjectionRegister}
            auth={auth}
          />
        )}
      </div>
    </div>
  );
}

export default LookUp;
