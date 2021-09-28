import React, { useRef } from "react";
import "./SignIn.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginOther } from "../../redux/actions/authActions";
function Organization() {
  const dispatch = useDispatch();

  const email = useRef();
  const password = useRef();

  const handleOnSubmit = () => {
    dispatch(
      loginOther({
        email: email.current.value,
        password: password.current.value,
      })
    );
  };

  return (
    <div className="justify-content-center mt-5 row">
      <div className="col-12 col-sm-6 col-md-4 col-lg-4">
        <div className="login-box ">
          <div className="card ">
            <div className="card-header text-center">
              <h3>Đăng nhập</h3>
            </div>
            <div className="card-body mt-3">
              <div>
                <div className="input-group mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    ref={email}
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-envelope"></span>
                    </div>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    ref={password}
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-lock"></span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <button
                      type="submit"
                      className="btn btn-primary btn-block"
                      onClick={handleOnSubmit}
                    >
                      Đăng Nhập
                    </button>
                  </div>
                </div>
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
        </div>
      </div>
    </div>
  );
}

export default Organization;
