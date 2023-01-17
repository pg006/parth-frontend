import React from "react";

const Pagination = (props) => {
  const { totalCount = 20, limit = 6, onPageClick, page = 1 } = props;
  const totalPages = Math.ceil(totalCount / limit) || 1;
  let pages = [];
  for (let i = 0; i < totalPages; i++) {
    pages.push(i + 1);
  }
  const disablePages = (key) => {
    if (limit >= totalCount) return true;
    switch (key) {
      case "Previous":
        if (page <= 1) return true;
        break;
      case "Next":
        if (page >= totalPages) return true;
        break;
      default:
        break;
    }
  };
  if (totalPages < 2) return;
  return (
    <React.Fragment>
      <div>
        <nav aria-label="Page navigation example">
          <ul className="inline-flex -space-x-px">
            <li>
              <button
                disabled={disablePages("Previous")}
                onClick={() => {
                  page !== 1 && onPageClick(page - 1);
                }}
                className={
                  "px-3 py-2 ml-0 font-medium leading-tight text-gray-500 bg-white border border-gray-300 " +
                  (page !== 1 ? "cursor-pointer" : "cursor-not-allowed")
                }
              >
                Previous
              </button>
            </li>
            {pages.map((val, index) => {
              return (
                <li key={index}>
                  <button
                    onClick={() => {
                      onPageClick(val);
                    }}
                    className={
                      "px-3 py-2 leading-tight font-medium border border-gray-300 " +
                      (page === val
                        ? "bg-gray-500 text-white"
                        : "bg-white text-gray-500")
                    }
                  >
                    {val.toString()}
                  </button>
                </li>
              );
            })}
            <li>
              <button
                disabled={disablePages("Next")}
                onClick={() => {
                  page !== totalPages && onPageClick(page + 1);
                }}
                className={
                  "px-3 py-2 leading-tight font-medium text-gray-500 bg-white border border-gray-300 " +
                  (page !== totalPages
                    ? "cursor-pointer"
                    : "cursor-not-allowed")
                }
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </React.Fragment>
  );
};

export default Pagination;
