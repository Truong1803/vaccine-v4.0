import React, { useState } from 'react';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Paginate({ page, setPage }) {
  //   const [page, setPage]
  const { totalItem } = useSelector((state) => state);
  const totalPage = Math.ceil(totalItem / 5);
  const [pageCurrent, setPageCurrent] = useState(1);
  const handlePageChange = (newPage) => {
    setPage(newPage);
    setPageCurrent(newPage);
  };
  const pageNumbers = [];
  for (let i = 1; i <= totalPage; i++) {
    pageNumbers.push(i);
  }
  return (
    <nav
      aria-label="Page navigation example d-flex  "
      style={{ width: "100%" }}
    >
      <ul className="pagination justify-content-center">
        <li className={`page-item `} hidden={page <= 1}>
          <Link className="page-link" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </Link>
        </li>
        {pageNumbers.map((number) => (
          <li
            className={`page-item ${pageCurrent === number ? "active" : ""}`}
            key={number}
            onClick={() => handlePageChange(number)}
          >
            <span className="page-link" style={{ cursor: "pointer" }}>
              {number}
            </span>
          </li>
        ))}

        <li className="page-item" hidden={page >= totalPage}>
          <Link className="page-link" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Paginate;
