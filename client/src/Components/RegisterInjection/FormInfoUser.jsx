import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataVaccine } from "../../redux/actions/vaccineAction";
import { getDataQH } from "../../redux/actions/oganizationAction";
import axios from "axios";

function FormInfoUser({ data, setData }) {
  const dispatch = useDispatch();

  const { auth, vaccine, organization } = useSelector((state) => state);

  const [tinh, setTinh] = useState([]);
  const [huyen, setHuyen] = useState([]);
  const [phuong, setPhuong] = useState([]);
  const [provinceId, setProvinceId] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [wardId, setWardId] = useState("");

  const isFirstRun = useRef(true);
  const isFirstRun1 = useRef(true);

  useEffect(() => {
    setData(auth.user);
    setProvinceId(auth.user.province.id);
    setDistrictId(auth.user.district.id);
    setWardId(auth.user.ward.id);
  }, []);

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

  useEffect(() => {
    dispatch(getDataVaccine());
    dispatch(getDataQH(1, "", auth.access_token));
  }, []);
  return (
    <div>
      <div className="row justify-content-center mt-4">
        <div className="col-2 ">
          <div class="form-group">
            <label for="exampleFormControlSelect1">Đăng ký mũi tiêm:</label>
            <select class="form-control" id="exampleFormControlSelect1">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>
        </div>
        <div className="col-2 ">
          <div class="form-group">
            <label for="exampleFormControlSelect1">Loại vaccine:</label>
            <select class="form-control" id="exampleFormControlSelect1">
              <option hidden={true}>Lựa chọn vắc xin</option>
              {vaccine.map((option) => (
                <option key={option._id} value={option._id}>
                  {option.name_vaccine}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-4">
          <div class="form-group">
            <label for="exampleFormControlSelect1">Đơn vị tiêm:</label>
            <select class="form-control" id="exampleFormControlSelect1">
              <option hidden={true}>Lựa chọn đơn vị tiêm</option>
              {organization.map((option) => (
                <option key={option._id} value={option._id}>
                  {option.organization}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-8">
          <p className="font-weight-bold">1. Thông tin người đăng ký tiêm:</p>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-8">
          <div className="row">
            <div className="col-3">
              <div class="form-group">
                <label for="exampleInputEmail1">Họ và tên:</label>
                <input
                  type="text"
                  class="form-control"
                  value={auth.user.name}
                  disabled={true}
                />
              </div>
            </div>
            <div className="col-3">
              <div class="form-group">
                <label for="exampleInputEmail1">Ngày sinh:</label>
                <input
                  type="date"
                  class="form-control"
                  value={auth.user.dob}
                  disabled={true}
                />
              </div>
            </div>
            <div className="col-3">
              <div class="form-group">
                <label for="exampleFormControlSelect1">Giới tính:</label>
                <input
                  type="text"
                  className="form-control"
                  value={auth.user.gender}
                  disabled={true}
                />
              </div>
            </div>
            <div className="col-3">
              <div class="form-group">
                <label for="exampleInputEmail1">Số điện thoại:</label>
                <input
                  type="text"
                  class="form-control"
                  value={auth.user.phonenumber}
                  disabled={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-8">
          <div className="row">
            <div className="col-3">
              <div class="form-group">
                <label for="exampleInputEmail1">Email:</label>
                <input
                  type="email"
                  class="form-control"
                  value={auth.user.email}
                  disabled={true}
                />
              </div>
            </div>
            <div className="col-3">
              <div class="form-group">
                <label for="exampleInputEmail1">CCCD/CMND:</label>
                <input
                  type="text"
                  class="form-control"
                  value={auth.user.identification}
                  disabled={true}
                />
              </div>
            </div>
            <div className="col-3">
              <div class="form-group">
                <label for="exampleInputEmail1">Số thẻ BHYT:</label>
                <input
                  type="text"
                  class="form-control"
                  value={auth.user.bhyt}
                  disabled={true}
                />
              </div>
            </div>
            <div className="col-3">
              <div class="form-group">
                <label for="exampleInputEmail1">Nghề nghiệp:</label>
                <input type="text" class="form-control" value />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-8">
          <div className="row">
            <div className="col-3">
              <div class="form-group">
                <label for="exampleInputEmail1">Đơn vị công tác:</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Thanglong university"
                />
              </div>
            </div>
            <div className="col-3">
              <div class="form-group">
                <label for="exampleFormControlSelect1">Tỉnh/Thành phố:</label>
                <select class="form-control" id="exampleFormControlSelect1">
                  <option selected>Hà Nội</option>
                </select>
              </div>
            </div>
            <div className="col-3">
              <div class="form-group">
                <label for="exampleFormControlSelect1">Quận/Huyện:</label>
                <select class="form-control" id="exampleFormControlSelect1">
                  <option selected>Hoàng Mai</option>
                </select>
              </div>
            </div>
            <div className="col-3">
              <div class="form-group">
                <label for="exampleFormControlSelect1">Phường/Xã:</label>
                <select class="form-control" id="exampleFormControlSelect1">
                  <option selected>Đại kim</option>
                </select>
              </div>
            </div>
            <div className="col">
              <div class="form-group">
                <label for="exampleInputEmail1">Địa chỉ:</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Nghiêm Xuân Yêm,Đại im,Hoàng Mai,Hà Nội"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-8">
          <div className="row">
            <p className="font-weight-bold">2.Thông tin đăng ký tiêm chủng</p>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-8">
          <div className="row">
            <div className="col-3">
              <div class="form-group">
                <label for="exampleInputEmail1">Ngày tiêm dự kiến:</label>
                <input type="date" class="form-control" />
              </div>
            </div>
            <div className="col-3">
              <div class="form-group">
                <label for="exampleFormControlSelect1">Buổi tiêm:</label>
                <select class="form-control" id="exampleFormControlSelect1">
                  <option selected>Sáng</option>
                  <option>Chiều</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-8">
          <div className="row justify-content-between">
            <div className="col-4"></div>
            <div className="col-4">
              <div className="row ">
                <button type="button" class="btn btn-danger  mr-5 col-4">
                  Huỷ
                </button>
                <button type="button" class="btn btn-primary  col-4">
                  Tiếp theo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormInfoUser;
