import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';

import axios from 'axios';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  AddUserRegister,
} from '../../redux/actions/injectionRegisterOrganAction';
import { importUserRegister } from '../../redux/actions/scheduleAction';
import { getDataVaccine } from '../../redux/actions/vaccineAction';

let initialState = {
  phonenumber: "",
  identification: "",
  name: "",
  gender: "",
  dob: "",
  email: "",
  province: "",
  district: "",
  ward: "",
  address: "",
  bhyt: "",
  job: "",
  company: "",
  role: 1,
  vaccineId: "",
  injectionDate: "",
};
function ModalImportInjectionUser() {
  const { vaccine, auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [data, setData] = useState(initialState);

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

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
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

  useEffect(() => {
    dispatch(getDataVaccine());
  }, [dispatch]);

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
    if (auth?.user?.role === 2) {
      dispatch(
        AddUserRegister(
          {
            ...data,
            province: province1,
            district: district1,
            ward: ward1,
          },
          auth.access_token
        )
      );
    } else if (auth?.user?.role === 3) {
      dispatch(
        importUserRegister(
          {
            ...data,
            province: province1,
            district: district1,
            ward: ward1,
          },
          auth.access_token
        )
      );
    }
    setData(initialState);
  };

  return (
    <div>
      <div>
        <div
          className="modal fade"
          id="exampleModal13"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Th??ng tin ng?????i ti??m
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
                <div className="row justify-content-center">
                  <div className="col">
                    <p className="font-weight-bold">
                      1. Th??ng tin ng?????i ????ng k?? ti??m:
                    </p>
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col">
                    <div className="row">
                      <div className="col-3">
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">H??? v?? t??n:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={data.name}
                            onChange={handleOnChange}
                          />
                        </div>
                      </div>
                      <div className="col-3">
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">Ng??y sinh:</label>
                          <input
                            type="date"
                            className="form-control"
                            name="dob"
                            value={data.dob}
                            onChange={handleOnChange}
                          />
                        </div>
                      </div>
                      <div className="col-3">
                        <div className="form-group">
                          <label htmlFor="exampleFormControlSelect1">
                            Gi???i t??nh:
                          </label>
                          <div className="form-group">
                            <select
                              id="inputState"
                              className="form-control"
                              defaultValue="Nam"
                              name="gender"
                              value={data.gender}
                              onChange={handleOnChange}
                            >
                              <option hidden={true}>Gi???i t??nh</option>
                              <option value="Nam">Nam</option>
                              <option value="N???">N???</option>
                              <option value="Kh??c">Kh??c</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="col-3">
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">
                            S??? ??i???n tho???i:
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="phonenumber"
                            value={data.phonenumber}
                            onChange={handleOnChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col">
                    <div className="row">
                      <div className="col-3">
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">Email:</label>
                          <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={data.email}
                            onChange={handleOnChange}
                          />
                        </div>
                      </div>
                      <div className="col-3">
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">CCCD/CMND:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="identification"
                            value={data.identification}
                            onChange={handleOnChange}
                          />
                        </div>
                      </div>
                      <div className="col-3">
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">
                            S??? th??? BHYT:
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="bhyt"
                            value={data.bhyt}
                            onChange={handleOnChange}
                          />
                        </div>
                      </div>
                      <div className="col-3">
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">
                            Ngh??? nghi???p:
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="job"
                            value={data.job}
                            onChange={handleOnChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col">
                    <div className="row">
                      <div className="col-3">
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">
                            ????n v??? c??ng t??c:
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="company"
                            value={data.company}
                            onChange={handleOnChange}
                          />
                        </div>
                      </div>
                      <div className="col-3">
                        <div className="form-group">
                          <label htmlFor="exampleFormControlSelect1">
                            T???nh/Th??nh ph???:
                          </label>
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
                      </div>
                      <div className="col-3">
                        <div className="form-group">
                          <label htmlFor="exampleFormControlSelect1">
                            Qu???n/Huy???n:
                          </label>
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
                      </div>
                      <div className="col-3">
                        <div className="form-group">
                          <label htmlFor="exampleFormControlSelect1">
                            Ph?????ng/X??:
                          </label>
                          <div className="form-group">
                            <select
                              id="inputState"
                              className="form-control"
                              value={wardId}
                              onChange={handleChangeWard}
                            >
                              <option>Ph?????ng/X??</option>
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
                      <div className="col">
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">?????a ch???:</label>
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
                  </div>
                </div>
                {auth?.user?.role === 3 && (
                  <>
                    <div className="row justify-content-center">
                      <div className="col">
                        <div className="row">
                          <div className="col font-weight-bold">
                            2.Th??ng tin ????ng k?? ti??m ch???ng
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row justify-content-center">
                      <div className="col">
                        <div className="row">
                          <div className="col-3 ">
                            <div className="form-group">
                              <label htmlFor="exampleFormControlSelect1">
                                Lo???i vaccine:
                              </label>
                              <select
                                className="form-control"
                                id="exampleFormControlSelect1"
                                value={data.vaccineId}
                                onChange={handleOnChange}
                                name="vaccineId"
                              >
                                <option hidden={true}>L???a ch???n v???c xin</option>
                                {vaccine.map((option) => (
                                  <option key={option._id} value={option._id}>
                                    {option.name_vaccine}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>

                          <div className="col-3">
                            <div className="form-group">
                              <label htmlFor="exampleInputEmail1">
                                Ng??y mu???n ti??m:
                              </label>
                              <input
                                type="date"
                                className="form-control"
                                name="injectionDate"
                                value={data.injectionDate}
                                onChange={handleOnChange}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-dismiss="modal"
                >
                  Hu???
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  data-dismiss="modal"
                  onClick={handleSubmit}
                >
                  ????ng k??
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalImportInjectionUser;
