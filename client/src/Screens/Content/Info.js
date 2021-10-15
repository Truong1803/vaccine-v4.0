import React, { useState, useEffect } from "react";
import video from "../../assets/Images/bg.mp4";
import ItemInfo from "../../Components/Profile/itemInfo";
function Info() {
  const [infor, setInfor] = useState("");
  useEffect(() => {
    // setInfor(JSON.parse(localStorage.getItem("infor")));
  }, []);
  return (
    <div>
      <div className='position-relative'>
        <div className='d-flex'>
          <video autoPlay muted loop>
            <source src={video} type='video/mp4' />
          </video>
        </div>
        <div
          className='position-absolute p-5'
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
          }}
        >
          <div className='d-flex justify-content-center align-items-center '>
            <div className='form-group row'>
              <div className='col-12'>
                <ItemInfo infor={infor} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Info;
