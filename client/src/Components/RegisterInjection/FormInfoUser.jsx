import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataVaccine } from "../../redux/actions/vaccineAction";
function FormInfoUser() {
  const dispatch = useDispatch();
  const { auth, vaccine } = useSelector((state) => state);
  useEffect(() => {
    dispatch(getDataVaccine());
  }, []);
  return (
    <div>
      <div className="row justify-content-center mt-4">
        <div className="col-2 ">
          <div class="form-group">
            <label for="exampleFormControlSelect1">Đăng ký mũi tiêm:</label>
            <select class="form-control" id="exampleFormControlSelect1">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>
        </div>
        <div className="col-2 ">
          <div class="form-group">
            <label for="exampleFormControlSelect1">Loại vaccine:</label>
            <select class="form-control" id="exampleFormControlSelect1">
              <option>Lựa chọn vắc xin</option>
              {vaccine.map((option) => (
                <option key={option._id} value={option._id}>
                  {option.name_vaccine}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-4">
          <div class="form-group">
            <label for="exampleFormControlSelect1">Đơn vị tiêm:</label>
            <select class="form-control" id="exampleFormControlSelect1">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-8">
          <p className="font-weight-bold">1. Thông tin người đăng ký tiêm:</p>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-8">
          <div className="row">
            <div className="col-3">
              <div class="form-group">
                <label for="exampleInputEmail1">Họ và tên:</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Ngô Trung Sơn"
                />
              </div>
            </div>
            <div className="col-3">
              <div class="form-group">
                <label for="exampleInputEmail1">Ngày sinh:</label>
                <input type="date" class="form-control" />
              </div>
            </div>
            <div className="col-3">
              <div class="form-group">
                <label for="exampleFormControlSelect1">Giới tính:</label>
                <select class="form-control" id="exampleFormControlSelect1">
                  <option selected>Nam</option>
                  <option>Nữ</option>
                  <option>Khác</option>
                </select>
              </div>
            </div>
            <div className="col-3">
              <div class="form-group">
                <label for="exampleInputEmail1">Số điện thoại:</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="0344174212"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-8">
          <div className="row">
            <div className="col-3">
              <div class="form-group">
                <label for="exampleInputEmail1">Email:</label>
                <input
                  type="email"
                  class="form-control"
                  placeholder="ngoson285@gmail.com"
                />
              </div>
            </div>
            <div className="col-3">
              <div class="form-group">
                <label for="exampleInputEmail1">CCCD/CMND:</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="001200008741"
                />
              </div>
            </div>
            <div className="col-3">
              <div class="form-group">
                <label for="exampleInputEmail1">Số thẻ BHYT:</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="123456789456"
                />
              </div>
            </div>
            <div className="col-3">
              <div class="form-group">
                <label for="exampleInputEmail1">Nghề nghiệp:</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="ngoson285@gmail.com"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-8">
          <div className="row">
            <div className="col-3">
              <div class="form-group">
                <label for="exampleInputEmail1">Đơn vị công tác:</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Thanglong university"
                />
              </div>
            </div>
            <div className="col-3">
              <div class="form-group">
                <label for="exampleFormControlSelect1">Tỉnh/Thành phố:</label>
                <select class="form-control" id="exampleFormControlSelect1">
                  <option selected>Hà Nội</option>
                </select>
              </div>
            </div>
            <div className="col-3">
              <div class="form-group">
                <label for="exampleFormControlSelect1">Quận/Huyện:</label>
                <select class="form-control" id="exampleFormControlSelect1">
                  <option selected>Hoàng Mai</option>
                </select>
              </div>
            </div>
            <div className="col-3">
              <div class="form-group">
                <label for="exampleFormControlSelect1">Phường/Xã:</label>
                <select class="form-control" id="exampleFormControlSelect1">
                  <option selected>Đại kim</option>
                </select>
              </div>
            </div>
            <div className="col">
              <div class="form-group">
                <label for="exampleInputEmail1">Địa chỉ:</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Nghiêm Xuân Yêm,Đại im,Hoàng Mai,Hà Nội"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-8">
          <div className="row">
            <p className="font-weight-bold">2.Thông tin đăng ký tiêm chủng</p>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-8">
          <div className="row">
            <div className="col-3">
              <div class="form-group">
                <label for="exampleInputEmail1">Ngày tiêm dự kiến:</label>
                <input type="date" class="form-control" />
              </div>
            </div>
            <div className="col-3">
              <div class="form-group">
                <label for="exampleFormControlSelect1">Buổi tiêm:</label>
                <select class="form-control" id="exampleFormControlSelect1">
                  <option selected>Sáng</option>
                  <option>Chiều</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-8">
          <div className="row justify-content-between">
            <div className="col-4"></div>
            <div className="col-4">
              <div className="row ">
                <button type="button" class="btn btn-danger  mr-5 col-4">
                  Huỷ
                </button>
                <button type="button" class="btn btn-primary  col-4">
                  Tiếp theo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormInfoUser;
