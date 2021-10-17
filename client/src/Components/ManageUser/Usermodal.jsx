import React, { useEffect, useRef, useState } from "react";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { createUser, updateUser } from "../../redux/actions/userAction";

const initialState = {
  phonenumber: "",
  identification: "",
  name: "",
  gender: "",
  dob: "",
  province: "",
  district: "",
  ward: "",
  address: "",
};

function UserModal({ action, item, status }) {
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

  useEffect(() => {
    if (action === "Xem") {
      setData(item);
      setProvinceId(item.province.id);
      setDistrictId(item.district.id);
      setWardId(item.ward.id);
    } else if (action === "Thêm") {
      setData(initialState);
      setProvinceId("");
      setDistrictId("");
      setWardId("");
    } else if (action === "Sửa") {
      setData(item);

      setProvinceId(item.province.id);
      setDistrictId(item.district.id);
      setWardId(item.ward.id);
    }
  }, [action, item]);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    handleOnclickDistrict();
  }, [provinceId]);

  useEffect(() => {
    if (isFirstRun1.current) {
      isFirstRun1.current = false;
      return;
    }
    handleOnclickWard();
  }, [districtId]);

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
        { headers: { token: "66e22083-17df-11ec-b8c6-fade198b4859" } }
      );
      setTinh(res.data.data);
    };
    getProvince();
  }, []);

  const handleOnclickDistrict = async () => {
    const res = await axios.get(
      `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${provinceId}`,
      { headers: { token: "66e22083-17df-11ec-b8c6-fade198b4859" } }
    );
    setHuyen(res.data.data);
  };

  const handleOnclickWard = async () => {
    const res = await axios.get(
      `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${districtId}`,
      { headers: { token: "66e22083-17df-11ec-b8c6-fade198b4859" } }
    );
    setPhuong(res.data.data);
  };

  const handleSubmit = () => {
    if (action === "Thêm") {
      let province1, district1, ward1;
      tinh.forEach((item) => {
        if (item.ProvinceID == provinceId) {
          province1 = { id: item.ProvinceID, name: item.ProvinceName };
          return;
        }
      });
      huyen.forEach((item) => {
        if (item.DistrictID == districtId) {
          district1 = { id: item.DistrictID, name: item.DistrictName };
          return;
        }
      });
      phuong.forEach((item) => {
        if (item.WardCode == wardId) {
          ward1 = { id: item.WardCode, name: item.WardName };
          return;
        }
      });

      dispatch(
        createUser(
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
        if (item.ProvinceID == provinceId) {
          province2 = { id: item.ProvinceID, name: item.ProvinceName };
          return;
        }
      });

      huyen.forEach((item) => {
        if (item.DistrictID == districtId) {
          district2 = { id: item.DistrictID, name: item.DistrictName };
          return;
        }
      });

      phuong.forEach((item) => {
        if (item.WardCode == wardId) {
          ward2 = { id: item.WardCode, name: item.WardName };
          return;
        }
      });
      dispatch(
        updateUser(
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
                <div className="col-7">
                  <div className="row align-items-center mb-2">
                    <label htmlFor="name" className="col-4">
                      Họ và tên:
                    </label>
                    <input
                      type="text"
                      className="form-control col-8"
                      id="name"
                      name="name"
                      disabled={status}
                      value={data.name}
                      onChange={handleOnChange}
                    />
                  </div>
                  <div className="row align-items-center mb-2">
                    <label htmlFor="name" className="col-4">
                      CCCD/CMND:
                    </label>
                    <input
                      type="text"
                      className="form-control col-8"
                      id="name"
                      name="identification"
                      value={data.identification}
                      onChange={handleOnChange}
                      disabled={status}
                    />
                  </div>
                  <div className="row align-items-center mb-2">
                    <label htmlFor="name" className="col-4">
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
                <div className="col-5">
                  <div className="row align-items-center mb-2">
                    <label htmlFor="name" className="col-4">
                      Giới tính
                    </label>
                    <select
                      id="inputState"
                      className="form-control col-8"
                      value={data.gender}
                      name="gender"
                      onChange={handleOnChange}
                      disabled={status}
                    >
                      <option selected>Nam</option>
                      <option>Nữ</option>
                      <option>Khác</option>
                    </select>
                  </div>
                  <div className="row align-items-center mb-2">
                    <label htmlFor="name" className="col-4">
                      Ngày sinh:
                    </label>
                    <input
                      type="date"
                      className="form-control col-8"
                      id="name"
                      name="dob"
                      value={data.dob}
                      onChange={handleOnChange}
                      disabled={status}
                    />
                  </div>
                  <div className="row align-items-center mb-2">
                    <label htmlFor="name" className="col-4">
                      SĐT:
                    </label>
                    <input
                      type="text"
                      className="form-control col-8"
                      id="name"
                      name="phonenumber"
                      value={data.phonenumber}
                      onChange={handleOnChange}
                      disabled={status}
                    />
                  </div>
                  <div className="row align-items-center mb-2">
                    <label htmlFor="name" className="col-4">
                      Địa chỉ:
                    </label>
                    <input
                      type="text"
                      className="form-control col-8"
                      id="name"
                      name="address"
                      value={data.address}
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
                      disabled={true}
                    >
                      <option selected>Người dân</option>
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
                Huỷ
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
                data-dismiss="modal"
              >
                {action}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserModal;
