import React from "react";

function ModalDetail() {
  return (
    <div>
      <div
        className="modal fade"
        id="exampleModal2"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Thông tin chi tiết tiêm chủng
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
              <div>
                <div className="row">
                  <div className="col-12">1.Thông tin tiêm chủng</div>
                </div>
                <div className="col-12">
                  <div className="row">
                    <div className="col-6">
                      <div className="form-group row">
                        <label className="col-4 col-form-label">
                          Mũi tiêm số:
                        </label>
                        <div className="col-8">
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group row">
                        <label className="col-4 col-form-label">
                          Tên vaccine:
                        </label>
                        <div className="col-8">
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group row">
                        <label className="col-3 col-form-label">
                          Đơn vị tiêm chủng:
                        </label>
                        <div className="col-9">
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 mb-2">2.Tiền sử bệnh</div>
                </div>
                <div className="col-12">
                  <div className="row">
                    <div className="col-12">
                      + Tiền sử dị ứng với các di nguyên
                    </div>
                    <div className="col-12">
                      + Tiền sử dị ứng với các di nguyên
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">3.Khám sàng lọc</div>
                </div>
                <div className="col-12 mt-2">
                  <div className="col-12">
                    <div className="row">
                      <div className="col-2">Nhiệt độ:</div>
                      <div className="col-2">
                        <input type="text" className="form-control" />
                      </div>
                      <div className="col-3">độ C;</div>
                    </div>
                  </div>
                  <div className="col-12 mt-2">
                    <div className="row">
                      <div className="col-2">Huyết áp:</div>
                      <div className="col-2">
                        <input type="text" className="form-control" />
                      </div>
                      <div className="col-3">mmHg;</div>
                    </div>
                  </div>
                  <div className="col-12 mt-2">
                    <div className="row">
                      <div className="col-2">Mạch:</div>
                      <div className="col-2">
                        <input type="text" className="form-control" />
                      </div>
                      <div className="col-3">lần/phút;</div>
                    </div>
                  </div>
                  <div className="col-12 mt-2">
                    <div className="row">
                      <div className="col-2">Nhịp thở:</div>
                      <div className="col-2">
                        <input type="text" className="form-control" />
                      </div>
                      <div className="col-3">lần/phút;</div>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-6">
                      <div className="row">
                        <div className="col-6">Người thực hiện khám:</div>
                        <div className="col-6">
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                    </div>
                    <div className="col-12 mt-2">
                      <div className="row">
                        <div className="col-2">Thời gian:</div>
                        <div className="col-1">
                          <input type="text" className="form-control" />
                        </div>
                        <div className="col-1">giờ</div>
                        <div className="col-1">
                          <input type="text" className="form-control" />
                        </div>
                        <div className="col-1">phút</div>
                        <div className="col-3">
                          <input type="date" className="form-control" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">4.Phản ứng sau tiêm</div>
                </div>
                <div className="col-12">
                  <div className="row">
                    <div className="col-12">+ Sốt cao</div>
                    <div className="col-12">+ Đau nhức toàn thân</div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-6">
                      <div className="row">
                        <div className="col-6">Người thực hiện tiêm:</div>
                        <div className="col-6">
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                    </div>
                    <div className="col-12 mt-2">
                      <div className="row">
                        <div className="col-2">Thời gian:</div>
                        <div className="col-1">
                          <input type="text" className="form-control" />
                        </div>
                        <div className="col-1">giờ</div>
                        <div className="col-1">
                          <input type="text" className="form-control" />
                        </div>
                        <div className="col-1">phút</div>
                        <div className="col-3">
                          <input type="date" className="form-control" />
                        </div>
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
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalDetail;
