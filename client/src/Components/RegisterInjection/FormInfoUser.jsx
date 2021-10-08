import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataVaccine } from "../../redux/actions/vaccineAction";
import { getDataQH } from "../../redux/actions/oganizationAction";
import { getDataCompany } from "../../redux/actions/companyAction";

function FormInfoUser({ data, setData, setStatus, status }) {
  const dispatch = useDispatch();

  const { auth, vaccine, organization, company } = useSelector(
    (state) => state
  );

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  useEffect(() => {
    dispatch(getDataVaccine());
    dispatch(getDataQH(1, "", auth.access_token));
    dispatch(getDataCompany(1, "", auth.access_token));
  }, []);

  const handleNextPage = () => {
    setStatus(status + 1);
    setData({ ...data, userId: auth.user._id });
  };
  return (
    <div>
      <div className="row justify-content-center mt-4">
        <div className="col-2 ">
          <div class="form-group">
            <label for="exampleFormControlSelect1">Đăng ký mũi tiêm:</label>
            <select
              class="form-control"
              id="exampleFormControlSelect1"
              name="dose"
              value={data.dose}
              onChange={handleOnChange}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </div>
        </div>
        <div className="col-2 ">
          <div class="form-group">
            <label for="exampleFormControlSelect1">Loại vaccine:</label>
            <select
              class="form-control"
              id="exampleFormControlSelect1"
              value={data.vaccineId}
              onChange={handleOnChange}
              name="vaccineId"
            >
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
            <select
              class="form-control"
              id="exampleFormControlSelect1"
              name="healthOrganizationId"
              value={data.healthOrganizationId}
              onChange={handleOnChange}
            >
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
                <input
                  type="text"
                  class="form-control"
                  value={auth.user.job}
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
                <label for="exampleInputEmail1">Đơn vị công tác:</label>
                <input
                  type="text"
                  class="form-control"
                  value={auth.user.job}
                  disabled={true}
                />
              </div>
            </div>
            <div className="col-3">
              <div class="form-group">
                <label for="exampleFormControlSelect1">Tỉnh/Thành phố:</label>
                <input
                  type="text"
                  class="form-control"
                  value={auth.user.province.name}
                  disabled={true}
                />
              </div>
            </div>
            <div className="col-3">
              <div class="form-group">
                <label for="exampleFormControlSelect1">Quận/Huyện:</label>
                <input
                  type="text"
                  class="form-control"
                  value={auth.user.district.name}
                  disabled={true}
                />
              </div>
            </div>
            <div className="col-3">
              <div class="form-group">
                <label for="exampleFormControlSelect1">Phường/Xã:</label>
                <input
                  type="text"
                  class="form-control"
                  value={auth.user.ward.name}
                  disabled={true}
                />
              </div>
            </div>
            <div className="col">
              <div class="form-group">
                <label for="exampleInputEmail1">Địa chỉ:</label>
                <input
                  type="text"
                  class="form-control"
                  value={auth.user.address}
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
                <input
                  type="date"
                  class="form-control"
                  value={data.injectionDate}
                  onChange={handleOnChange}
                  name="injectionDate"
                />
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
                <button
                  type="button"
                  class="btn btn-primary  col-4"
                  onClick={handleNextPage}
                >
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
