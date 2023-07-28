import React, { useEffect } from 'react';

const Paginate = ({
  flipForward,
  flipBack,
  flipTo,
  pageCount,
  currentPage,
  previousLabel,
  nextLabel,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= pageCount; i += 1) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    if (currentPage > pageCount) flipBack(currentPage - 1);
    // if (currentPage < pageCount) flipForward(currentPage + 1);
  }, [currentPage, pageCount, flipBack, flipForward]);

  return (
    <div style={{ zIndex: '9000' }}>
      <ul className="react-paginate">
        <li
          className={`previous ${
            currentPage === 0 ? 'disabled' : null
          }`}
        >
          <a onClick={() => flipBack(currentPage - 1)}>
            {previousLabel}
          </a>
        </li>
        {pageNumbers.map(number => (
          <li
            key={number}
            className={currentPage + 1 === number ? 'selected' : null}
          >
            <a onClick={() => flipTo(number - 1)}>{number}</a>
          </li>
        ))}
        <li
          className={`next ${
            currentPage === pageCount - 1 ? 'disabled' : null
          }`}
        >
          <a onClick={() => flipForward(currentPage + 1)}>
            {nextLabel}
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Paginate;
