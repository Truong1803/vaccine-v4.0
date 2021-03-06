import './RegisterinjectionStyles.css';

import React, {
  useEffect,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  DeleteUserRegister,
  GetInjectionRegisterOrgan,
} from '../../redux/actions/injectionRegisterOrganAction';
import Modal from '../alert/Modal';
import ModalImportInjectionUser
  from '../ManageinjectionPlan/ModalImportInjectionUser';
import FormImport from './FormImport';
import ModalRegisterInjection from './ModalRegisterInjection';

function RegisterInjectionOrganization() {
  const [openModal, setOpenModal] = useState(false);
  const showModal = false;
  const [showImport, setShowImport] = useState(false);

  const dispatch = useDispatch();
  const { auth, injectionRegisterOrgan, alert } = useSelector((state) => state);

  const [phonenumber, setPhonenumber] = useState("");

  useEffect(() => {
    if (auth.access_token) {
      dispatch(GetInjectionRegisterOrgan(auth.user?._id, auth.access_token));
    }
  }, [auth.access_token, auth.user?._id, dispatch]);

  const handleOnChangeSearch = (e) => {
    e.preventDefault();
    // setTimeout(() => {
    //   setSearch(e.target.value);
    // }, 5000);
    // setSearch(e.target.value);
  };

  const handleOpenModal = (phonenumber) => {
    setPhonenumber(phonenumber);
    setOpenModal(!openModal);
  };

  // const handleOnClickDelete = (organId) => {
  //   setAction("");
  //   dispatch(deleteOrgan(organId, auth.access_token));
  // };

  const handleOnClick = (item, text, status) => {
    // setAction(text);
    // setItem(item);
    // setStatus(status);
  };
  return (
    <div className="row justify-content-center">
      <div className="col-10">
        <div className="row mt-4 mb-2">
          <div className="col-3">
            <form className="form-inline my-2 my-lg-0 ">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                // value={search}
                onChange={handleOnChangeSearch}
              />
            </form>
          </div>
          <div className="col-5 d-flex justify-content-center">
            <h3>????ng k?? ti??m t??? ch???c</h3>
          </div>
          <div className="col-4">
            <div className="action  row">
              <button
                type="button"
                className="btn btn-outline-primary"
                data-toggle="modal"
                data-target="#exampleModal2"
              >
                Import
              </button>
              <button
                type="button"
                className="btn btn-outline-primary ml-2 mr-2"
              >
                Export
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-toggle="modal"
                data-target="#exampleModal13"
                onClick={() => setShowImport(true)}
              >
                Th??m ng?????i ????ng k??
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 ">
        <table className="table">
          <thead className="thead-dark">
            <tr className="text-center">
              <th scope="col">STT</th>
              <th scope="col">H??? v?? T??n</th>
              <th scope="col">Ng??y sinh</th>
              <th scope="col">Gi???i t??nh</th>
              <th scope="col">S??? ??i???n tho???i</th>
              <th scope="col">S??? CCCD/CMND</th>

              <th scope="col">M??i th???</th>
              <th scope="col">Tr???ng th??i</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {injectionRegisterOrgan[0]?.userPhone.map((item, index) => (
              <tr className="text-center " key={index}>
                <td>{index + 1}</td>
                <td>{item.phonenumber.name}</td>
                <td>{item.phonenumber.dob}</td>
                <td>{item.phonenumber.gender}</td>
                <td>{item.phonenumber.phonenumber}</td>
                <td>{item.phonenumber.identification}</td>

                <td>{item.dose}</td>
                <td className="text-danger">ch??a duy???t</td>
                <td>
                  <div className="row justify-content-center">
                    <button
                      type="button"
                      className="btn btn-danger  mr-4"
                      data-toggle="modal"
                      data-target="#exampleModal"
                      onClick={() => {
                        handleOpenModal(item.phonenumber.phonenumber);
                      }}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                    {/* <button
                      type="button"
                      className="btn btn-warning  mr-4"
                      data-toggle="modal"
                      data-target="#exampleModal"
                      onClick={() => {
                        handleOnClick("S???a", false);
                      }}
                    >
                      <i className="fas fa-edit"></i>
                    </button> */}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && <ModalRegisterInjection />}
      <FormImport />
      {openModal && (
        <Modal
          body="ng?????i d??n"
          handleOpenModal={handleOpenModal}
          itemId={phonenumber}
          functDelete={DeleteUserRegister}
          auth={auth}
        />
      )}
      {showImport && <ModalImportInjectionUser setShowImport={setShowImport} />}
    </div>
  );
}

export default RegisterInjectionOrganization;
