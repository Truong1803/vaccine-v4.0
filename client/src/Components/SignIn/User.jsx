import React, { useState } from "react";
import MuiPhoneNumber from "material-ui-phone-number";
import { Link } from "react-router-dom";
import Otp from "../OTP/Otp";
import { useDispatch } from "react-redux";
import { loginSMS } from "../../redux/actions/authActions";
function User() {
  const dispatch = useDispatch();

  const [phone, setPhone] = useState("");
  const handelSubmit = () => {
    dispatch(loginSMS(phone));
  };
  return (
    <div className="row justify-content-center align-items-center p-5 ">
      <div className="col-12 col-sm-6 col-md-4 col-lg-4 rounded-lg">
        <div className="card">
          <div className="card-header text-center">
            <h3>Đăng nhập</h3>
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
            <button
              type="button"
              className="btn btn-primary w-100 mb-2"
              data-toggle="modal"
              data-target="#exampleModal"
              onClick={handelSubmit}
            >
              Đăng Nhập
            </button>
            <div className="mt-2 mb-2 text-center">
              <span>
                <Link to="/sign_up" className="textSignUp ">
                  Đăng ký{" "}
                </Link>
              </span>
              nếu chưa có tài khoản?
            </div>
          </div>
        </div>
      </div>
      <Otp phone={phone} />
    </div>
  );
}

export default User;
