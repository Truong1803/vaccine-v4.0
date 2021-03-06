import React, { useCallback, useEffect, useRef, useState } from "react";

import axios from "axios";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { registerOrgan } from "../../redux/actions/authActions";

function Organization() {
  const email = useRef();
  const password = useRef();
  const organization = useRef();
  const represent = useRef();
  const phonenumber = useRef();
  const address = useRef();

  const dispatch = useDispatch();

  const [tinh, setTinh] = useState([]);
  const [huyen, setHuyen] = useState([]);
  const [phuong, setPhuong] = useState([]);
  const [provinceId, setProvinceId] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [wardId, setWardId] = useState("");

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
    if (provinceId) handleOnclickDistrict();
  }, [provinceId, handleOnclickDistrict]);

  useEffect(() => {
    if (districtId) handleOnclickWard();
  }, [districtId, handleOnclickWard]);

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

  const handleOnSubmit = () => {
    let province, district, ward;
    tinh.forEach((item) => {
      if (item.ProvinceID === parseInt(provinceId)) {
        province = { id: item.ProvinceID, name: item.ProvinceName };
        return;
      }
    });
    huyen.forEach((item) => {
      if (item.DistrictID === parseInt(districtId)) {
        district = { id: item.DistrictID, name: item.DistrictName };
        return;
      }
    });
    phuong.forEach((item) => {
      if (item.WardCode === wardId) {
        ward = { id: item.WardCode, name: item.WardName };
        return;
      }
    });
    dispatch(
      registerOrgan({
        email: email.current.value,
        password: password.current.value,
        organization: organization.current.value,
        represent: represent.current.value,
        phonenumber: phonenumber.current.value,
        province,
        district,
        ward,
        address: address.current.value,
      })
    );
  };

  return (
    <div className="justify-content-center mt-5 row">
      <div className="col-12  col-lg-6">
        <div className="login-box ">
          <div className="card ">
            <div className="card-header text-center p-3">
              <h3>????ng k?? t??i kho???n</h3>
            </div>
            <div className="card-body mt-3">
              <div>
                <div className="row">
                  <div className="col">
                    <div className="input-group mb-3">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        ref={email}
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="input-group mb-3">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="M???t kh???u"
                        ref={password}
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="T??n t??? ch???c"
                        ref={organization}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="T??n ng?????i ?????i di???n"
                        ref={represent}
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="S??? ??i???n tho???i"
                        ref={phonenumber}
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="?????a ch???"
                        ref={address}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <select
                        id="inputState"
                        className="form-control"
                        value={provinceId}
                        onChange={handleChangeProvince}
                      >
                        <option>T???nh/Th??nh ph???</option>
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
                  <div className="col">
                    <div className="form-group">
                      <select
                        id="inputState"
                        className="form-control"
                        value={districtId}
                        onChange={handleChangeDistrict}
                      >
                        <option>Qu???n/Huy???n</option>
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
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <select
                        id="inputState"
                        className="form-control"
                        value={wardId}
                        onChange={handleChangeWard}
                      >
                        <option>Ph?????ng/X??</option>
                        {phuong.map((option) => (
                          <option key={option.WardCode} value={option.WardCode}>
                            {option.WardName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <button
                      type="submit"
                      className="btn btn-primary btn-block"
                      onClick={handleOnSubmit}
                    >
                      ????ng k??
                    </button>
                  </div>
                </div>
                <div className="mt-2 mb-2 text-center">
                  <span>
                    <Link to="/sign_up" className="textSignUp ">
                      ????ng Nh???p{" "}
                    </Link>
                  </span>
                  n???u c?? t??i kho???n?
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Organization;
