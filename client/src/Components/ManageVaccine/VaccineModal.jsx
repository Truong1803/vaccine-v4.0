import React, {
  useEffect,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  createVaccine,
  updateVaccine,
} from '../../redux/actions/vaccineAction';

const initialState = {
  name_vaccine: "",
  production_unit: "",
  country: "",
  use_obj: "",
  time_step: "",
  num_ijection: "",
  _id: "",
};

function VaccineModal({ action, item }) {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  const [vaccine, setVaccine] = useState(initialState);

  useEffect(() => {
    if (action === "Thêm") {
      setVaccine(initialState);
    } else if (action === "Sửa") {
      setVaccine(item);
    }
    // else {
    //   setStyles(`${styles} btn-danger`);
    // }
  }, [action, item]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setVaccine({ ...vaccine, [name]: value });
  };

  const handleSubmit = () => {
    if (action === "Thêm") {
      dispatch(createVaccine(vaccine, auth.access_token));
      setVaccine(initialState);
    } else if (action === "Sửa") {
      dispatch(updateVaccine(vaccine, auth.access_token));
    }
  };

  return (
    <div>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-md">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {action} Vắc xin
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
                <label htmlFor="id">Mã vắc xin:</label>
                <input
                  type="text"
                  className="form-control col-12"
                  id="id"
                  placeholder={vaccine._id}
                  value={vaccine._id}
                  disabled={true}
                />
              </div>
              <div>
                <label htmlFor="name">Tên vắc xin:</label>
                <input
                  type="text"
                  className="form-control col-12"
                  id="name"
                  name="name_vaccine"
                  value={vaccine.name_vaccine}
                  onChange={handleOnChange}
                />
              </div>
              <div>
                <label htmlFor="unit">Hãng sản xuất:</label>
                <input
                  type="text"
                  className="form-control col-12"
                  id="unit"
                  name="production_unit"
                  value={vaccine.production_unit}
                  onChange={handleOnChange}
                />
              </div>
              <div className="row">
                <div className="col-6">
                  <label htmlFor="ct">Quốc gia sản xuất:</label>
                  <input
                    type="text"
                    className="form-control col-12"
                    id="ct"
                    name="country"
                    value={vaccine.country}
                    onChange={handleOnChange}
                  />
                </div>
                <div className="col-6">
                  <label htmlFor="injection">Số mũi tiêm:</label>
                  <input
                    type="number"
                    className="form-control col-12"
                    id="injection"
                    name="num_ijection"
                    value={vaccine.num_ijection}
                    onChange={handleOnChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <label htmlFor="ct">Khoảng cách giữa các mũi:</label>
                  <div className="form-group">
                    <select
                      id="inputState"
                      className="form-control"
                      value={vaccine.time_step}
                      onChange={handleOnChange}
                      name="time_step"
                    >
                      <option hidden>Lựa chọn</option>
                      <option>2-4 Tuần</option>
                      <option>4-8 Tuần</option>
                      <option>8-12 Tuần</option>
                    </select>
                  </div>
                </div>
                <div className="col-6">
                  <label htmlFor="injection">Đối tượng:</label>
                  <input
                    type="text"
                    className="form-control col-12"
                    id="ct"
                    placeholder=">="
                    name="use_obj"
                    value={vaccine.use_obj}
                    onChange={handleOnChange}
                  />
                </div>
              </div>
              <div className="row align-items-center"></div>
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
                onClick={handleSubmit}
                data-dismiss="modal"
              >
                {action}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VaccineModal;
