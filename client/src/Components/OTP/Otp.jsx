import React, { useState } from "react";
import OtpInput from "react-otp-input";
import { useDispatch } from "react-redux";
import { verifySMS } from "../../redux/actions/authActions";
function Otp({ phone, identification }) {
  const dispatch = useDispatch();

  const [otp, setOtp] = useState("");
  const handleChange = (otp) => setOtp(otp);
  const handleSubmit = () => {
    dispatch(verifySMS(phone, otp, identification));
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
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Mã otp được gửi đến số :{phone}
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
              <OtpInput
                value={otp}
                onChange={handleChange}
                numInputs={6}
                inputStyle={{
                  height: "3rem",
                  width: "100%",
                  marginLeft: "1rem",
                  marginRight: "1rem",
                }}
              />
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
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Otp;
