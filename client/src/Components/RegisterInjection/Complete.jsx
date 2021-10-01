import React from "react";

function Complete() {
  return (
    <div className='row justify-content-between mt-4'>
      <div className='col-12'>
        <div className='row justify-content-center '>
          <div className='col-3 '>
            <p className='font-weight-bold text-complete'>
              Cảm ơn bạn đã cung cấp thông tin cho chúng tôi, chọn xác nhận để
              hoàn thành đơn đăng ký
            </p>
          </div>
          <div className='col-5'>
            <img
              src='https://media.discordapp.net/attachments/743851113333260361/893190927840083998/doctor-and-coronavirus-vaccine-injection-syringe-cartoon-art-illustration-free-vector.jpg?width=1130&height=904'
              alt=''
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>
      </div>
      <div className='col-12'>
        <div className='row justify-content-between'>
          <div className='col-8'></div>
          <div className='col-4'>
            <div className='row '>
              <button type='button' class='btn btn-danger  mr-5 col-4'>
                Quay lại
              </button>
              <button type='button' class='btn btn-primary  col-4'>
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Complete;
