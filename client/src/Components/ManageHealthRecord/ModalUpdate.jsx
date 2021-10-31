import React, {
  useEffect,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  updatePostInjection,
  updatePreInjection,
} from '../../redux/actions/injection_inforAction';
import { getDataSideEffect } from '../../redux/actions/sideEffectAction';

const initPreState = {
  temperature: "",
  bloodVessel: "",
  bloodPressure: "",
  breathing: "",
  injectorPreName: "",
  timePre: "",
};
const initPostState = {
  nameReact: "",
  injectorPostName: "",
  timePost: "",
};
function ModalUpdate({ dataUpdate, setCallback, callback }) {
  const dispatch = useDispatch();
  const { auth, sideEffect } = useSelector((state) => state);

  const [data, setData] = useState("");
  useEffect(() => {
    dispatch(getDataSideEffect());
    if (dataUpdate) {
      if (dataUpdate.status === false) {
        setData(initPreState);
      } else if (dataUpdate.status === true) {
        setData(initPostState);
      }
    }
  }, [dataUpdate, dataUpdate.status, dispatch]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = () => {
    setCallback(!callback);
    if (dataUpdate.status === false) {
      dispatch(updatePreInjection(data, dataUpdate._id, auth.access_token));
    } else {
      dispatch(updatePostInjection(data, dataUpdate._id, auth.access_token));
    }
  };

  return (
    <div>
      <div
        className="modal fade"
        id="exampleModal3"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
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
                  <div className="col-12">1.Khám sàng lọc</div>
                </div>

                <div className="col-12 mt-2">
                  <div className="row">
                    <div className="col-6">
                      <div className="form-group row">
                        <label className="col-3">Loại vaccine: </label>
                        <div className="col-9">
                          <input
                            type="text"
                            className="form-control"
                            value={dataUpdate.vaccine?.name_vaccine}
                            disabled={true}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="row">
                        <div className="col-5">Đơn vị tiêm chủng:</div>
                        <div className="col-7">
                          <input
                            type="text"
                            className="form-control"
                            value={dataUpdate.organization?.organization}
                            disabled={true}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <div className="row">
                        <div className="col-5">Nhiệt độ:</div>
                        <div className="col-4">
                          <input
                            type="text"
                            className="form-control"
                            name="temperature"
                            value={
                              dataUpdate.status === false
                                ? data?.temperature
                                : dataUpdate.preInjectionReaction?.temperature
                            }
                            disabled={dataUpdate.status}
                            onChange={handleOnChange}
                          />
                        </div>
                        <div className="col-3">độ C;</div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="row">
                        <div className="col-5">Huyết áp:</div>
                        <div className="col-4">
                          <input
                            type="text"
                            className="form-control"
                            name="bloodPressure"
                            value={
                              dataUpdate.status === false
                                ? data.bloodPressure
                                : dataUpdate.preInjectionReaction?.bloodPressure
                            }
                            disabled={dataUpdate.status}
                            onChange={handleOnChange}
                          />
                        </div>
                        <div className="col-3">mmHg;</div>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-6">
                      <div className="row">
                        <div className="col-5">Mạch:</div>
                        <div className="col-4">
                          <input
                            type="text"
                            className="form-control"
                            name="bloodVessel"
                            value={
                              dataUpdate.status === false
                                ? data.bloodVessel
                                : dataUpdate.preInjectionReaction?.bloodVessel
                            }
                            disabled={dataUpdate.status}
                            onChange={handleOnChange}
                          />
                        </div>
                        <div className="col-3">Lần/phút;</div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="row">
                        <div className="col-5">Nhịp thở:</div>
                        <div className="col-4">
                          <input
                            type="text"
                            className="form-control"
                            name="breathing"
                            value={
                              dataUpdate.status === false
                                ? data.breathing
                                : dataUpdate.preInjectionReaction?.breathing
                            }
                            disabled={dataUpdate.status}
                            onChange={handleOnChange}
                          />
                        </div>
                        <div className="col-3">Lần/phút;</div>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-6">
                      <div className="row">
                        <div className="col-5">Người thực hiện khám:</div>
                        <div className="col-6">
                          <input
                            type="text"
                            className="form-control"
                            name="injectorPreName"
                            value={
                              dataUpdate.status === false
                                ? data.injectorPreName
                                : dataUpdate.preInjectionReaction
                                    ?.injectorPreName
                            }
                            disabled={dataUpdate.status}
                            onChange={handleOnChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-12 mt-2">
                      <div className="row">
                        <div className="col-2">Thời gian:</div>
                        <div className="col-2">
                          <input
                            type="text"
                            className="form-control"
                            name="timePre"
                            value={
                              dataUpdate.status === false
                                ? data.timePre
                                : dataUpdate.preInjectionReaction?.timePre
                            }
                            disabled={dataUpdate.status}
                            onChange={handleOnChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">2.Phản ứng sau tiêm</div>
                </div>
                <div className="col-12">
                  <div className="row">
                    <div className="form-group col-12">
                      {/* <input
                        type="text"
                        className="form-control"
                        name="nameReact"
                        value={data.nameReact}
                        disabled={!dataUpdate.status}
                        onChange={handleOnChange}
                      /> */}
                      <select
                        id="inputState"
                        className="form-control col-8"
                        name="nameReact"
                        value={data.nameReact}
                        disabled={!dataUpdate.status}
                        onChange={handleOnChange}
                      >
                        <option hidden={true}>Chọn phản ứng</option>
                        {sideEffect.map((item) => (
                          <option key={item._id} value={item._id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-6">
                      <div className="row">
                        <div className="col-5">Người thực hiện khám:</div>
                        <div className="col-6">
                          <input
                            type="text"
                            className="form-control"
                            name="injectorPostName"
                            value={data.injectorPostName}
                            disabled={!dataUpdate.status}
                            onChange={handleOnChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-12 mt-2">
                      <div className="row">
                        <div className="col-2">Thời gian:</div>
                        <div className="col-2">
                          <input
                            type="text"
                            className="form-control"
                            name="timePost"
                            value={data.timePost}
                            disabled={!dataUpdate.status}
                            onChange={handleOnChange}
                          />
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
                Huỷ
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
                onClick={handleSubmit}
              >
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalUpdate;
