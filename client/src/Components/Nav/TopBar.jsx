import "./Nav.css";

import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { logout } from "../../redux/actions/authActions";

function TopBar() {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const logoutUser = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  let body;
  if (Object.keys(auth).length === 0) {
    body = (
      <ul className='navbar-nav mr-auto '>
        <li className='nav-item itemNavbar '>
          <Link className='nav-link itemNavbar' to='/'>
            Trang chủ
          </Link>
        </li>

        <li>
          <Link className='nav-link itemNavbar' to='/sign_in'>
            Đăng Nhập
          </Link>
        </li>
      </ul>
    );
  } else if (auth?.user?.role === 1) {
    body = (
      <ul className='navbar-nav mr-auto '>
        <li className='nav-item itemNavbar '>
          <Link className='nav-link itemNavbar' to='/'>
            Trang chủ
          </Link>
        </li>

        <li className='nav-item dropdown'>
          <Link className='nav-link itemNavbar' to='/register_injection_user'>
            Đăng ký tiêm
          </Link>
        </li>
        <li className=' nav-item dropdown'>
          <Link
            className='nav-link dropdown-toggle '
            to='#'
            id='dropdownMenuButton'
            data-toggle='dropdown'
            aria-expanded='false'
            style={{
              color: "#fff",

              borderColor: "none",
            }}
          >
            Tra cứu
          </Link>
          <div className='dropdown-menu' aria-labelledby='dropdownMenuButton'>
            <Link to='/certificate' className='none_outline dropdown-item'>
              Tra cứu chứng nhận tiêm
            </Link>
            <Link to='/look_up' className='none_outline dropdown-item'>
              Tra cứu kết quả đăng ký
            </Link>
            <Link
              to='/health-record-user'
              className='none_outline dropdown-item'
            >
              Tra cứu hồ sơ tiêm chủng
            </Link>
            <Link
              to='/admin/injection_unit'
              className='none_outline dropdown-item'
            >
              Tra cứu thông tin đơn vị tiêm chủng
            </Link>
            <Link
              to='/admin/manage_vaccine'
              className='none_outline dropdown-item'
            >
              Tra cứu thông tin vaccine
            </Link>
          </div>
        </li>
        <li className='nav-item dropdown'>
          {auth.user?.name || auth.user?.organization ? (
            <div className='dropdown nav-link'>
              <Link
                className=' dropdown-toggle'
                id='dropdownMenuButton'
                data-toggle='dropdown'
                aria-expanded='false'
                to='#'
                style={{
                  color: "#fff",

                  borderColor: "none",
                }}
              >
                {auth.user?.name || auth.user?.organization}
              </Link>
              <div
                className='dropdown-menu'
                aria-labelledby='dropdownMenuButton'
              >
                <Link to='/info' className='none_outline dropdown-item'>
                  Thông tin cá nhân
                </Link>
                <Link
                  to='/'
                  onClick={logoutUser}
                  className='none_outline dropdown-item'
                >
                  Đăng Xuất
                </Link>
              </div>
            </div>
          ) : (
            <Link className='nav-link itemNavbar' to='/sign_in'>
              Đăng Nhập
            </Link>
          )}
        </li>
      </ul>
    );
  } else if (auth?.user?.role === 2) {
    body = (
      <div className='col'>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className='collapse navbar-collapse  ' id='navbarSupportedContent'>
          <ul className='navbar-nav mr-auto '>
            <li className='nav-item itemNavbar '>
              <Link className='nav-link itemNavbar' to='/'>
                Trang chủ
              </Link>
            </li>

            <li className='nav-item dropdown'>
              <Link
                className='nav-link itemNavbar'
                to='/register_injection_organization'
              >
                Đăng ký tiêm
              </Link>
            </li>
            <li className='nav-item dropdown'>
              <Link
                className='nav-link dropdown-toggle '
                to='#'
                id='dropdownMenuButton'
                data-toggle='dropdown'
                aria-expanded='false'
                style={{
                  color: "#fff",

                  borderColor: "none",
                }}
              >
                Tra cứu
              </Link>
              <div
                className='dropdown-menu'
                aria-labelledby='dropdownMenuButton'
              >
                <Link to='/look_up' className='none_outline dropdown-item'>
                  Tra cứu kết quả đăng ký
                </Link>
                <Link
                  to='/admin/injection_unit'
                  className='none_outline dropdown-item'
                >
                  Tra cứu thông tin đơn vị tiêm chủng
                </Link>
                <Link
                  to='/admin/manage_vaccine'
                  className='none_outline dropdown-item'
                >
                  Tra cứu thông tin vaccine
                </Link>
              </div>
            </li>

            <li className='nav-item dropdown'>
              {auth.user?.name || auth.user?.organization ? (
                <div className='dropdown nav-link'>
                  <Link
                    className=' dropdown-toggle'
                    id='dropdownMenuButton'
                    data-toggle='dropdown'
                    aria-expanded='false'
                    to='#'
                    style={{
                      color: "#fff",

                      borderColor: "none",
                    }}
                  >
                    {auth.user?.name || auth.user?.organization}
                  </Link>
                  <div
                    className='dropdown-menu'
                    aria-labelledby='dropdownMenuButton'
                  >
                    <Link to='/info' className='none_outline dropdown-item'>
                      Thông tin cá nhân
                    </Link>
                    <Link
                      to='/'
                      onClick={logoutUser}
                      className='none_outline dropdown-item'
                    >
                      Đăng Xuất
                    </Link>
                  </div>
                </div>
              ) : (
                <Link className='nav-link itemNavbar' to='/sign_in'>
                  Đăng Nhập
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    );
  } else {
    body = (
      <ul className='navbar-nav mr-auto '>
        <li className='nav-item itemNavbar '>
          <Link className='nav-link itemNavbar' to='/'>
            Trang chủ
          </Link>
        </li>

        <li className='nav-item dropdown'>
          {auth.user?.name || auth.user?.organization ? (
            <div className='dropdown nav-link'>
              <Link
                className=' dropdown-toggle'
                id='dropdownMenuButton'
                data-toggle='dropdown'
                aria-expanded='false'
                to='#'
                style={{
                  color: "#fff",

                  borderColor: "none",
                }}
              >
                {auth.user?.name || auth.user?.organization}
              </Link>
              <div
                className='dropdown-menu'
                aria-labelledby='dropdownMenuButton'
                style={{ left: "-3rem" }}
              >
                <Link
                  to='/'
                  onClick={logoutUser}
                  className='none_outline dropdown-item'
                >
                  Đăng Xuất
                </Link>
              </div>
            </div>
          ) : (
            <Link className='nav-link itemNavbar' to='/sign_in'>
              Đăng Nhập
            </Link>
          )}
        </li>
      </ul>
    );
  }

  return (
    <div>
      <nav className='navbar navbar-expand-lg navbar-light bgTopBar d-flex '>
        <div className='col'>
          <Link className='navbar-brand titleHome itemNavbar ml-5' to='/'>
            Cổng thông tin tiêm chủng
          </Link>
        </div>
        <div>{body}</div>
      </nav>
    </div>
  );
}

export default TopBar;
