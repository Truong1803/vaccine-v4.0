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
  createOrganWard,
  updateOrganWard,
} from '../../redux/actions/oganizationAction';

const initialState = {
  email: "",
  organization: "",
  represent: "",
  phonenumber: "",
  province: "",
  district: "",
  ward: "",
  address: "",
  num_table: "",
};
function InjectionModal({ action, item, status }) {
  const [data, setData] = useState(initialState);
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [tinh, setTinh] = useState([]);
  const [huyen, setHuyen] = useState([]);
  const [phuong, setPhuong] = useState([]);
  const [provinceId, setProvinceId] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [wardId, setWardId] = useState("");

  const isFirstRun = useRef(true);
  const isFirstRun1 = useRef(true);

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
    if (action === "Xem") {
      setData(item);
      setProvinceId(item.province.id);
      setDistrictId(item.district.id);
      setWardId(item.ward.id);
    } else if (action === "Thêm") {
      setData(initialState);
      if (auth.user.role === 4) {
        setProvinceId(auth.user.province.id);
        setDistrictId(auth.user.district.id);
      }

      setWardId("");
    } else if (action === "Sửa") {
      setData(item);

      setProvinceId(item.province.id);
      setDistrictId(item.district.id);
      setWardId(item.ward.id);
    }
  }, [
    action,
    item,
    auth.user.province.id,
    auth.user.role,
    auth.user.district.id,
  ]);

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
    if (action === "Thêm") {
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
        createOrganWard(
          {
            ...data,
            province: province1,
            district: district1,
            ward: ward1,
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
        updateOrganWard(
          {
            ...data,
            province: province2,
            district: district2,
            ward: ward2,
          },
          auth.access_token
        )
      );

      setProvinceId("");
      setDistrictId("");
      setWardId("");
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
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {action} đơn vị tiêm chủng
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
              <div>
                <label htmlFor="name">Tên đơn vị:</label>
                <input
                  type="text"
                  className="form-control col-12"
                  id="name"
                  name="organization"
                  value={data.organization}
                  onChange={handleOnChange}
                  disabled={status}
                />
              </div>
              <div>
                <label htmlFor="id">Địa chỉ:</label>
                <input
                  type="text"
                  className="form-control col-12"
                  id="id"
                  name="address"
                  value={data.address}
                  onChange={handleOnChange}
                  disabled={status}
                />
              </div>
              <div className="row">
                <div className="col-4">
                  <label htmlFor="ct">Tỉnh/Thành phố:</label>
                  <div className="form-group">
                    <select
                      id="inputState"
                      className="form-control"
                      value={provinceId}
                      onChange={handleChangeProvince}
                      disabled={status || auth.user.role === 4}
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
                </div>
                <div className="col-4">
                  <label htmlFor="injection">Quận/Huyện</label>
                  <select
                    id="inputState"
                    className="form-control"
                    value={districtId}
                    onChange={handleChangeDistrict}
                    disabled={status || auth.user.role === 4}
                  >
                    <option>Quận/Huyện</option>
                    {huyen.map((option) => (
                      <option key={option.DistrictID} value={option.DistrictID}>
                        {option.DistrictName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-4">
                  <label htmlFor="injection">Phường/Xã:</label>
                  <select
                    id="inputState"
                    className="form-control"
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
              <div className="row">
                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="name">Người đại diện:</label>
                    <input
                      type="text"
                      className="form-control col-12"
                      id="name"
                      name="represent"
                      value={data.represent}
                      onChange={handleOnChange}
                      disabled={status}
                    />
                  </div>
                </div>
                <div className="col-6">
                  <label htmlFor="injection">Email:</label>
                  <input
                    type="email"
                    className="form-control col-12"
                    id="ct"
                    name="email"
                    value={data.email}
                    onChange={handleOnChange}
                    disabled={status}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="name">Số điện thoại:</label>
                    <input
                      type="number"
                      className="form-control col-12"
                      id="name"
                      name="phonenumber"
                      value={data.phonenumber}
                      onChange={handleOnChange}
                      disabled={status}
                    />
                  </div>
                </div>
                <div className="col-6">
                  <label htmlFor="injection">Số bàn tiêm:</label>
                  <input
                    type="number"
                    className="form-control col-12"
                    id="ct"
                    name="num_table"
                    value={data.num_table}
                    onChange={handleOnChange}
                    disabled={status}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                {action === "Xem" ? " Quay Lại" : "Huỷ"}
              </button>
              {action !== "Xem" && (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                  data-dismiss="modal"
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

export default InjectionModal;
