import React, { useEffect } from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { getDataCompany } from '../../redux/actions/companyAction';
import { getDataQH } from '../../redux/actions/oganizationAction';
import { getDataVaccine } from '../../redux/actions/vaccineAction';

function FormInfoUser({ data, setData, setStatus, status }) {
  const dispatch = useDispatch();

  const { auth, vaccine, organization } = useSelector((state) => state);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  useEffect(() => {
    dispatch(getDataVaccine());
    if (auth.access_token) {
      dispatch(getDataQH(1, "", auth.access_token));
      dispatch(getDataCompany(1, "", auth.access_token));
      if (auth.user?.doseInformation.length !== 0) {
        setData({
          ...data,
          vaccineId:
            auth.user?.doseInformation[auth.user?.doseInformation.length - 1]
              .vaccineId,
        });
      }
    }
  }, [auth.access_token]);

  const handleNextPage = () => {
    setStatus(status + 1);
    setData({ ...data, userId: auth.user._id });
  };
  return (
    <div>
      <div className="row justify-content-center mt-4">
        <div className="col-2 ">
          <div className="form-group">
            <label htmlFor="exampleFormControlSelect1">Đăng ký mũi tiêm:</label>
            <select
              className="form-control"
              id="exampleFormControlSelect1"
              name="dose"
              value={data.dose}
              onChange={handleOnChange}
            >
              <option hidden={true}>Lựa chọn mũi tiêm</option>
              {auth.user?.doseInformation.length === 0 ? (
                <>
                  <option value={1}>Mũi tiêm thứ nhất</option>
                  <option value={2}>Mũi tiêm thứ hai</option>
                </>
              ) : auth.user?.doseInformation.length === 1 ? (
                <option value={2}>Mũi tiêm thứ hai</option>
              ) : (
                "Bạn đã tiêm đủ"
              )}
            </select>
          </div>
        </div>
        <div className="col-2 ">
          <div className="form-group">
            <label htmlFor="exampleFormControlSelect1">Loại vaccine:</label>
            {auth.user?.doseInformation.length === 0 ? (
              <select
                className="form-control"
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
            ) : (
              vaccine.map(
                (item) =>
                  item._id ===
                    auth.user?.doseInformation[
                      auth.user?.doseInformation.length - 1
                    ].vaccineId && (
                    <input
                      type="text"
                      className="form-control"
                      name="vaccineId"
                      value={item.name_vaccine}
                      onChange={handleOnChange}
                      name="vaccineId"
                      disabled={true}
                    />
                  )
              )
            )}
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <label htmlFor="exampleFormControlSelect1">Đơn vị tiêm:</label>
            <select
              className="form-control"
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
      {/* <div className="row justify-content-center">
        <div className="col-8">
          <p className="font-weight-bold">1. Thông tin người đăng ký tiêm:</p>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-8">
          <div className="row">
            <div className="col-3">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Họ và tên:</label>
                <input
                  type="text"
                  className="form-control"
                  value={auth.user.name}
                  disabled={true}
                />
              </div>
            </div>
            <div className="col-3">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Ngày sinh:</label>
                <input
                  type="date"
                  className="form-control"
                  value={auth.user.dob}
                  disabled={true}
                />
              </div>
            </div>
            <div className="col-3">
              <div className="form-group">
                <label htmlFor="exampleFormControlSelect1">Giới tính:</label>
                <input
                  type="text"
                  className="form-control"
                  value={auth.user.gender}
                  disabled={true}
                />
              </div>
            </div>
            <div className="col-3">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Số điện thoại:</label>
                <input
                  type="text"
                  className="form-control"
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
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email:</label>
                <input
                  type="email"
                  className="form-control"
                  value={auth.user.email}
                  disabled={true}
                />
              </div>
            </div>
            <div className="col-3">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">CCCD/CMND:</label>
                <input
                  type="text"
                  className="form-control"
                  value={auth.user.identification}
                  disabled={true}
                />
              </div>
            </div>
            <div className="col-3">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Số thẻ BHYT:</label>
                <input
                  type="text"
                  className="form-control"
                  value={auth.user.bhyt}
                  disabled={true}
                />
              </div>
            </div>
            <div className="col-3">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Nghề nghiệp:</label>
                <input
                  type="text"
                  className="form-control"
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
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Đơn vị công tác:</label>
                <input
                  type="text"
                  className="form-control"
                  value={auth.user.job}
                  disabled={true}
                />
              </div>
            </div>
            <div className="col-3">
              <div className="form-group">
                <label htmlFor="exampleFormControlSelect1">
                  Tỉnh/Thành phố:
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={auth.user.province.name}
                  disabled={true}
                />
              </div>
            </div>
            <div className="col-3">
              <div className="form-group">
                <label htmlFor="exampleFormControlSelect1">Quận/Huyện:</label>
                <input
                  type="text"
                  className="form-control"
                  value={auth.user.district.name}
                  disabled={true}
                />
              </div>
            </div>
            <div className="col-3">
              <div className="form-group">
                <label htmlFor="exampleFormControlSelect1">Phường/Xã:</label>
                <input
                  type="text"
                  className="form-control"
                  value={auth.user.ward.name}
                  disabled={true}
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Địa chỉ:</label>
                <input
                  type="text"
                  className="form-control"
                  value={auth.user.address}
                  disabled={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div> */}
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
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Ngày tiêm dự kiến:</label>
                <input
                  type="date"
                  className="form-control"
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
                <button type="button" className="btn btn-danger  mr-5 col-4">
                  Huỷ
                </button>
                <button
                  type="button"
                  className="btn btn-primary  col-4"
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
