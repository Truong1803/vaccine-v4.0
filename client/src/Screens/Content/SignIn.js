import React, { useState, useEffect } from "react";
import Organization from "../../Components/SignIn/Organization";
import User from "../../Components/SignIn/User";
import video from "../../assets/Images/bg.mp4";
function SignIn() {
  const user = "Cá nhân";
  const organization = "Tổ chức";
  const [checkType, setCheckType] = useState(user);
  useEffect(() => {}, [checkType]);
  return (
    <div>
      <div className="position-relative">
        <div className="d-flex">
          <video autoPlay muted loop width="100%">
            <source src={video} type="video/mp4" />
          </video>
        </div>
        <div
          className="position-absolute p-5"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
          }}
        >
          <div className="d-flex justify-content-center align-items-center ">
            <div className="form-group row">
              <div className="form-check mr-5">
                <input
                  className="form-check-input"
                  type="radio"
                  name="type"
                  defaultValue={user}
                  defaultChecked={user}
                  onChange={() => setCheckType(user)}
                />
                <label className="form-check-label">{user}</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="type"
                  value={organization}
                  onChange={() => setCheckType(organization)}
                />
                <label className="form-check-label">{organization}</label>
              </div>
            </div>
          </div>
          {checkType === user ? <User /> : <Organization />}
        </div>
      </div>
    </div>
  );
}

export default SignIn;
