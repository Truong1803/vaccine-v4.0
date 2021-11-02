import React, { useState } from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  InjectionRegisterOrgan,
} from '../../redux/actions/injectionRegisterOrganAction';

function FormImport() {
  const [file, setFile] = useState("");

  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);

  const handleUpload = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];

    let formData = new FormData();
    formData.append("file", file);
    setFile(formData);
  };

  const handleOnSubmit = () => {
    dispatch(InjectionRegisterOrgan(file, auth.access_token));
  };
  return (
    <div
      className="modal fade"
      id="exampleModal2"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Import file
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
            <div className="row justify-content-center align-items-center">
              <div className="col-6 ">
                <input
                  type="file"
                  name="file"
                  id="file_up"
                  onChange={handleUpload}
                />
              </div>
              <div className="col-6">
                <div className="">Bước 1: Tải file mẫu và cập nhật dữ liệu</div>
                <div className="">
                  Bước 2: Tải công cụ chuẩn hoá dữ liệu trên file mẫu nếu cần
                  tại <button>đây</button>
                </div>
                <div className="">Bước 3: Tải file lên hệ thống</div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Đóng
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleOnSubmit}
              data-dismiss="modal"
            >
              Tải file
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormImport;
