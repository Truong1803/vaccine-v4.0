import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { refreshToken } from "../../redux/actions/authActions";
import { getDataQH } from "../../redux/actions/oganizationAction";
import { getDataVaccine } from "../../redux/actions/vaccineAction";

function ItemCertificate() {
  const dispatch = useDispatch();
  const { auth, vaccine, organization } = useSelector((state) => state);
  const page = 1;
  const search = "";
  useEffect(() => {
    if (Object.keys(auth).length !== 0) {
      dispatch(refreshToken());
      dispatch(getDataVaccine(page, search));
      dispatch(getDataQH(page, search, auth.access_token));
    }
  }, [dispatch]);

  return (
    <div className='row justify-content-center'>
      {auth?.user?.doseInformation[0] === undefined ? (
        <div className='col-8'>
          <h5>Chưa tiêm vắc xin</h5>
        </div>
      ) : (
        <div className='col-8'>
          <div className='row mt-4'>
            <div className='col-12 text-center'>
              <h5>CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM</h5>
              <h6>Độc lập - Tự do - Hạnh phúc</h6>
            </div>
          </div>
          <div className='row mt-4'>
            <div className='col-12 text-center'>
              <h4>GIẤY CHỨNG NHẬN TIÊM CHỦNG COVID 19</h4>
            </div>
          </div>
          <div className='row mt-4'>
            <div className='col-12 font-weight-bold'>1.Thông tin cá nhân</div>
            <div className='col-12'>
              <div className='row mt-2'>
                <div className='col-3'>
                  Họ và tên: <strong>{auth?.user?.name}</strong>
                </div>
                <div className='col-3'>
                  Giới tính: <strong>{auth?.user?.gender}</strong>
                </div>
                <div className='col-3'>
                  Ngày sinh: <strong>{auth?.user?.dob}</strong>
                </div>
                <div className='col-3'>
                  Số điện thoại: <strong>{auth?.user?.phonenumber}</strong>
                </div>
              </div>
              <div className='row mt-3'>
                <div className='col-3'>
                  CMND/CCCD: <strong>{auth?.user?.identification}</strong>
                </div>
                <div className='col-3'>
                  Số BHYT: <strong>{auth?.user?.bhyt}</strong>
                </div>
                <div className='col-6'>
                  Địa chỉ:{" "}
                  <strong>{`${auth?.user?.address}, ${auth?.user?.ward?.name}, ${auth?.user?.district?.name}, ${auth?.user?.province?.name}`}</strong>
                </div>
              </div>
            </div>
            <div className='col-12 mt-2 font-weight-bold'>
              2.Thông tin tiêm chủng
            </div>
            <div className='col-12'>
              <div className='row '>
                <div className='col-12'>Danh sách vaccine đã tiêm</div>
              </div>
              <div className='col-12 table-responsive table-hover '>
                <table className='table'>
                  <thead className='thead-light'>
                    <tr className='text-center'>
                      <th scope='col'>Mũi tiêm</th>
                      <th scope='col'>Ngày tiêm</th>
                      <th scope='col'>Thời gian tiêm</th>
                      <th scope='col'>Tên vaccine</th>
                      <th scope='col'>Địa điểm tiêm chủng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {auth?.user?.doseInformation.map((item, index) => (
                      <tr className='text-center' key={index}>
                        <td>{index + 1}</td>
                        <td>{item.injectionDate}</td>
                        <td>{item.time}</td>
                        {vaccine.map(
                          (v) =>
                            v._id === item.vaccineId && (
                              <td>{v.name_vaccine}</td>
                            )
                        )}
                        {organization.map(
                          (h) =>
                            h._id === item.healthOrganizationId && (
                              <td>{h.organization}</td>
                            )
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div
            className={`col-12 ${
              auth?.user?.doseInformation.length === 1
                ? "bg-warning"
                : "bg-success"
            } border border-dark rounded`}
          >
            <div className='row p-3'>
              <div className='col-3 text-center'>
                <p>{`Đã tiêm ${auth?.user?.doseInformation.length} mũi vắc xin`}</p>
                <div className='border border-dark text-center'>
                  <img
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png'
                    alt=''
                    style={{ width: 150 }}
                  />
                </div>
              </div>
              <div className='col-9 bg-light border border-dark rounded'>
                <div className='row'>
                  <div className='col-3 p-3'>
                    <span className='mr-2'>
                      <i className='fas fa-user'></i>
                    </span>
                    Họ và tên:
                  </div>
                  <div className='col-9 p-3'>
                    <strong>{auth?.user?.name}</strong>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-3 p-3'>
                    <span className='mr-2'>
                      <i className='fas fa-birthday-cake'></i>
                    </span>
                    Ngày sinh:
                  </div>
                  <div className='col-9 p-3'>
                    <strong>{auth?.user?.dob}</strong>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-3 p-3'>
                    <span className='mr-2'>
                      <i className='fas fa-id-card'></i>
                    </span>
                    CMND/CCCD:
                  </div>
                  <div className='col-9 p-3'>
                    <strong>{auth?.user?.identification}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ItemCertificate;
