import React, {
  useEffect,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { getDataDisease } from '../../redux/actions/diseaseAction';
import { getDataSideEffect } from '../../redux/actions/sideEffectAction';
import { updateRecord } from '../../redux/actions/userAction';

function ModalDetail({ dataLookupDetail, action, userId }) {
  const dispatch = useDispatch();
  const { disease, sideEffect, auth } = useSelector((state) => state);

  const [dataPre, setDataPre] = useState([]);
  const [dataPost, setDataPost] = useState([]);

  useEffect(() => {
    setDataPre(dataLookupDetail?.preInjectionReaction);
    setDataPost(dataLookupDetail?.postInjectionReaction);
    dispatch(getDataDisease());
    dispatch(getDataSideEffect());
  }, [
    dispatch,
    dataLookupDetail?.postInjectionReaction,
    dataLookupDetail?.preInjectionReaction,
  ]);

  const handleOnchangePre = (e) => {
    const { name, value } = e.target;
    setDataPre({ ...dataPre, [name]: value });
  };
  const handleOnchangePost = (e) => {
    const { name, value } = e.target;
    setDataPost({ ...dataPost, [name]: value });
  };

  const handleSubmit = () => {
    const {
      temperature,
      bloodVessel,
      bloodPressure,
      breathing,
      injectorPreName,
      timePre,
    } = dataPre;
    const {
      dose,
      injectionDate,
      diseaseId,
      vaccineId,
      time,
      healthOrganizationId,
    } = dataLookupDetail;
    const data = {
      dose,
      injectionDate,
      vaccineId,
      time,
      diseaseId,
      healthOrganizationId,
      preInjectionReaction: {
        temperature: parseFloat(temperature),
        bloodVessel: parseInt(bloodVessel),
        bloodPressure,
        breathing: parseInt(breathing),
        injectorPreName,
        timePre,
      },
      postInjectionReaction: dataPost,
    };

    dispatch(updateRecord(data, userId, auth.access_token));
  };

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
                Th??ng tin chi ti???t ti??m ch???ng
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
                  <div className="col-12">1.Th??ng tin ti??m ch???ng</div>
                </div>
                <div className="col-12">
                  <div className="row">
                    <div className="col-6">
                      <div className="form-group row">
                        <label className="col-4 col-form-label">
                          M??i ti??m s???:
                        </label>
                        <div className="col-8">
                          <input
                            type="text"
                            className="form-control"
                            value={dataLookupDetail?.dose}
                            disabled={true}
                          />
                        </div>
                      </div>
                    </div>
                    {/* <div className="col-6">
                      <div className="form-group row">
                        <label className="col-4 col-form-label">
                          T??n vaccine:
                        </label>
                        <div className="col-8">
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group row">
                        <label className="col-3 col-form-label">
                          ????n v??? ti??m ch???ng:
                        </label>
                        <div className="col-9">
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 mb-2">2.Ti???n s??? b???nh</div>
                </div>

                {disease.map(
                  (item) =>
                    dataLookupDetail?.diseaseId.includes(item._id) && (
                      <div className="col-12" key={item._id}>
                        + {item.diseaseName}
                      </div>
                    )
                )}

                <div className="row">
                  <div className="col-12">3.Kh??m s??ng l???c</div>
                </div>
                <div className="col-12 mt-2">
                  <div className="col-12">
                    <div className="row">
                      <div className="col-2">Nhi???t ?????:</div>
                      <div className="col-2">
                        <input
                          type="text"
                          className="form-control"
                          name="temperature"
                          value={dataPre?.temperature}
                          onChange={handleOnchangePre}
                          disabled={action === "look"}
                        />
                      </div>
                      <div className="col-3">????? C;</div>
                    </div>
                  </div>
                  <div className="col-12 mt-2">
                    <div className="row">
                      <div className="col-2">Huy???t ??p:</div>
                      <div className="col-2">
                        <input
                          type="text"
                          className="form-control"
                          name="bloodPressure"
                          disabled={action === "look"}
                          value={dataPre?.bloodPressure}
                          onChange={handleOnchangePre}
                        />
                      </div>
                      <div className="col-3">mmHg;</div>
                    </div>
                  </div>
                  <div className="col-12 mt-2">
                    <div className="row">
                      <div className="col-2">M???ch:</div>
                      <div className="col-2">
                        <input
                          type="text"
                          className="form-control"
                          name="bloodVessel"
                          value={dataPre?.bloodVessel}
                          onChange={handleOnchangePre}
                          disabled={action === "look"}
                        />
                      </div>
                      <div className="col-3">l???n/ph??t;</div>
                    </div>
                  </div>
                  <div className="col-12 mt-2">
                    <div className="row">
                      <div className="col-2">Nh???p th???:</div>
                      <div className="col-2">
                        <input
                          type="text"
                          className="form-control"
                          name="breathing"
                          disabled={action === "look"}
                          value={dataPre?.breathing}
                          onChange={handleOnchangePre}
                        />
                      </div>
                      <div className="col-3">l???n/ph??t;</div>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-6">
                      <div className="row">
                        <div className="col-6">Ng?????i th???c hi???n kh??m:</div>
                        <div className="col-6">
                          <input
                            type="text"
                            className="form-control"
                            name="injectorPreName"
                            value={dataPre?.injectorPreName}
                            disabled={action === "look"}
                            onChange={handleOnchangePre}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-12 mt-2">
                      <div className="row">
                        <div className="col-2">Th???i gian:</div>
                        <div className="col-2">
                          <input
                            type="text"
                            className="form-control"
                            name="timePre"
                            value={dataPre?.timePre}
                            disabled={action === "look"}
                            onChange={handleOnchangePre}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">4.Ph???n ???ng sau ti??m</div>
                </div>
                <div className="col-12">
                  {action === "look" ? (
                    <div className="row">
                      {sideEffect.map(
                        (item) =>
                          item._id === dataPost?.nameReact && (
                            <div className="col-12" key={item._id}>
                              + {item.name}
                            </div>
                          )
                      )}
                    </div>
                  ) : (
                    <select
                      className="form-control"
                      id="exampleFormControlSelect1"
                      value={dataPost?.nameReact}
                      onChange={handleOnchangePost}
                      name="nameReact"
                    >
                      {sideEffect?.map((option) => (
                        <option key={option._id} value={option._id}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  )}

                  <div className="row mt-2">
                    <div className="col-6">
                      <div className="row">
                        <div className="col-6">Ng?????i th???c hi???n ti??m:</div>
                        <div className="col-6">
                          <input
                            type="text"
                            className="form-control"
                            value={dataPost?.injectorPostName}
                            name="injectorPostName"
                            onChange={handleOnchangePost}
                            disabled={action === "look"}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-12 mt-2">
                      <div className="row">
                        <div className="col-2">Th???i gian:</div>
                        <div className="col-2">
                          <input
                            type="text"
                            className="form-control"
                            value={dataPost?.timePost}
                            name="timePost"
                            onChange={handleOnchangePost}
                            disabled={action === "look"}
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
                Quay l???i
              </button>

              {action === "update" && (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                  data-dismiss="modal"
                >
                  C???p nh???t
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalDetail;
