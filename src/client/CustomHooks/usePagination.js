import { useState, useEffect } from 'react';

const usePagination = listItems => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentItems = listItems?.slice(
    indexOfFirstPost,
    indexOfLastPost,
  );

  const paginate = (e, selected) => {
    e.preventDefault();
    setCurrentPage(selected);
  };

  return { itemsPerPage, currentItems, paginate, currentPage };
};

export default usePagination;
