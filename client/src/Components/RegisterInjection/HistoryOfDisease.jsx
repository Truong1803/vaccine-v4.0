import React from "react";

function HistoryOfDisease() {
  return (
    <div className='row justify-content-center align-items-center mt-4'>
      <div className='col-8 table-responsive table-hover align-items-center'>
        <table className='table'>
          <thead className='thead-dark'>
            <tr>
              <th>Tiền sử</th>
              <th className='text-center'>Triệu chứng</th>
              <th className='text-center'>Có</th>
              <th className='text-center'>Không</th>
              <th className='text-center'>Không rõ</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Một bệnh tiền sử nào đó rất dài tầm 300 từ</td>
              <td>
                <div className='form-group '>
                  <input
                    type='email'
                    className='form-control'
                    id='exampleInputEmail1'
                    aria-describedby='emailHelp'
                  />
                </div>
              </td>
              <td className='text-center'>
                <div className='form-check'>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    value=''
                    id='defaultCheck1'
                  />
                </div>
              </td>
              <td className='text-center'>
                <div className='form-check'>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    value=''
                    id='defaultCheck1'
                  />
                </div>
              </td>
              <td className='text-center'>
                <div className='form-check'>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    value=''
                    id='defaultCheck1'
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HistoryOfDisease;
