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
  console.log(totalPages);
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
                  onPageClick(page - 1);
                }}
                className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-white dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-300 dark:hover:text-white"
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
                    className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-white dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-300 dark:hover:text-white"
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
                  onPageClick(page + 1);
                }}
                className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300  hover:bg-gray-100 hover:text-gray-700 dark:bg-white dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-300 dark:hover:text-white"
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
