import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import axios from 'axios';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  createOrganAdmin,
  updateOrganAdmin,
} from '../../redux/actions/oganizationAction';

const initialState = {
  represent: "",
  phonenumber: "",
  email: "",
  province: "",
  district: "",
  ward: "",
  password: "",
  organization: "",
  role: "",
};
function OrganizationModal({ action, item, status }) {
  const [data, setData] = useState(initialState);
  const { auth, role } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [tinh, setTinh] = useState([]);
  const [huyen, setHuyen] = useState([]);
  const [phuong, setPhuong] = useState([]);
  const [provinceId, setProvinceId] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [wardId, setWardId] = useState("");
  const [roleId, setRoleId] = useState("");

  const isFirstRun = useRef(true);
  const isFirstRun1 = useRef(true);

  useEffect(() => {
    if (action === "Xem") {
      setData(item);
      setProvinceId(item.province.id);
      setDistrictId(item.district.id);
      setWardId(item.ward.id);
      setRoleId(item.role);
    } else if (action === "Thêm") {
      setData(initialState);
      setProvinceId("");
      setDistrictId("");
      setWardId("");
      setRoleId("");
    } else if (action === "Sửa") {
      setData(item);

      setProvinceId(item.province.id);
      setDistrictId(item.district.id);
      setWardId(item.ward.id);
      setRoleId(item.role);
    }
  }, [action, item]);

  const handleOnclickDistrict = useCallback(async () => {
    const res = await axios.get(
      `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${provinceId}`,
      {
        mode: "no-cors",
        headers: {
          token: "66e22083-17df-11ec-b8c6-fade198b4859",
        },
        withCredentials: false,
      }
    );
    setHuyen(res.data.data);
  }, [provinceId]);

  const handleOnclickWard = useCallback(async () => {
    const res = await axios.get(
      `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${districtId}`,
      {
        mode: "no-cors",
        headers: {
          token: "66e22083-17df-11ec-b8c6-fade198b4859",
        },
        withCredentials: false,
      }
    );
    setPhuong(res.data.data);
  }, [districtId]);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    handleOnclickDistrict();
  }, [provinceId, handleOnclickDistrict]);

  useEffect(() => {
    if (isFirstRun1.current) {
      isFirstRun1.current = false;
      return;
    }
    handleOnclickWard();
  }, [districtId, handleOnclickWard]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleChangeProvince = async (event) => {
    setProvinceId(event.target.value);
  };
  const handleChangeDistrict = async (event) => {
    setDistrictId(event.target.value);
  };
  const handleChangeWard = (event) => {
    setWardId(event.target.value);
  };
  const handleChangeRole = (event) => {
    setRoleId(event.target.value);
  };

  useEffect(() => {
    const getProvince = async () => {
      const res = await axios.get(
        "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province",
        {
          mode: "no-cors",
          headers: {
            token: "66e22083-17df-11ec-b8c6-fade198b4859",
          },
          withCredentials: false,
        }
      );
      setTinh(res.data.data);
    };
    getProvince();
  }, []);

  const handleSubmit = () => {
    if (action === "Xem") {
      setData(item);
      setProvinceId(item.province.id);
      setDistrictId(item.district.id);
      setWardId(item.ward.id);
      setRoleId(item.role);
    } else if (action === "Thêm") {
      let province1, district1, ward1;
      tinh.forEach((item) => {
        if (item.ProvinceID === provinceId) {
          province1 = { id: item.ProvinceID, name: item.ProvinceName };
          return;
        }
      });
      huyen.forEach((item) => {
        if (item.DistrictID === districtId) {
          district1 = { id: item.DistrictID, name: item.DistrictName };
          return;
        }
      });
      phuong.forEach((item) => {
        if (item.WardCode === wardId) {
          ward1 = { id: item.WardCode, name: item.WardName };
          return;
        }
      });
      dispatch(
        createOrganAdmin(
          {
            ...data,
            province: province1,
            district: district1,
            ward: ward1,
            role: roleId,
          },
          auth.access_token
        )
      );
      setData(initialState);
    } else if (action === "Sửa") {
      let province2, district2, ward2;

      tinh.forEach((item) => {
        if (item.ProvinceID === provinceId) {
          province2 = { id: item.ProvinceID, name: item.ProvinceName };
          return;
        }
      });

      huyen.forEach((item) => {
        if (item.DistrictID === districtId) {
          district2 = { id: item.DistrictID, name: item.DistrictName };
          return;
        }
      });

      phuong.forEach((item) => {
        if (item.WardCode === wardId) {
          ward2 = { id: item.WardCode, name: item.WardName };
          return;
        }
      });
      dispatch(
        updateOrganAdmin(
          {
            ...data,
            province: province2,
            district: district2,
            ward: ward2,
            role: roleId,
          },
          auth.access_token
        )
      );

      setProvinceId("");
      setDistrictId("");
      setWardId("");
      setRoleId("");
    }
  };
  return (
    <div>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg ">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {action} thông tin tài khoản
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-5">
                  <div className="row align-items-center mb-2">
                    <label htmlFor="name1" className="col-4">
                      Tên đại diện:
                    </label>
                    <input
                      type="text"
                      className="form-control col-8"
                      id="name1"
                      name="represent"
                      value={data.represent}
                      onChange={handleOnChange}
                      disabled={status}
                    />
                  </div>

                  <div className="row align-items-center mb-2">
                    <label htmlFor="inputState" className="col-4">
                      Tỉnh/Thành phố
                    </label>
                    <select
                      id="inputState"
                      className="form-control col-8"
                      value={provinceId}
                      onChange={handleChangeProvince}
                      disabled={status}
                    >
                      <option>Tỉnh/Thành Phố</option>
                      {tinh.map((option) => (
                        <option
                          key={option.ProvinceID}
                          value={option.ProvinceID}
                        >
                          {option.ProvinceName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="row align-items-center mb-2">
                    <label htmlFor="name" className="col-4">
                      Quận/Huyện
                    </label>
                    <select
                      id="inputState"
                      className="form-control col-8"
                      value={districtId}
                      onChange={handleChangeDistrict}
                      disabled={status}
                    >
                      <option>Quận/Huyện</option>
                      {huyen.map((option) => (
                        <option
                          key={option.DistrictID}
                          value={option.DistrictID}
                        >
                          {option.DistrictName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="row align-items-center mb-2">
                    <label htmlFor="name" className="col-4">
                      Phường/Xã
                    </label>
                    <select
                      id="inputState"
                      className="form-control col-8"
                      value={wardId}
                      onChange={handleChangeWard}
                      disabled={status}
                    >
                      <option>Phường/Xã</option>
                      {phuong.map((option) => (
                        <option key={option.WardCode} value={option.WardCode}>
                          {option.WardName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-6">
                  <div className="row align-items-center mb-2">
                    <label htmlFor="name4" className="col-4">
                      Tên tổ chức:
                    </label>
                    <input
                      type="text"
                      className="form-control col-8"
                      id="name4"
                      name="organization"
                      value={data.organization}
                      onChange={handleOnChange}
                      disabled={status}
                    />
                  </div>
                  <div className="row align-items-center mb-2">
                    <label htmlFor="name2" className="col-4">
                      SĐT:
                    </label>
                    <input
                      type="text"
                      className="form-control col-8"
                      id="name2"
                      name="phonenumber"
                      value={data.phonenumber}
                      onChange={handleOnChange}
                      disabled={status}
                    />
                  </div>

                  <div className="row align-items-center mb-2">
                    <label htmlFor="name3" className="col-4">
                      Email:
                    </label>
                    <input
                      type="email"
                      className="form-control col-8"
                      id="name3"
                      name="email"
                      value={data.email}
                      onChange={handleOnChange}
                      disabled={status}
                    />
                  </div>

                  <div className="row align-items-center mb-2">
                    <label htmlFor="name" className="col-4">
                      Mật khẩu:
                    </label>
                    <input
                      type="password"
                      className="form-control col-8"
                      id="name"
                      name="password"
                      value={data.password}
                      onChange={handleOnChange}
                      disabled={status}
                    />
                  </div>

                  <div className="row align-items-center mb-2">
                    <label htmlFor="name" className="col-4">
                      Nhóm quyền
                    </label>
                    <select
                      id="inputState"
                      className="form-control col-8"
                      value={roleId}
                      onChange={handleChangeRole}
                      disabled={status}
                    >
                      <option>Lựa chọn nhóm quyền</option>
                      {role.map(
                        (option) =>
                          option.id !== 2 && (
                            <option key={option._id} value={option.id}>
                              {option.name}
                            </option>
                          )
                      )}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                {action === "Xem" ? "Quay Lại" : "Huỷ"}
              </button>
              {action !== "Xem" && (
                <button
                  type="button"
                  className="btn btn-primary "
                  data-dismiss="modal"
                  onClick={handleSubmit}
                >
                  {action}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrganizationModal;
