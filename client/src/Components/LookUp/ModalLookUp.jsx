import React, { useState, useEffect, useRef } from "react";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
const initialState = {
  email: "",
  organization: "",
  represent: "",
  phonenumber: "",
  province: "",
  district: "",
  ward: "",
  address: "",
};
function ModalLookUp({ action, item }) {
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
    if (action === "Thêm") {
      setData(initialState);
      if (auth.user.role === 5) {
        setProvinceId(auth.user.province.id);
      }

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
      // dispatch(
      //   createOrgan(
      //     {
      //       ...data,
      //       province: province1,
      //       district: district1,
      //       ward: ward1,
      //     },
      //     auth.access_token
      //   )
      // );
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
      // dispatch(
      //   updateOrgan(
      //     {
      //       ...data,
      //       province: province2,
      //       district: district2,
      //       ward: ward2,
      //     },
      //     auth.access_token
      //   )
      // );

      setProvinceId("");
      setDistrictId("");
      setWardId("");
    }
  };
  return (
    <div>
      <div>
        <div
          className='modal fade'
          id='exampleModal'
          tabIndex='-1'
          aria-labelledby='exampleModalLabel'
          aria-hidden='true'
        >
          <div className='modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title' id='exampleModalLabel'>
                  {action} thông tin người tiêm
                </h5>
                <button
                  type='button'
                  className='close'
                  data-dismiss='modal'
                  aria-label='Close'
                >
                  <span aria-hidden='true'>&times;</span>
                </button>
              </div>
              <div className='modal-body'>
                <div className='row justify-content-center'>
                  <div className='col'>
                    <p className='font-weight-bold'>
                      1. Thông tin người đăng ký tiêm:
                    </p>
                  </div>
                </div>
                <div className='row justify-content-center'>
                  <div className='col'>
                    <div className='row'>
                      <div className='col-3'>
                        <div class='form-group'>
                          <label for='exampleInputEmail1'>Họ và tên:</label>
                          <input
                            type='text'
                            class='form-control'
                            placeholder='Ngô Trung Sơn'
                          />
                        </div>
                      </div>
                      <div className='col-3'>
                        <div class='form-group'>
                          <label for='exampleInputEmail1'>Ngày sinh:</label>
                          <input type='date' class='form-control' />
                        </div>
                      </div>
                      <div className='col-3'>
                        <div class='form-group'>
                          <label for='exampleFormControlSelect1'>
                            Giới tính:
                          </label>
                          <select
                            class='form-control'
                            id='exampleFormControlSelect1'
                          >
                            <option selected>Nam</option>
                            <option>Nữ</option>
                            <option>Khác</option>
                          </select>
                        </div>
                      </div>
                      <div className='col-3'>
                        <div class='form-group'>
                          <label for='exampleInputEmail1'>Số điện thoại:</label>
                          <input
                            type='text'
                            class='form-control'
                            placeholder='0344174212'
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='row justify-content-center'>
                  <div className='col'>
                    <div className='row'>
                      <div className='col-3'>
                        <div class='form-group'>
                          <label for='exampleInputEmail1'>Email:</label>
                          <input
                            type='email'
                            class='form-control'
                            placeholder='ngoson285@gmail.com'
                          />
                        </div>
                      </div>
                      <div className='col-3'>
                        <div class='form-group'>
                          <label for='exampleInputEmail1'>CCCD/CMND:</label>
                          <input
                            type='text'
                            class='form-control'
                            placeholder='001200008741'
                          />
                        </div>
                      </div>
                      <div className='col-3'>
                        <div class='form-group'>
                          <label for='exampleInputEmail1'>Số thẻ BHYT:</label>
                          <input
                            type='text'
                            class='form-control'
                            placeholder='123456789456'
                          />
                        </div>
                      </div>
                      <div className='col-3'>
                        <div class='form-group'>
                          <label for='exampleInputEmail1'>Nghề nghiệp:</label>
                          <input
                            type='text'
                            class='form-control'
                            placeholder='ngoson285@gmail.com'
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='row justify-content-center'>
                  <div className='col'>
                    <div className='row'>
                      <div className='col-3'>
                        <div class='form-group'>
                          <label for='exampleInputEmail1'>
                            Đơn vị công tác:
                          </label>
                          <input
                            type='text'
                            class='form-control'
                            placeholder='Thanglong university'
                          />
                        </div>
                      </div>
                      <div className='col-3'>
                        <div class='form-group'>
                          <label for='exampleFormControlSelect1'>
                            Tỉnh/Thành phố:
                          </label>
                          <select
                            class='form-control'
                            id='exampleFormControlSelect1'
                          >
                            <option selected>Hà Nội</option>
                          </select>
                        </div>
                      </div>
                      <div className='col-3'>
                        <div class='form-group'>
                          <label for='exampleFormControlSelect1'>
                            Quận/Huyện:
                          </label>
                          <select
                            class='form-control'
                            id='exampleFormControlSelect1'
                          >
                            <option selected>Hoàng Mai</option>
                          </select>
                        </div>
                      </div>
                      <div className='col-3'>
                        <div class='form-group'>
                          <label for='exampleFormControlSelect1'>
                            Phường/Xã:
                          </label>
                          <select
                            class='form-control'
                            id='exampleFormControlSelect1'
                          >
                            <option selected>Đại kim</option>
                          </select>
                        </div>
                      </div>
                      <div className='col'>
                        <div class='form-group'>
                          <label for='exampleInputEmail1'>Địa chỉ:</label>
                          <input
                            type='text'
                            class='form-control'
                            placeholder='Nghiêm Xuân Yêm,Đại im,Hoàng Mai,Hà Nội'
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='row justify-content-center'>
                  <div className='col'>
                    <div className='row'>
                      <div className='col font-weight-bold'>
                        2.Thông tin đăng ký tiêm chủng
                      </div>
                    </div>
                  </div>
                </div>
                <div className='row justify-content-center'>
                  <div className='col'>
                    <div className='row'>
                      <div className='col-2 '>
                        <div class='form-group'>
                          <label for='exampleFormControlSelect1'>
                            Đăng ký mũi tiêm:
                          </label>
                          <select
                            class='form-control'
                            id='exampleFormControlSelect1'
                          >
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                          </select>
                        </div>
                      </div>
                      <div className='col-2 '>
                        <div class='form-group'>
                          <label for='exampleFormControlSelect1'>
                            Loại vaccine:
                          </label>
                          <select
                            class='form-control'
                            id='exampleFormControlSelect1'
                          >
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                          </select>
                        </div>
                      </div>
                      <div className='col-2'>
                        <div class='form-group'>
                          <label for='exampleInputEmail1'>
                            Ngày muốn tiêm:
                          </label>
                          <input type='date' class='form-control' />
                        </div>
                      </div>
                      <div className='col-3'>
                        <div class='form-group'>
                          <label for='exampleFormControlSelect1'>
                            Buổi tiêm:
                          </label>
                          <select
                            class='form-control'
                            id='exampleFormControlSelect1'
                          >
                            <option selected>Sáng</option>
                            <option>Chiều</option>
                          </select>
                        </div>
                      </div>
                      <div className='col-3'>
                        <div class='form-group'>
                          <label for='exampleFormControlSelect1'>
                            Đơn vị tiêm:
                          </label>
                          <select
                            class='form-control'
                            id='exampleFormControlSelect1'
                          >
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  data-dismiss='modal'
                >
                  Huỷ
                </button>
                <button
                  type='button'
                  className='btn btn-primary'
                  onClick={handleSubmit}
                  data-dismiss='modal'
                >
                  {/* {action} */}
                  Thêm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalLookUp;
