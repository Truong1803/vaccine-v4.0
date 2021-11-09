import React, {
  useEffect,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  DeleteInjectionRegister,
  GetInjectionRegister,
} from '../../redux/actions/injectionRegisterAction';
import { getDataVaccine } from '../../redux/actions/vaccineAction';
import Modal from '../alert/Modal';
import ModalLookUp from './ModalLookUp';

function LookUp() {
  const dispatch = useDispatch();
  const { injectionRegister, auth, vaccine } = useSelector((state) => state);
  const [showModal, setShowModal] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const [itemId, setItemId] = useState("");
  useEffect(() => {
    dispatch(getDataVaccine());
    if (auth.access_token) dispatch(GetInjectionRegister(auth.access_token));
  }, [auth.access_token, dispatch]);
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
      <div className="col-9">
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
                      {auth?.user?.role === 1 ? (
                        <th scope="col">Họ và tên</th>
                      ) : (
                        <th scope="col">Tên tổ chức</th>
                      )}

                      {auth?.user?.role === 1 && (
                        <th scope="col">Đăng ký mũi tiêm</th>
                      )}

                      <th scope="col">Loại vắc xin</th>
                      <th scope="col">Ngày tiêm</th>
                      {injectionRegister.status === "success" && (
                        <th scope="col">Thời gian</th>
                      )}
                      <th scope="col">Địa điểm</th>
                      <th scope="col">Trạng thái</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-center ">
                      <td>1</td>
                      {auth?.user?.role === 1 ? (
                        <td>{auth?.user?.name}</td>
                      ) : (
                        <td>{injectionRegister?.company?.organization}</td>
                      )}

                      {auth?.user?.role === 1 && (
                        <td>{`Mũi tiêm thứ ${injectionRegister.dose}`}</td>
                      )}

                      <td>
                        {vaccine.map(
                          (item) =>
                            item._id === injectionRegister.vaccineId &&
                            item.name_vaccine
                        )}
                      </td>
                      <td>{injectionRegister.injectionDate}</td>
                      {injectionRegister.status === "success" && (
                        <td>{injectionRegister.time}</td>
                      )}
                      <td>{injectionRegister.organization?.organization}</td>
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
                          {auth?.user?.role === 1 && (
                            <button
                              type="button"
                              className="btn btn-success mr-3 "
                              data-toggle="modal"
                              data-target="#exampleModal"
                              onClick={handleOnchange}
                            >
                              <i className="far fa-eye"></i>
                            </button>
                          )}

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
