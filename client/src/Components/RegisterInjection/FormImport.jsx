import React from "react";
import { Form } from "react-bootstrap";
function FormImport() {
  return (
    <div
      class='modal fade'
      id='exampleModal2'
      tabindex='-1'
      aria-labelledby='exampleModalLabel'
      aria-hidden='true'
    >
      <div class='modal-dialog modal-lg'>
        <div class='modal-content'>
          <div class='modal-header'>
            <h5 class='modal-title' id='exampleModalLabel'>
              Import file
            </h5>
            <button
              type='button'
              class='close'
              data-dismiss='modal'
              aria-label='Close'
            >
              <span aria-hidden='true'>&times;</span>
            </button>
          </div>
          <div class='modal-body'>
            <div className='row justify-content-center align-items-center'>
              <div className='col-6 '>
                <Form.Group controlId='formFile' className='mb-3'>
                  <Form.Control type='file' />
                </Form.Group>
              </div>
              <div className='col-6'>
                <div className=''>Bước 1: Tải file mẫu và cập nhật dữ liệu</div>
                <div className=''>
                  Bước 2: Tải công cụ chuẩn hoá dữ liệu trên file mẫu nếu cần
                  tại <a href=''>đây</a>
                </div>
                <div className=''>Bước 3: Tải file lên hệ thống</div>
              </div>
            </div>
          </div>
          <div class='modal-footer'>
            <button
              type='button'
              class='btn btn-secondary'
              data-dismiss='modal'
            >
              Đóng
            </button>
            <button type='button' class='btn btn-primary'>
              Tải file
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormImport;
