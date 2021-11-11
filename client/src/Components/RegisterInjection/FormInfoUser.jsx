import React, { useEffect } from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { getDataCompany } from '../../redux/actions/companyAction';
import { getDataQH } from '../../redux/actions/oganizationAction';
import { getDataVaccine } from '../../redux/actions/vaccineAction';
import { ALERT } from '../../redux/containt';

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
      setData({ ...data, dose: auth?.user?.doseInformation.length + 1 });
      if (auth.user?.doseInformation.length !== 0) {
        setData({
          ...data,
          dose: auth?.user?.doseInformation.length + 1,
          vaccineId:
            auth.user?.doseInformation[auth.user?.doseInformation.length - 1]
              .vaccineId,
        });
      }
    }
  }, [auth.access_token, auth.user?.doseInformation, dispatch]);

  const handleNextPage = () => {
    console.log(data);
    if (data) {
      if (
        data.healthOrganizationId === "" ||
        data.dose === "" ||
        data.injectionDate === "" ||
        data.vaccineId === ""
      ) {
        dispatch({
          type: ALERT,
          payload: { errors: "Bạn cần điền đầy đủ thông tin" },
        });
      } else {
        setData({ ...data, userId: auth.user._id });
        setStatus(status + 1);
      }
    }
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
              value={auth?.user?.doseInformation.length + 1}
              onChange={handleOnChange}
              disabled={true}
              defaultValue={auth?.user?.doseInformation.length + 1}
            >
              <option
                selected={true}
                value={auth?.user?.doseInformation.length + 1}
              >
                Mũi tiêm thứ {auth?.user?.doseInformation.length + 1}
              </option>
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
                      key={item._id}
                      type="text"
                      className="form-control"
                      name="vaccineId"
                      value={item.name_vaccine}
                      onChange={handleOnChange}
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
            <div className="col-7"></div>
            <div className="col-5">
              <div className="row">
                <button type="button" className="btn btn-danger  mr-5 col-4">
                  Huỷ
                </button>
                <button
                  type="button"
                  className="btn btn-primary  col-4"
                  onClick={handleNextPage}
                  disabled={false}
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
