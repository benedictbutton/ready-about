import React, { useState } from 'react';

const Paginate = ({
  flipForward,
  flipBack,
  pageCount,
  currentPage,
  previousLabel,
  nextLabel,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= pageCount; i++) {
    pageNumbers.push(i);
  }

  return (
    <div style={{ zIndex: '9000' }}>
      <ul className="react-paginate">
        <li
          className={`previous ${
            currentPage === 1 ? 'disabled' : null
          }`}
          onClick={() => flipBack(currentPage - 1)}
          aria-label="Previous"
          aria-disabled={currentPage === 1}
        >
          <a>{previousLabel}</a>
        </li>
        {pageNumbers.map(number => (
          <li
            key={number}
            onClick={() => flipForward(number)}
            className={currentPage === number ? 'selected' : null}
            aria-label={`Page ${number}`}
          >
            <a>{number}</a>
          </li>
        ))}
        <li
          className={`next ${
            currentPage === pageCount ? 'disabled' : null
          }`}
          onClick={() => flipForward(currentPage + 1)}
          aria-label="Next"
          aria-disabled={currentPage === pageCount}
        >
          <a>{nextLabel}</a>
        </li>
      </ul>
    </div>
  );
};

export default Paginate;
