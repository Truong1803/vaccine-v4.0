import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InjectionRegister } from "../../redux/actions/injectionRegisterAction";
import { Link } from "react-router-dom";
function Complete({ data, setData, setStatus, status }) {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);

  const [check, setCheck] = useState(false);

  const handlePrePage = () => {
    setStatus(status - 1);
    // setData({ ...data, userId: auth.user._id });
  };

  const handleSubmit = () => {
    dispatch(InjectionRegister(data, auth.access_token));
  };
  return (
    <div className="row justify-content-between mt-4">
      <div className="col-12">
        <div className="row justify-content-center ">
          <div className="col-3 ">
            <p className="font-weight-bold text-complete">
              Cảm ơn bạn đã cung cấp thông tin cho chúng tôi, chọn xác nhận để
              hoàn thành đơn đăng ký.{" "}
              <input type="checkbox" onChange={() => setCheck(!check)} />
              <span className="text-primary"> Xác nhận.</span>
            </p>
          </div>
          <div className="col-5">
            <img
              src="https://media.discordapp.net/attachments/743851113333260361/893190927840083998/doctor-and-coronavirus-vaccine-injection-syringe-cartoon-art-illustration-free-vector.jpg?width=1130&height=904"
              alt=""
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>
      </div>
      <div className="col-12">
        <div className="row justify-content-between">
          <div className="col-8"></div>
          <div className="col-4">
            <div className="row ">
              <button
                type="button"
                class="btn btn-danger  mr-5 col-4"
                onClick={handlePrePage}
              >
                Quay lại
              </button>

              <Link
                type="button"
                className={`btn btn-primary  col-4 ${check ? "" : "disabled"} `}
                onClick={handleSubmit}
                to="/"
              >
                Xác nhận
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Complete;
