import React, {
  useEffect,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { getAPI } from '../../api/FetchData';
import InjectionPlan from './InjectionPlan';

function ListOrganizationInjection() {
  const dispatch = useDispatch();
  const { auth, alert } = useSelector((state) => state);

  const [vaccineId, setVaccineId] = useState(0);
  const [listOrgan, setListOrgan] = useState([]);
  // const [showModal, setShowModal] = useState(false);
  const [showPlan, setShowPlan] = useState(false);

  const [quanlity, setQuanlity] = useState("Số lượng");

  useEffect(() => {
    if (auth.access_token) {
      const getData = async () => {
        const res = await getAPI(
          `/organ-injection-register?vaccineId=${vaccineId}`,
          auth.access_token
        );
        setListOrgan(res.data.data);
      };
      getData();
    }
  }, [auth.access_token, vaccineId, alert, dispatch]);

  const handleChangeQuanlity = (e) => {
    setQuanlity(e.target.value);
    handleCheckQuanlity(e.target.value);
  };

  const handleCheck = (id) => {
    listOrgan.forEach((item) => {
      if (item._id === id) {
        item.checked = !item.checked;
      }
    });
    setListOrgan([...listOrgan]);
  };
  const handleOnclickPlan = () => {
    setShowPlan(true);
  };

  const handleCheckQuanlity = (size) => {
    listOrgan.forEach((item) => {
      item.checked = false;
    });
    let size1 = 0;
    if (size === "0") return;
    else size1 = parseInt(size);

    let value = 0;
    const x = listOrgan.length;
    if (x > size) value = size;
    else value = x;
    for (let i = 0; i < x; i++) {
      listOrgan[i].checked = true;
    }
    setListOrgan([...listOrgan]);
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
              <th scope="col">Tổ chức đăng ký</th>
              <th scope="col">Người đại diện</th>
              <th scope="col">Số điện thoại</th>
              <th scope="col">Ngày đăng ký</th>
              <th scope="col">Loại vắc xin</th>
              <th scope="col">Trạng thái</th>
              <th scope="col">Chi tiết</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {listOrgan.map((item) => (
              <tr className="text-center " key={item._id}>
                <td>
                  <input
                    type="checkbox"
                    onChange={() => handleCheck(item._id)}
                    checked={item.checked}
                  />
                </td>
                <td>{item.organization.organization}</td>
                <td>{item.organization.represent}</td>
                <td>{item.organization.phonenumber}</td>
                <td>{item.injectionDate}</td>
                <td>{item.vaccine.name_vaccine}</td>
                <td className="text-danger">chưa duyệt</td>

                <td>
                  <div className="row justify-content-center">
                    <button
                      type="button"
                      className="btn btn-info col-6"
                      data-toggle="modal"
                      data-target="#exampleModal"
                      //   onClick={() => {
                      //     handleOnClick(item, "Xem", true);
                      //   }}
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
      {showPlan && (
        <InjectionPlan
          listUser={listOrgan}
          setShowPlan={setShowPlan}
          check="organ"
        />
      )}
    </div>
  );
}

export default ListOrganizationInjection;
