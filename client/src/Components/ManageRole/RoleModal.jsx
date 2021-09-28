import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createRole, updateRole } from "../../redux/actions/roleAction";

const initialState = {
  name: "",
  description: "",
  id: "",
};
function RoleModal({ action, item }) {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  const [role, setRole] = useState(initialState);

  useEffect(() => {
    if (action === "Thêm") {
      setRole(initialState);
    } else if (action === "Sửa") {
      setRole(item);
    }
  }, [action, item]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setRole({ ...role, [name]: value });
  };

  const handleSubmit = () => {
    if (action === "Thêm") {
      dispatch(createRole(role, auth.access_token));
      setRole(initialState);
    } else if (action === "Sửa") {
      dispatch(updateRole(role, auth.access_token));
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
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {action} nhóm quyền
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
                <label for="name">Mã quyền:</label>
                <input
                  type="text"
                  className="form-control col-12"
                  id="name"
                  name="id"
                  value={role.id}
                  onChange={handleOnChange}
                />
              </div>
              <div>
                <label for="name">Nhóm quyền:</label>
                <input
                  type="text"
                  className="form-control col-12"
                  id="name"
                  name="name"
                  value={role.name}
                  onChange={handleOnChange}
                />
              </div>
              <div>
                <label for="name">Mô tả:</label>
                <input
                  type="text"
                  className="form-control col-12"
                  id="name"
                  name="description"
                  value={role.description}
                  onChange={handleOnChange}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                huỷ
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

export default RoleModal;
