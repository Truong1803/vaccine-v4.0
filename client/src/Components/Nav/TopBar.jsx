import "./Nav.css";

import React from "react";

import { Dropdown } from "react-bootstrap";
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

  return (
    <div>
      <nav className='navbar navbar-expand-lg navbar-light bgTopBar d-flex '>
        <div className='col-6'>
          <Link className='navbar-brand titleHome itemNavbar ml-5' to='/'>
            Cổng thông tin tiêm chủng
          </Link>
        </div>
        <div className='col-6'>
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

          <div
            className='collapse navbar-collapse  '
            id='navbarSupportedContent'
          >
            <ul className='navbar-nav mr-auto '>
              <li className='nav-item itemNavbar '>
                <Link className='nav-link itemNavbar' to='/'>
                  Trang chủ
                </Link>
              </li>
              <li className='nav-item dropdown'>
                <Dropdown>
                  <Dropdown.Toggle
                    variant='interhit'
                    id='dropdown-basic'
                    style={{
                      color: "#fff",

                      borderColor: "none",
                    }}
                    className='none_outline'
                  >
                    Đăng ký
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item>
                      <Link to='register_injection_user' className='none_outline'>
                        Đăng ký tiêm chủng cá nhân
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Link to='register_injection_organization' className='none_outline'>
                      Đăng ký tiêm chủng tổ chức
                      </Link>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
              <li className='nav-item dropdown'>
                {/* <div
                  className="nav-link dropdown-toggle itemNavbar"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Tra cứu
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <Link className="dropdown-item " to="#">
                      Tra cứu kết quả đăng ký
                    </Link>
                    <Link className="dropdown-item" to="#">
                      Tra cứu hồ sơ cá nhân
                    </Link>
                    <Link className="dropdown-item" to="/admin/manage_vaccine">
                      Tra cứu thông tin vaccine
                    </Link>
                  </div>
                </div> */}
                <Dropdown>
                  <Dropdown.Toggle
                    variant='interhit'
                    id='dropdown-basic'
                    style={{
                      color: "#fff",

                      borderColor: "none",
                    }}
                    className='none_outline'
                  >
                    Tra cứu
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item>
                      <Link to='/' className='none_outline'>
                        Tra cứu kết quả đăng ký
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Link to='/' className='none_outline'>
                        Tra cứu hồ sơ cá nhân
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Link to='/admin/injection_unit' className='none_outline'>
                        Tra cứu thông tin đơn vị tiêm chủng
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Link to='/admin/manage_vaccine' className='none_outline'>
                        Tra cứu thông tin vaccine
                      </Link>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
              <li className='nav-item dropdown'>
                {auth.user?.name || auth.user?.organization ? (
                  // <Link
                  //   className="nav-link itemNavbar "
                  //   to="#"
                  //   onClick={logoutUser}
                  // >
                  //   {auth.user?.name || auth.user?.organization}
                  // </Link>
                  <Dropdown>
                    <Dropdown.Toggle
                      variant='interhit'
                      id='dropdown-basic'
                      style={{
                        color: "#fff",

                        borderColor: "none",
                      }}
                      className='none_outline'
                    >
                      {auth.user?.name || auth.user?.organization}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item>
                        <Link
                          to='/'
                          onClick={logoutUser}
                          className='none_outline'
                        >
                          Đăng Xuất
                        </Link>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                ) : (
                  <Link className='nav-link itemNavbar' to='/sign_in'>
                    Đăng Nhập
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default TopBar;
