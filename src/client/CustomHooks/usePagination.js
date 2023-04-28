import { useState } from 'react';

const usePagination = listItems => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentItems = listItems?.slice(
    indexOfFirstPost,
    indexOfLastPost,
  );

  const paginate = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  return { itemsPerPage, currentItems, paginate };
};

export default usePagination;
