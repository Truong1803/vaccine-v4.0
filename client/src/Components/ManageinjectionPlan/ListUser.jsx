import React, {
  useEffect,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { getAPI } from '../../api/FetchData';
import { getDataVaccine } from '../../redux/actions/vaccineAction';
import ModalRegisterInjection
  from '../RegisterInjection/ModalRegisterInjection';
import InjectionPlan from './InjectionPlan';

function ListUserInjection() {
  const dispatch = useDispatch();
  const { vaccine, alert } = useSelector((state) => state);

  const [listUser, setListUser] = useState([]);
  const { auth } = useSelector((state) => state);
  const [showModal, setShowModal] = useState(false);
  const [showPlan, setShowPlan] = useState(false);

  const [vaccineId, setVaccineId] = useState(0);
  const [dose, setDose] = useState(0);
  const [callback, setCallback] = useState(false);

  const [quanlity, setQuanlity] = useState("Số lượng");

  const [user, setUser] = useState([]);
  useEffect(() => {
    dispatch(getDataVaccine());
  }, [dispatch]);
  useEffect(async () => {
    if (auth.access_token) {
      const res = await getAPI(
        `/user-injection-register/getAll?vaccineId=${vaccineId}&dose=${dose}&sort=injectionDate`,
        auth.access_token
      );
      setListUser(res.data.data);
    }
  }, [vaccineId, dose, callback, auth.access_token, alert]);

  const handleOnclickModal = (user) => {
    setUser(user);
    setShowModal(true);
  };

  const handleOnclickPlan = () => {
    setShowPlan(true);
  };

  const handleChangeQuanlity = (e) => {
    setQuanlity(e.target.value);
    handleCheckQuanlity(e.target.value);
  };

  const handleCheck = (id) => {
    listUser.forEach((item) => {
      if (item._id === id) {
        item.checked = !item.checked;
      }
    });
    setListUser([...listUser]);
  };

  const handleCheckQuanlity = (size) => {
    listUser.forEach((item) => {
      item.checked = false;
    });
    let size1 = 0;
    if (size === "0") return;
    else size1 = parseInt(size);

    let value = 0;
    const x = listUser.length;
    if (x > size) value = size;
    else value = x;
    for (let i = 0; i < x; i++) {
      listUser[i].checked = true;
    }
    setListUser([...listUser]);
  };

  return (
    <div className="row">
      <div className="col-12">
        <div className="row">
          <div className="col-8"></div>
        </div>
      </div>
      <div className="col-12">
        <div className="row mt-4 mb-2 d-flex justify-content-center">
          <div className="col-4 ">
            <h3>Danh sách đơn đăng ký</h3>
          </div>
        </div>

        <div className="row mb-2 ">
          <div className="col-8 d-flex">
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
            <div className="col-1"></div>
            <div className="col-4">
              <select
                className="form-control"
                value={vaccineId}
                onChange={(e) => setVaccineId(e.target.value)}
              >
                <option hidden={true}>Loại vắc xin</option>
                <option value={0}>Chọn tất cả</option>
                {vaccine.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name_vaccine}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-4">
              <select
                className="form-control"
                value={dose}
                onChange={(e) => setDose(e.target.value)}
              >
                <option hidden={true}>Mũi tiêm thứ</option>
                <option value={0}>Chọn tất cả</option>
                <option value={1}>Mũi tiêm thứ nhất</option>
                <option value={2}>Mũi tiêm thứ hai</option>
              </select>
            </div>
          </div>

          <div className="col-4 d-flex  pr-0">
            <div className="col-6">
              <div className="action">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-toggle="modal"
                  data-target="#exampleModal2"
                >
                  Thêm người đăng ký
                </button>
              </div>
            </div>
            <div className="col-6">
              <div className="action">
                <button
                  type="button"
                  className="btn btn-success"
                  data-toggle="modal"
                  data-target="#exampleModal2"
                  onClick={handleOnclickPlan}
                >
                  Thiết lập kế hoạch
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-12 table-responsive table-hover ">
        <table className="table">
          <thead className="thead-dark">
            <tr className="text-center">
              <th scope="col">
                <select
                  id="exampleFormControlSelect1"
                  name="quanlity"
                  value={quanlity}
                  onChange={handleChangeQuanlity}
                >
                  <option hidden={true}>Số lượng</option>
                  <option value={0}>0</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                  <option value={500}>500</option>
                </select>
              </th>
              <th scope="col">Họ và tên</th>
              <th scope="col">Giới tính</th>
              <th scope="col">CCCD/CMND</th>
              <th scope="col">Loại vắc xin</th>
              <th scope="col">Mũi tiêm thứ</th>
              <th scope="col">Ngày tiêm</th>
              <th scope="col">Trạng thái</th>
              <th scope="col">Chi tiết</th>
            </tr>
          </thead>
          <tbody>
            {listUser.map((item) => (
              <tr className="text-center " key={item._id}>
                <td>
                  <input
                    type="checkbox"
                    onChange={() => handleCheck(item._id)}
                    checked={item.checked}
                  />
                </td>
                <td>{item.user.name}</td>
                <td>{item.user.gender}</td>
                <td>{item.user.identification}</td>
                <td>
                  {vaccine.map(
                    (item1) =>
                      item1._id === item.vaccineId && item1.name_vaccine
                  )}
                </td>
                <td>
                  {item.dose === 1 ? "Mũi tiêm thứ nhất" : "Mũi tiêm thứ hai"}
                </td>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && (
        <ModalRegisterInjection setShowModal={setShowModal} user={user} />
      )}
      {showPlan && (
        <InjectionPlan
          listUser={listUser}
          setShowPlan={setShowPlan}
          // setCallback={setCallback}
          // callback={callback}
          check="user"
        />
      )}
      {/* {action !== "" && (
        <UserModal action={action} item={item} status={status} />
      )} */}
    </div>
  );
}

export default ListUserInjection;
