import React from 'react';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function LeftBar() {
  const { auth } = useSelector((state) => state);

  let body;
  if (auth.user?.role === 6) {
    body = (
      <>
        <li className="nav-item">
          <Link
            className="nav-link nav-link-collapse"
            to="#"
            id="hasSubItems"
            data-toggle="collapse"
            data-target="#collapseSubItems4"
            aria-controls="collapseSubItems4"
            aria-expanded="false"
          >
            Quản lý người dùng
          </Link>
          <ul
            className="nav-second-level collapse"
            id="collapseSubItems4"
            data-parent="#navAccordion"
          >
            <li className="nav-item">
              <Link className="nav-link" to="/admin/canhan">
                <span className="nav-link-text">Cá nhân</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/tochuc2">
                <span className="nav-link-text">Doanh nghiệp</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/tochuc">
                <span className="nav-link-text">Tổ chức y tế</span>
              </Link>
            </li>
          </ul>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/admin/manage_role">
            Quản lý nhóm quyền
          </Link>
        </li>
      </>
    );
  } else if (auth.user?.role === 5) {
    body = (
      <>
        <li className="nav-item">
          <Link className="nav-link" to="/admin/manage_vaccine">
            Quản lý vaccine
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/admin/department_health">
            Quản lý sở y tế quận/huyện
          </Link>
        </li>
      </>
    );
  } else if (auth.user?.role === 4) {
    body = (
      <>
        <li className="nav-item">
          <Link className="nav-link " to="/admin/injection_unit">
            Quản lý đơn vị tiêm
          </Link>
        </li>
      </>
    );
  } else if (auth.user?.role === 3) {
    body = (
      <>
        <li className="nav-item">
          <Link
            className="nav-link nav-link-collapse"
            to="#"
            id="hasSubItems"
            data-toggle="collapse"
            data-target="#collapseSubItems4"
            aria-controls="collapseSubItems4"
            aria-expanded="false"
          >
            Thiết lập kế hoạch tiêm
          </Link>
          <ul
            className="nav-second-level collapse"
            id="collapseSubItems4"
            data-parent="#navAccordion"
          >
            <li className="nav-item">
              <Link className="nav-link" to="/admin/list_user_injection">
                <span className="nav-link-text">Người dân</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/admin/list_organization_injection"
              >
                <span className="nav-link-text">Tổ chức</span>
              </Link>
            </li>
          </ul>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link nav-link-collapse"
            to="/admin/list_plan_injection"
            id="hasSubItems"
          >
            Danh sách kế hoạch tiêm
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link nav-link-collapse"
            to="#"
            id="hasSubItems"
            data-toggle="collapse"
            data-target="#collapseSubItems5"
            aria-controls="collapseSubItems5"
            aria-expanded="false"
          >
            Cập nhật hồ sơ tiêm chủng
          </Link>
          <ul
            className="nav-second-level collapse"
            id="collapseSubItems5"
            data-parent="#navAccordion"
          >
            <li className="nav-item">
              <Link className="nav-link" to="/admin/pre-health_record">
                <span className="nav-link-text">Khám sàng lọc</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/post-health_record">
                <span className="nav-link-text">Sau khi tiêm</span>
              </Link>
            </li>
          </ul>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link nav-link-collapse"
            to="/admin/health-record"
            id="hasSubItems"
          >
            Quản lý hồ sơ tiêm chủng
          </Link>
        </li>
      </>
    );
  }

  return (
    <div className="float-left text-left pl-2 left-bar">
      <div id="sidebar ">
        <ul className="navbar-nav mr-auto pt-3 " id="navAccordion">
          {/* <li className="nav-item">
            <Link className="nav-link" to="/admin/dashboard">
              Dashboard
            </Link>
          </li> */}
          {body}
          <li className="nav-item">
            <Link
              className="nav-link nav-link-collapse"
              to="/admin/report"
              id="hasSubItems"
            >
              Báo cáo
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default LeftBar;
