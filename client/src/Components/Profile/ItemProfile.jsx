import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import axios from 'axios';
import { useDispatch } from 'react-redux';

import { updateInfor } from '../../redux/actions/authActions';

function ItemProfile({ infor }) {
  const dispatch = useDispatch();
  const [tinh, setTinh] = useState([]);
  const [huyen, setHuyen] = useState([]);
  const [phuong, setPhuong] = useState([]);
  const [provinceId, setProvinceId] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [wardId, setWardId] = useState("");

  const name = useRef();
  const dob = useRef();
  const address = useRef();
  const gender = useRef();

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

  const handleChangeProvince = async (event) => {
    setProvinceId(event.target.value);
  };
  const handleChangeDistrict = (event) => {
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
    let province1, district1, ward1;
    tinh.forEach((item) => {
      if (item.ProvinceID === parseInt(provinceId)) {
        province1 = { id: item.ProvinceID, name: item.ProvinceName };
        return;
      }
    });
    huyen.forEach((item) => {
      if (item.DistrictID === parseInt(districtId)) {
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
    // console.log(province1);
    dispatch(
      updateInfor({
        ...infor,
        name: name.current.value,
        gender: gender.current.value,
        dob: dob.current.value,
        province: province1,
        district: district1,
        ward: ward1,
        address: address.current.value,
      })
    );
    localStorage.removeItem("infor");
  };

  return (
    <div>
      <div className="justify-content-center mt-5 row">
        <div className="col-12">
          <div className="login-box ">
            <div className="card ">
              <div className="card-header text-center p-3">
                <h3>Thông tin cá nhân</h3>
              </div>
              <div className="card-body mt-3">
                <div>
                  <div className="row">
                    <div className="col">
                      <label>Số điện thoại:</label>
                      <div className="input-group mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder={infor.phonenumber}
                          disabled
                        />
                      </div>
                    </div>
                    {/* <div className="col">
                      <label>Mật khẩu:</label>
                      <div className="input-group mb-3">
                        <input
                          type="password"
                          className="form-control"
                          placeholder="*********"
                          disabled
                        />
                      </div>
                    </div> */}
                    <div className="col">
                      <label>CCCD/CMND:</label>
                      <div className="input-group mb-3">
                        <input
                          type="text"
                          aria-label="CCCD/CMND"
                          className="form-control"
                          placeholder={infor.identification}
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <label>Họ và tên:</label>
                      <div className="input-group mb-3">
                        <input
                          type="text"
                          className="form-control"
                          ref={name}
                        />
                      </div>
                    </div>
                    <div className="col">
                      <label>Giới tính:</label>
                      <div className="form-group">
                        <select
                          id="inputState"
                          className="form-control"
                          ref={gender}
                          defaultValue="Nam"
                        >
                          <option>Nam</option>
                          <option>Nữ</option>
                          <option>Khác</option>
                        </select>
                      </div>
                    </div>
                    <div className="col">
                      <label>Ngày sinh:</label>
                      <div className="input-group mb-3">
                        <input
                          type="date"
                          aria-label="Ngày sinh"
                          defaultValue="25/09/2021"
                          className="form-control"
                          ref={dob}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <label>Địa chỉ:</label>
                      <div className="input-group mb-3">
                        <input
                          type="text"
                          className="form-control"
                          ref={address}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <label>Tỉnh/Thành Phố:</label>
                      <div className="form-group">
                        <select
                          id="inputState"
                          className="form-control"
                          value={provinceId}
                          onChange={handleChangeProvince}
                        >
                          <option>Tỉnh/Thành phố</option>
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
                      <label>Quận/Huyện:</label>
                      <div className="form-group">
                        <select
                          id="inputState"
                          className="form-control"
                          value={districtId}
                          onChange={handleChangeDistrict}
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
                    </div>
                    <div className="col">
                      <label>Phường/Xã:</label>
                      <div className="form-group">
                        <select
                          id="inputState"
                          className="form-control"
                          value={wardId}
                          onChange={handleChangeWard}
                        >
                          <option>Phường/Xã</option>
                          {phuong.map((option) => (
                            <option
                              key={option.WardCode}
                              value={option.WardCode}
                            >
                              {option.WardName}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-8"></div>
                    <div className="col-4">
                      <button
                        type="submit"
                        className="btn btn-primary btn-block"
                        onClick={handleSubmit}
                      >
                        Gửi
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemProfile;
