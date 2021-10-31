import React, {
  useEffect,
  useState,
} from 'react';

import { Table } from 'react-bootstrap';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { getAPI } from '../../api/FetchData';
import { getDataVaccine } from '../../redux/actions/vaccineAction';
import ModalListUser from './ModalListUser';

export const TableDataForVaccine = ({ provinceId, startDate, endDate }) => {
  const distpatch = useDispatch();

  const { vaccine } = useSelector((state) => state);

  const [openModal, setOpenModal] = useState(false);
  const [listUser, setListUser] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    distpatch(getDataVaccine());
  }, [distpatch]);

  useEffect(() => {
    const getData = async () => {
      const res = await getAPI(
        `/report/report-injection-organ?provinceId=${provinceId}&startDate=${startDate}&endDate=${endDate}`
      );
      setData(res.data.data);
    };
    getData();
  }, [provinceId, startDate, endDate]);

  const hanleOpenModal = (user) => {
    setListUser(user);
    setOpenModal(true);
  };
  return (
    <div className="row mt-5 mb-4">
      <div className="col-12">
        <Table striped bordered hover>
          <thead>
            <tr className="text-center">
              <th>Đơn vị tiêm</th>
              <th colSpan={`${Object.keys(vaccine).length}`}>
                Số lượng vaccine đã thực hiện tiêm
              </th>
              <th>Tổng</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center">
              <td></td>
              {vaccine.map((item) => (
                <td key={item._id}>{item.name_vaccine}</td>
              ))}
              <td></td>
            </tr>
            {data.map(
              (item, index) =>
                item.healthOrganization?.name !== "ADMIN" && (
                  <tr className="text-center" key={index}>
                    <td>{item.healthOrganization?.name}</td>
                    {item.vaccine.map((v) => (
                      <td key={v._id}>{v.quanlity}</td>
                    ))}

                    <td>{item.total}</td>
                    <td>
                      <div className="row justify-content-center">
                        <button
                          type="button"
                          className="btn btn-success mr-3 "
                          data-toggle="modal"
                          data-target="#exampleModal"
                          onClick={() => hanleOpenModal(item.user)}
                        >
                          <i className="far fa-eye"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                )
            )}
          </tbody>
        </Table>
      </div>
      {openModal && <ModalListUser listUser={listUser} />}
    </div>
  );
};
export const TableDataForAge = ({ provinceId, startDate, endDate }) => {
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState([]);
  const [listUser, setListUser] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const res = await getAPI(
        `/report/report-injection-age?provinceId=${provinceId}&startDate=${startDate}&endDate=${endDate}`
      );
      setData(res.data.data);
    };
    getData();
  }, [provinceId, startDate, endDate]);

  const hanleOpenModal = (user) => {
    setListUser(user);
    setOpenModal(true);
  };
  return (
    <div className="row">
      <div className="col">
        <Table striped bordered hover>
          <thead>
            <tr className="text-center">
              <th>Đơn vị tiêm</th>
              <th colSpan="3">Số lượng vaccine đã tiêm theo độ tuổi</th>
              <th>Tổng</th>

              <th colSpan="3">
                Tỷ lệ vaccine tiêm theo độ tuổi/số lượng mũi tiêm thực hiện
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center">
              <td></td>
              <td> &lt; 18 tuổi</td>
              <td> &gt;= 18 tuổi</td>
              <td> &gt;= 60 tuổi</td>
              <td></td>

              <td> &lt; 18 tuổi</td>
              <td> &gt;= 18 tuổi</td>
              <td> &gt;= 60 tuổi</td>
              <td></td>
            </tr>
            {data.map((item, index) => (
              <tr className="text-center" key={index}>
                <td>{item.healthOrganization.name}</td>
                <td>{item.agelt18}</td>
                <td>{item.agegte18}</td>
                <td>{item.agegte60}</td>
                <td>{item.agelt18 + item.agegte18 + item.agegte60}</td>
                <td>
                  {item.agelt18 + item.agegte18 + item.agegte60 === 0
                    ? "0.00"
                    : (
                        (item.agelt18 /
                          (item.agelt18 + item.agegte18 + item.agegte60)) *
                        100
                      ).toFixed(2)}{" "}
                  %
                </td>
                <td>
                  {item.agelt18 + item.agegte18 + item.agegte60 === 0
                    ? "0.00"
                    : (
                        (item.agegte18 /
                          (item.agelt18 + item.agegte18 + item.agegte60)) *
                        100
                      ).toFixed(2)}{" "}
                  %
                </td>
                <td>
                  {item.agelt18 + item.agegte18 + item.agegte60 === 0
                    ? "0.00"
                    : (
                        (item.agegte60 /
                          (item.agelt18 + item.agegte18 + item.agegte60)) *
                        100
                      ).toFixed(2)}{" "}
                  %
                </td>
                <td>
                  <div className="row justify-content-center">
                    <button
                      type="button"
                      className="btn btn-success mr-3 "
                      data-toggle="modal"
                      data-target="#exampleModal"
                      onClick={() => hanleOpenModal(item.user)}
                    >
                      <i className="far fa-eye"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {openModal && <ModalListUser listUser={listUser} />}
      </div>
    </div>
  );
};
export const TableDataForInjectionUnit = ({ data }) => {
  const [openModal, setOpenModal] = useState(false);
  const [listUser, setListUser] = useState([]);

  const hanleOpenModal = (user) => {
    setListUser(user);
    setOpenModal(true);
  };
  return (
    <div className="row mt-5 mb-4">
      <div className="col-12">
        <Table striped bordered hover>
          <thead>
            <tr className="text-center ">
              <th></th>
              <th>Số lượt đăng ký</th>
              <th>Số mũi đã tiêm</th>
              <th>Số lượng người phản ứng sau tiêm</th>
              <th>Tỷ lệ số mũi đã tiêm / số lượt đã đăng ký</th>
              <th>Tỷ lệ phản ứng sau tiêm / số lượt đã tiêm</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center">
              <td>Nam</td>
              <td>{data?.Nam?.num_user_injectionNam}</td>
              <td>{data?.Nam?.countInjectedNam}</td>
              <td>{data?.Nam?.countSideEffectNam}</td>
              <td>
                {data?.Nam?.num_user_injectionNam === 0
                  ? "0.00"
                  : (
                      (data?.Nam?.countInjectedNam /
                        data?.Nam?.num_user_injectionNam) *
                      100
                    ).toFixed(2)}
                %
              </td>
              <td>
                {data?.Nam?.countInjectedNam === 0
                  ? "0.00"
                  : (
                      (data?.Nam?.countSideEffectNam /
                        data?.Nam?.countInjectedNam) *
                      100
                    ).toFixed(2)}
                %
              </td>
              <td className="pl-4">
                <div className="row justify-content-center align-items-center">
                  <button
                    type="button"
                    className="btn btn-success mr-3 "
                    data-toggle="modal"
                    data-target="#exampleModal"
                    onClick={() => hanleOpenModal(data?.userNam)}
                  >
                    <i className="far fa-eye"></i>
                  </button>
                </div>
              </td>
            </tr>
            <tr className="text-center">
              <td>Nữ</td>
              <td>{data?.Nu?.num_user_injectionNu}</td>
              <td>{data?.Nu?.countInjectedNu}</td>
              <td>{data?.Nu?.countSideEffectNu}</td>
              <td>
                {data?.Nu?.num_user_injectionNu === 0
                  ? "0.00"
                  : (
                      (data?.Nu?.countInjectedNu /
                        data?.Nu?.num_user_injectionNu) *
                      100
                    ).toFixed(2)}
                %
              </td>
              <td>
                {data?.Nu?.countInjectedNu === 0
                  ? "0.00"
                  : (
                      (data?.Nu?.countSideEffectNu /
                        data?.Nu?.countInjectedNu) *
                      100
                    ).toFixed(2)}
                %
              </td>
              <td className="pl-4">
                <div className="row justify-content-center align-items-center">
                  <button
                    type="button"
                    className="btn btn-success mr-3 "
                    data-toggle="modal"
                    data-target="#exampleModal"
                    onClick={() => hanleOpenModal(data?.userNu)}
                  >
                    <i className="far fa-eye"></i>
                  </button>
                </div>
              </td>
            </tr>
            <tr className="text-center">
              <td>Tổng</td>
              <td>
                {data?.Nam?.num_user_injectionNam +
                  data?.Nu?.num_user_injectionNu}
              </td>
              <td>{data?.Nam?.countInjectedNam + data?.Nu?.countInjectedNu}</td>
              <td>
                {data?.Nam?.countSideEffectNam + data?.Nu?.countSideEffectNu}
              </td>
              <td>
                {data?.Nam?.num_user_injectionNam +
                  data?.Nu?.num_user_injectionNu ===
                0
                  ? "0.00"
                  : (
                      ((data?.Nam?.countInjectedNam +
                        data?.Nu?.countInjectedNu) /
                        (data?.Nam?.num_user_injectionNam +
                          data?.Nu?.num_user_injectionNu)) *
                      100
                    ).toFixed(2)}
                %
              </td>
              <td>
                {data?.Nam?.countInjectedNam + data?.Nu?.countInjectedNu === 0
                  ? "0.00"
                  : (
                      ((data?.Nam?.countSideEffectNam +
                        data?.Nu?.countSideEffectNu) /
                        (data?.Nam?.countInjectedNam +
                          data?.Nu?.countInjectedNu)) *
                      100
                    ).toFixed(2)}
                %
              </td>
              <td className="pl-4"></td>
            </tr>
          </tbody>
        </Table>
      </div>
      {openModal && <ModalListUser listUser={listUser} />}
    </div>
  );
};

export const TableDataForHealthOrganization = ({ data }) => {
  const [openModal, setOpenModal] = useState(false);
  const [listUser, setListUser] = useState([]);
  const [total, setTotal] = useState("");
  useEffect(() => {
    let countInjection = 0;
    let countInjected = 0;
    let countSideEffect = 0;
    let ratio_injection = 0;
    let ratio_sideEffect = 0;
    for (const item of data) {
      countInjection = countInjection + item.countInjection;
      countInjected = countInjected + item.countInjected;
      countSideEffect = countSideEffect + item.countSideEffect;
      ratio_injection =
        countInjection === 0
          ? "0.00"
          : ((countInjected / countInjection) * 100).toFixed(2);
      ratio_sideEffect =
        countInjected === 0
          ? "0.00"
          : ((countSideEffect / countInjected) * 100).toFixed(2);
    }
    setTotal({
      countInjection,
      countInjected,
      countSideEffect,
      ratio_injection,
      ratio_sideEffect,
    });
  }, [data]);
  const hanleOpenModal = (user) => {
    setListUser(user);
    setOpenModal(true);
  };
  return (
    <div className="row mt-5 mb-4">
      <div className="col-12">
        <Table striped bordered hover>
          <thead>
            <tr className="text-center ">
              <th>Đơn vị tiêm chủng</th>
              <th>Số lượng người đăng ký</th>
              <th>Số lượng người đã tiêm</th>
              <th>Số lượng người phản ứng sau tiêm</th>
              <th>Tỷ lệ người đã tiêm / người đã đăng ký</th>
              <th>Tỷ lệ phản ứng sau tiêm / người đăng ký</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr className="text-center" key={index}>
                <td>{item?.healthOrganization?.name}</td>
                <td>{item?.countInjection}</td>
                <td>{item?.countInjected}</td>
                <td>{item?.countSideEffect}</td>
                <td>{item?.ratio_injection}%</td>
                <td>{item?.ratio_sideEffect}%</td>
                <td className="pl-4">
                  <div className="row justify-content-center align-items-center">
                    <button
                      type="button"
                      className="btn btn-success mr-3 "
                      data-toggle="modal"
                      data-target="#exampleModal"
                      onClick={() => hanleOpenModal(item.user)}
                    >
                      <i className="far fa-eye"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            <tr className="text-center">
              <td>Tổng</td>
              <td>{total.countInjection}</td>
              <td>{total.countInjected}</td>
              <td>{total.countSideEffect}</td>
              <td>{total.ratio_injection}%</td>
              <td>{total.ratio_sideEffect}%</td>
              <td className="pl-4"></td>
            </tr>
          </tbody>
        </Table>
      </div>
      {openModal && <ModalListUser listUser={listUser} />}
    </div>
  );
};

export const TableDataForDeptHealth = ({ data }) => {
  const [openModal, setOpenModal] = useState(false);
  const [listUser, setListUser] = useState([]);
  const [total, setTotal] = useState("");
  useEffect(() => {
    let countInjection = 0;
    let countInjected = 0;
    let countSideEffect = 0;
    let ratio_injection = 0;
    let ratio_sideEffect = 0;
    for (const item of data) {
      countInjection = countInjection + item.countInjection;
      countInjected = countInjected + item.countInjected;
      countSideEffect = countSideEffect + item.countSideEffect;
      ratio_injection =
        countInjection === 0
          ? "0.00"
          : ((countInjected / countInjection) * 100).toFixed(2);
      ratio_sideEffect =
        countInjected === 0
          ? "0.00"
          : ((countSideEffect / countInjected) * 100).toFixed(2);
    }
    setTotal({
      countInjection,
      countInjected,
      countSideEffect,
      ratio_injection,
      ratio_sideEffect,
    });
  }, [data]);
  const hanleOpenModal = (user) => {
    setListUser(user);
    setOpenModal(true);
  };
  return (
    <div className="row mt-5 mb-4">
      <div className="col-12">
        <Table striped bordered hover>
          <thead>
            <tr className="text-center ">
              <th>Quận/Huyện</th>
              <th>Số lượng người đăng ký</th>
              <th>Số lượng người đã tiêm</th>
              <th>Số lượng người phản ứng sau tiêm</th>
              <th>Tỷ lệ người đã tiêm / người đã đăng ký</th>
              <th>Tỷ lệ phản ứng sau tiêm / người đăng ký</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr className="text-center" key={index}>
                <td>{item?.healthOrganization?.name}</td>
                <td>{item?.countInjection}</td>
                <td>{item?.countInjected}</td>
                <td>{item?.countSideEffect}</td>
                <td>{item?.ratio_injection}%</td>
                <td>{item?.ratio_sideEffect}%</td>
                <td className="pl-4">
                  <div className="row justify-content-center align-items-center">
                    <button
                      type="button"
                      className="btn btn-success mr-3 "
                      data-toggle="modal"
                      data-target="#exampleModal"
                      onClick={() => hanleOpenModal(item.user)}
                    >
                      <i className="far fa-eye"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            <tr className="text-center">
              <td>Tổng</td>
              <td>{total.countInjection}</td>
              <td>{total.countInjected}</td>
              <td>{total.countSideEffect}</td>
              <td>{total.ratio_injection}%</td>
              <td>{total.ratio_sideEffect}%</td>
              <td className="pl-4"></td>
            </tr>
          </tbody>
        </Table>
      </div>
      {openModal && <ModalListUser listUser={listUser} />}
    </div>
  );
};
