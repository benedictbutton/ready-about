import React, { useState } from 'react';

const Paginate = ({
  flipForward,
  flipBack,
  flipTo,
  pageCount,
  previousLabel,
  nextLabel,
}) => {
  const [currentPage, setCurrentPage] = useState(0);

  const pageNumbers = [];
  for (let i = 1; i <= pageCount; i += 1) {
    pageNumbers.push(i);
  }

  return (
    <div style={{ zIndex: '9000' }}>
      <ul className="react-paginate">
        <li
          className={`previous ${
            currentPage === 0 ? 'disabled' : null
          }`}
        >
          <a
            onClick={() => {
              setCurrentPage(() => currentPage - 1);
              flipBack();
            }}
          >
            {previousLabel}
          </a>
        </li>
        {pageNumbers.map(number => (
          <li
            key={number}
            className={currentPage + 1 === number ? 'selected' : null}
          >
            <a
              onClick={() => {
                setCurrentPage(number - 1);
                flipTo(number - 1);
              }}
            >
              {number}
            </a>
          </li>
        ))}
        <li
          className={`next ${
            currentPage === pageCount - 1 ? 'disabled' : null
          }`}
        >
          <a
            onClick={() => {
              setCurrentPage(() => currentPage + 1);
              flipForward();
            }}
          >
            {nextLabel}
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Paginate;
