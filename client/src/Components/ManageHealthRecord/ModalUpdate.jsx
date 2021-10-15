import React from "react";

function ModalUpdate() {
  return (
    <div>
      <div
        className='modal fade'
        id='exampleModal3'
        tabindex='-1'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalLabel'>
                Thông tin chi tiết tiêm chủng
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
              <div>
                <div className='row'>
                  <div className='col-12'>1.Khám sàng lọc</div>
                </div>

                <div className='col-12 mt-2'>
                  <div className='row'>
                    <div className='col-6'>
                      <div className='form-group row'>
                        <label className='col-3'>Loại vaccine: </label>
                        <div className='col-9'>
                          <select className='form-control'>
                            <option value=''>Astra</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className='col-6'>
                      <div className='row'>
                        <div className='col-5'>Đơn vị tiêm chủng:</div>
                        <div className='col-7'>
                          <input type='text' className='form-control' />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-6'>
                      <div className='row'>
                        <div className='col-5'>Nhiệt độ:</div>
                        <div className='col-4'>
                          <input type='text' className='form-control' />
                        </div>
                        <div className='col-3'>độ C;</div>
                      </div>
                    </div>
                    <div className='col-6'>
                      <div className='row'>
                        <div className='col-5'>Huyết áp:</div>
                        <div className='col-4'>
                          <input type='text' className='form-control' />
                        </div>
                        <div className='col-3'>mmHg;</div>
                      </div>
                    </div>
                  </div>
                  <div className='row mt-2'>
                    <div className='col-6'>
                      <div className='row'>
                        <div className='col-5'>Mạch:</div>
                        <div className='col-4'>
                          <input type='text' className='form-control' />
                        </div>
                        <div className='col-3'>Lần/phút;</div>
                      </div>
                    </div>
                    <div className='col-6'>
                      <div className='row'>
                        <div className='col-5'>Nhịp thở:</div>
                        <div className='col-4'>
                          <input type='text' className='form-control' />
                        </div>
                        <div className='col-3'>Lần/phút;</div>
                      </div>
                    </div>
                  </div>
                  <div className='row mt-2'>
                    <div className='col-6'>
                      <div className='row'>
                        <div className='col-5'>Người thực hiện khám:</div>
                        <div className='col-6'>
                          <input type='text' className='form-control' />
                        </div>
                      </div>
                    </div>
                    <div className='col-12 mt-2'>
                      <div className='row'>
                        <div className='col-2'>Thời gian:</div>
                        <div className='col-1'>
                          <input type='text' className='form-control' />
                        </div>
                        <div className='col-1'>Giờ</div>
                        <div className='col-1'>
                          <input type='text' className='form-control' />
                        </div>
                        <div className='col-1'>phút</div>
                        <div className='col-3'>
                          <input type='date' className='form-control' />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-12'>4.Phản ứng sau tiêm</div>
                </div>
                <div className='col-12'>
                  <div className='row'>
                    <div className='form-group col-12'>
                      <input type='text' className='form-control' />
                    </div>
                  </div>
                  <div className='row mt-2'>
                    <div className='col-6'>
                      <div className='row'>
                        <div className='col-5'>Người thực hiện khám:</div>
                        <div className='col-6'>
                          <input type='text' className='form-control' />
                        </div>
                      </div>
                    </div>
                    <div className='col-12 mt-2'>
                      <div className='row'>
                        <div className='col-2'>Thời gian:</div>
                        <div className='col-1'>
                          <input type='text' className='form-control' />
                        </div>
                        <div className='col-1'>Giờ</div>
                        <div className='col-1'>
                          <input type='text' className='form-control' />
                        </div>
                        <div className='col-1'>phút</div>
                        <div className='col-3'>
                          <input type='date' className='form-control' />
                        </div>
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
                Close
              </button>
              <button type='button' className='btn btn-primary'>
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalUpdate;
