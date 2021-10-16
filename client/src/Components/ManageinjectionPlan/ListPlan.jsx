import React from "react";
import InjectionPlan from "./InjectionPlan";

function ListPlan() {
  return (
    <div className='row'>
      <div className='col-12'>
        <div className='row mt-4 mb-2'>
          <div className='col-3'></div>
          <div className='col-6 d-flex justify-content-center'>
            <h3>Danh sách kế hoạch tiêm chủng</h3>
          </div>
          <div className='col-3'>
            <div className='row align-items-center'>
              <div className='col-2 text-center'>
                <p>Ngày:</p>
              </div>
              <div className='col-8'>
                <form className='form-inline my-2 my-lg-0 '>
                  <input className='form-control mr-sm-2' type='date' />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='col-12 table-responsive table-hover '>
        <table className='table'>
          <thead className='thead-dark'>
            <tr className='text-center'>
              <th scope='col'>STT</th>
              <th scope='col'>Kế hoạch tiêm chủng</th>
              <th scope='col'>Chi tiết</th>
            </tr>
          </thead>
          <tbody>
            <tr className='text-center '>
              <td>1</td>
              <td>Kế hoạch tiêm chủng ngày 15/10/2021</td>
              <td>
                <div className='row justify-content-center'>
                  <button
                    type='button'
                    className='btn btn-info col-6'
                    data-toggle='modal'
                    data-target='#exampleModal'
                    //   onClick={() => {
                    //     handleOnClick(item, "Xem", true);
                    //   }}
                  >
                    <i className='far fa-eye'></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* <InjectionPlan /> */}
    </div>
  );
}

export default ListPlan;
