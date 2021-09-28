import React, { useRef, useState } from "react";
import MuiPhoneNumber from "material-ui-phone-number";
import { Link } from "react-router-dom";
import Otp from "../OTP/Otp";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/actions/authActions";
function User() {
  const dispatch = useDispatch();
  const [phone, setPhone] = useState("");
  const [identification, setIdentification] = useState("");
  const identificationInput = useRef();
  const handelSubmit = () => {
    setIdentification(identificationInput.current.value);
    dispatch(registerUser({ phonenumber: phone, identification }));
  };
  return (
    <div className="row justify-content-center align-items-center p-5 ">
      <div className="col-12 col-sm-6 col-md-4 col-lg-4  rounded-lg">
        <div className="card">
          <div className="card-header text-center p-3">
            <h3>Đăng ký tài khoản</h3>
          </div>
          <div className="card-body">
            <MuiPhoneNumber
              name="phone"
              label="Phone number"
              data-cy="user-phone"
              defaultCountry={"vn"}
              fullWidth
              required
              margin="normal"
              autoFocus
              inputProps={{
                style: { paddingTop: 0 },
              }}
              onChange={(phone) => setPhone(phone)}
              style={{ paddingTop: 20 }}
            />
            <div className="row">
              <div className="col">
                <label style={{ fontSize: "12px", color: "#0000008A" }}>
                  CCCD/CMND:
                </label>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="001200001234"
                    ref={identificationInput}
                  />
                </div>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-primary w-100 mb-2"
              data-toggle="modal"
              data-target="#exampleModal"
              onClick={handelSubmit}
            >
              Đăng ký
            </button>
            <div className="mt-2 mb-2 text-center">
              <span>
                <Link to="/sign_in" className="textSignUp ">
                  Đăng nhập{"  "}
                </Link>
              </span>
              nếu có tài khoản?
            </div>
          </div>
        </div>
      </div>
      <Otp phone={phone} identification={identification} />
    </div>
  );
}

export default User;
