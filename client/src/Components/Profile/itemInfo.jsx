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

import { getCompanyById } from '../../redux/actions/companyAction';
import { getHealthOrganById } from '../../redux/actions/oganizationAction';
import {
  getUserById,
  updateUser,
} from '../../redux/actions/userAction';

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
  bhyt: "",
  job: "",
  company: "",
};
function ItemInfo() {
  const dispatch = useDispatch();
  const { auth, user } = useSelector((state) => state);

  const [data, setData] = useState(initialState);

  const [tinh, setTinh] = useState([]);
  const [huyen, setHuyen] = useState([]);
  const [phuong, setPhuong] = useState([]);
  const [provinceId, setProvinceId] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [wardId, setWardId] = useState("");

  const isFirstRun = useRef(true);
  const isFirstRun1 = useRef(true);

  useEffect(() => {
    if (auth.access_token) {
      if (auth.user.role === 1) {
        dispatch(getUserById(auth.user._id, auth.access_token));
      } else if (auth.user.role === 2) {
        dispatch(getCompanyById(auth.user._id, auth.access_token));
      } else {
        dispatch(getHealthOrganById(auth.user._id, auth.access_token));
      }
    }
  }, [auth.access_token, dispatch, auth.user._id, auth.user.role]);

  const handleOnclickDistrict = useCallback(async () => {
    const res = await axios.get(
      `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${provinceId}`,
      { headers: { token: "66e22083-17df-11ec-b8c6-fade198b4859" } }
    );
    setHuyen(res.data.data);
  }, [provinceId]);

  const handleOnclickWard = useCallback(async () => {
    const res = await axios.get(
      `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${districtId}`,
      { headers: { token: "66e22083-17df-11ec-b8c6-fade198b4859" } }
    );
    setPhuong(res.data.data);
  }, [districtId]);

  useEffect(() => {
    if (isFirstRun1.current) {
      isFirstRun1.current = false;
      return;
    }

    setData(user[0]);
    setProvinceId(user[0]?.province.id);
    setDistrictId(user[0]?.district.id);
    setWardId(user[0]?.ward.id);
  }, [user]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

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
        { headers: { token: "66e22083-17df-11ec-b8c6-fade198b4859" } }
      );
      setTinh(res.data.data);
    };
    getProvince();
  }, []);

  const handleSubmit = () => {
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
      updateUser(
        {
          ...data,
          province: province1,
          district: district1,
          ward: ward1,
        },
        auth.access_token
      )
    );
  };

  return (
    <div>
      <div className="justify-content-center mt-5 row">
        <div className="col-12">
          <div className="login-box ">
            <div className="card">
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
                          placeholder={data.phonenumber}
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
                          placeholder={data.identification}
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
                          name="name"
                          value={data.name}
                          onChange={handleOnChange}
                        />
                      </div>
                    </div>
                    <div className="col">
                      <label>Giới tính:</label>
                      <div className="form-group">
                        <select
                          id="inputState"
                          className="form-control"
                          name="gender"
                          value={data.gender}
                          onChange={handleOnChange}
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
                          className="form-control"
                          value={data.dob}
                          name="dob"
                          onChange={handleOnChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <label>Số thẻ BHYT:</label>
                      <div className="input-group mb-3">
                        <input
                          type="text"
                          aria-label="CCCD/CMND"
                          className="form-control"
                          name="bhyt"
                          value={data.bhyt}
                          onChange={handleOnChange}
                        />
                      </div>
                    </div>
                    <div className="col">
                      <label>Nghề nghiệp:</label>
                      <div className="input-group mb-3">
                        <input
                          type="text"
                          aria-label="CCCD/CMND"
                          className="form-control"
                          name="job"
                          value={data.job}
                          onChange={handleOnChange}
                        />
                      </div>
                    </div>
                    <div className="col">
                      <label>Đơn vị công tác:</label>
                      <div className="input-group mb-3">
                        <input
                          type="text"
                          aria-label="CCCD/CMND"
                          className="form-control"
                          name="company"
                          value={data.company}
                          onChange={handleOnChange}
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
                          name="address"
                          value={data.address}
                          onChange={handleOnChange}
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
                          name="province"
                          value={provinceId}
                          onChange={handleChangeProvince}
                        >
                          <option hidden={true}>Tỉnh/Thành phố</option>
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
                        Lưu
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

export default ItemInfo;
