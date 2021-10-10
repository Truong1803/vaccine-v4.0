import React, { useState } from "react";

function InjectionPlan({ setShowPlan }) {
  const [data, setData] = useState([]);

  const handleOnclickPlan = () => {
    setShowPlan(false);
  };

  const handleSubmit = () => {};
  return (
    <div>
      <div>
        <div
          className="modal fade"
          id="exampleModal2"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Thiết lập kế hoạch tiêm chủng
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
                  <div className="col-6">
                    <p>
                      Danh sách người đăng ký theo ngày: 10/10/2021
                      {/* thời gian lấy theo form bên cạnh */}
                    </p>
                  </div>
                  <div className="col-4 row">
                    <div class="form-group row align-items-center justify-content-center">
                      <label for="exampleInputEmail1" className="col-6">
                        Chọn ngày tiêm :
                      </label>
                      <input
                        type="date"
                        className="form-control col-6"
                        id="exampleInputEmail1"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 table-responsive table-hover ">
                    <table className="table">
                      <thead className="thead-dark">
                        <tr className="text-center">
                          <th scope="col">Họ và tên</th>
                          <th scope="col">Giới tính</th>
                          <th scope="col">Số điện thoại</th>
                          <th scope="col">CMT/CCCD</th>
                          <th scope="col">Ngày đăng ký</th>
                          <th scope="col">Trạng thái</th>
                          <th scope="col">Chi tiết</th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="text-center ">
                          <td>Ngô Trung Sơn</td>
                          <td>Nam</td>
                          <td>0344174212</td>
                          <td>001200008471</td>
                          <td>22/09/2021</td>
                          <td className="text-danger">chưa duyệt</td>

                          <td>
                            <div className="row justify-content-center">
                              <button
                                type="button"
                                className="btn btn-info col-6"
                                data-toggle="modal"
                                data-target="#exampleModal"
                                //   onClick={() => {
                                //     handleOnClick(item, "Xem", true);
                                //   }}
                              >
                                <i className="far fa-eye"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col">
                    <div className="row">
                      <div className="col-2 ">
                        <div class="form-group">
                          <label for="exampleFormControlSelect1">
                            Đăng ký mũi tiêm:
                          </label>
                          <select
                            class="form-control"
                            id="exampleFormControlSelect1"
                          >
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
                          <label for="exampleFormControlSelect1">
                            Loại vaccine:
                          </label>
                          <select
                            class="form-control"
                            id="exampleFormControlSelect1"
                          >
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-2">
                        <div class="form-group">
                          <label for="exampleInputEmail1">
                            Ngày muốn tiêm:
                          </label>
                          <input type="date" class="form-control" />
                        </div>
                      </div>
                      <div className="col-3">
                        <div class="form-group">
                          <label for="exampleFormControlSelect1">
                            Buổi tiêm:
                          </label>
                          <select
                            class="form-control"
                            id="exampleFormControlSelect1"
                          >
                            <option selected>Sáng</option>
                            <option>Chiều</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-3">
                        <div class="form-group">
                          <label for="exampleFormControlSelect1">
                            Đơn vị tiêm:
                          </label>
                          <select
                            class="form-control"
                            id="exampleFormControlSelect1"
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

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={handleOnclickPlan}
                >
                  Huỷ
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  // onClick={handleOnclickPlan}
                  data-dismiss="modal"
                >
                  {/* {action} */}
                  Duyệt
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InjectionPlan;
