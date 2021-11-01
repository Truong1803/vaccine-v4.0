import {
  useEffect,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { getAllSchedule } from '../../redux/actions/scheduleAction';
import InjectionPlan from './InjectionPlan';

function ListPlan() {
  const dispatch = useDispatch();
  const { auth, schedule } = useSelector((state) => state);

  // const [page, setPage] = useState("");
  // const [search, setSearch] = useState("");
  const [injectionDate, setInjectionDate] = useState("");

  const [showPlan, setShowPlan] = useState(false);
  const [dataSchedule, setDataSchedule] = useState("");

  useEffect(() => {
    if (auth.access_token) {
      dispatch(getAllSchedule(auth.access_token, injectionDate));
    }
  }, [auth.access_token, injectionDate, dispatch]);

  const handleOnclickPlan = (item) => {
    setDataSchedule(item);
    setShowPlan(true);
  };
  return (
    <div className="row">
      <div className="col-12">
        <div className="row mt-4 mb-2">
          <div className="col-3"></div>
          <div className="col-6 d-flex justify-content-center">
            <h3>Danh sách kế hoạch tiêm chủng</h3>
          </div>
          <div className="col-3">
            <div className="row align-items-center">
              <div className="col-2 text-center">
                <p>Ngày:</p>
              </div>
              <div className="col-8">
                <form className="form-inline my-2 my-lg-0 ">
                  <input
                    className="form-control mr-sm-2"
                    type="date"
                    value={injectionDate}
                    onChange={(e) => setInjectionDate(e.target.value)}
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 table-responsive table-hover ">
        <table className="table">
          <thead className="thead-dark">
            <tr className="text-center">
              <th scope="col">STT</th>
              <th scope="col">Kế hoạch tiêm chủng</th>
              <th scope="col">Chi tiết</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((item, index) => (
              <tr className="text-center" key={index}>
                <td>{index + 1}</td>
                <td>Kế hoạch tiêm chủng ngày {item[0]?.injectionDate}</td>
                <td>
                  <div className="row justify-content-center">
                    <button
                      type="button"
                      className="btn btn-info col-6"
                      data-toggle="modal"
                      data-target="#exampleModal2"
                      onClick={() => handleOnclickPlan(item)}
                    >
                      <i className="far fa-eye"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showPlan && (
        <InjectionPlan
          listUser={dataSchedule}
          setShowPlan={setShowPlan}
          check="user"
        />
      )}
    </div>
  );
}

export default ListPlan;
