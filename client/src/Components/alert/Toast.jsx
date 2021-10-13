import React, {
  useEffect,
  useState,
} from 'react';

import { useDispatch } from 'react-redux';

import { ALERT } from '../../redux/containt';

function Toast({ title, body, bgColor }) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(true);
  const handleClose = () => {
    dispatch({ type: ALERT, payload: {} });
  };
  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: ALERT, payload: {} });
    }, 3000);
  }, []);
  return (
    // <div
    //   className={`toast show position-fixed text-light ${bgColor}`}
    //   style={{ top: "5px", right: "5px", zIndex: 5000, minWidth: "200px" }}
    // >
    //   <div className={`toast-header text-light ${bgColor}`}>
    //     <strong className="me-auto">{title}</strong>
    //     {/* <button
    //       type="button"
    //       className="btn-close"
    //       data-bs-dismiss="toast"
    //       aria-label="Close"
    //       onClick={handleClose}
    //     /> */}
    //     <button
    //       type="button"
    //       className="ml-2 mb-1 btn-close"
    //       data-dismiss="toast"
    //       aria-label="Close"
    //     ></button>
    //   </div>
    //   <div className="toast-body">
    //     {typeof body === "string" ? (
    //       body
    //     ) : (
    //       <ul>
    //         {body.map((text, index) => (
    //           <li key={index}>{text}</li>
    //         ))}
    //       </ul>
    //     )}
    //   </div>
    // </div>
    <div
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      className={`toast show position-fixed text-light ${bgColor}`}
      style={{ top: "5px", right: "5px", zIndex: 5000, minWidth: "200px" }}
      // data-autohide="true"
      // data-delay="2000"
    >
      <div className={`toast-header text-light ${bgColor}`}>
        <strong className="mr-auto">{title}</strong>
        <button
          type="button"
          className="ml-2 mb-1 close"
          data-dismiss="toast"
          aria-label="Close"
          onClick={handleClose}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="toast-body">
        {typeof body === "string" ? (
          body
        ) : (
          <ul>
            {body.map((text, index) => (
              <li key={index}>{text}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Toast;
