import React, { useEffect, useState } from "react";
import ModalRegisterInjection from "../RegisterInjection/ModalRegisterInjection";
import InjectionPlan from "./InjectionPlan";
import { getAPI } from "../../api/FetchData";
import { useSelector } from "react-redux";
function ListUserInjection() {
  const [action, setAction] = useState("");
  const [listUser, setListUser] = useState([]);
  const { auth } = useSelector((state) => state);
  const [showModal, setShowModal] = useState(false);
  const [showPlan, setShowPlan] = useState(false);

  const [user, setUser] = useState([]);
  useEffect(async () => {
    const res = await getAPI(
      "/user-injection-register/getAll?sort=injectionDate",
      auth.access_token
    );
    setListUser(res.data.data);
  }, []);

  const handleOnclickModal = (user) => {
    setUser(user);
    setShowModal(true);
  };

  const handleOnclickPlan = () => {
    setShowPlan(true);
  };

  return (
    <div className="row">
      <div className="col-12">
        <div className="row">
          <div className="col-8"></div>
        </div>
      </div>
      <div className="col-12">
        <div className="row mt-4 mb-2">
          <div className="col-3">
            <form className="form-inline my-2 my-lg-0 ">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
            </form>
          </div>
          <div className="col-6 d-flex justify-content-center">
            <h3>Danh sách đơn đăng ký</h3>
          </div>
          <div className="col-3">
            <div className="action ">
              <button
                type="button"
                className="btn btn-primary"
                data-toggle="modal"
                data-target="#exampleModal2"
                onClick={handleOnclickPlan}
              >
                Thiết lập kế hoạch tiêm chủng
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 table-responsive table-hover ">
        <table className="table">
          <thead className="thead-dark">
            <tr className="text-center">
              <th scope="col">Họ và tên</th>
              <th scope="col">Giới tính</th>
              <th scope="col">Số điện thoại</th>
              <th scope="col">CMT/CCCD</th>
              <th scope="col">Ngày đăng ký</th>
              <th scope="col">Trạng thái</th>
              <th scope="col">Chi tiết</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {listUser.map((item) => (
              <tr className="text-center " key={item._id}>
                <td>{item.user.name}</td>
                <td>{item.user.gender}</td>
                <td>{item.user.phonenumber}</td>
                <td>{item.user.identification}</td>
                <td>{item.injectionDate}</td>
                <td className="text-danger">chưa duyệt</td>

                <td>
                  <div className="row justify-content-center">
                    <button
                      type="button"
                      className="btn btn-info col-6"
                      data-toggle="modal"
                      data-target="#exampleModal"
                      onClick={() => handleOnclickModal(item)}
                    >
                      <i className="far fa-eye"></i>
                    </button>
                  </div>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-success mr-3 col-5 "
                    //   data-toggle='modal'
                    //   data-target='#exampleModal'
                    //   onClick={() => {
                    //     handleOnClick(item, "Sửa", false);
                    //   }}
                  >
                    <i className="fas fa-check"></i>
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger col-5 "
                    //   data-toggle='modal'
                    //   data-target='#exampleModal'
                    //   onClick={() => {
                    //     handleOnClickDelete(item._id);
                    //   }}
                  >
                    <i className="fas fa-ban"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && (
        <ModalRegisterInjection setShowModal={setShowModal} user={user} />
      )}
      {showPlan && <InjectionPlan action="Thêm" setShowPlan={setShowPlan} />}
      {/* {action !== "" && (
        <UserModal action={action} item={item} status={status} />
      )} */}
    </div>
  );
}

export default ListUserInjection;
