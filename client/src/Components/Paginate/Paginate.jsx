import React, { useState } from "react";
import { useSelector } from "react-redux";
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
    // <div className="Page navigation">
    //   <button
    //     className={`btn-pagination ${page <= 1 ? "btn-disable" : ""}`}
    //     disabled={page <= 1}
    //     onClick={() => handlePageChange(page - 1)}
    //   >
    //     Prev
    //   </button>
    //   <ul className=" pagination">
    //     {pageNumbers.map((number) => {
    //       return (
    //         <li
    //           className={` page-item ${
    //             pageCurrent === number ? "pagination-active" : ""
    //           }`}
    //           key={number}
    //           onClick={() => handlePageChange(number)}
    //         >
    //           {number}
    //         </li>
    //       );
    //     })}
    //   </ul>
    //   <button
    //     className={`btn-pagination ${page >= totalPage ? "btn-disable" : ""}`}
    //     disabled={page >= totalPage}
    //     onClick={() => handlePageChange(page + 1)}
    //   >
    //     Next
    //   </button>
    // </div>
    <nav
      aria-label="Page navigation example d-flex  "
      style={{ width: "100%" }}
    >
      <ul class="pagination justify-content-center">
        <li class={`page-item `} hidden={page <= 1}>
          <a class="page-link" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        {pageNumbers.map((number) => (
          <li
            class={`page-item ${pageCurrent === number ? "active" : ""}`}
            key={number}
            onClick={() => handlePageChange(number)}
          >
            <span class="page-link" style={{ cursor: "pointer" }}>
              {number}
            </span>
          </li>
        ))}

        <li class="page-item" hidden={page >= totalPage}>
          <a class="page-link" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Paginate;
