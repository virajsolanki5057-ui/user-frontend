import React from 'react';

const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  setCurrentPage
}) => {
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  return (
    <div className="flex items-center gap-2 mt-4">

      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
        className="rounded-full bg-slate-200 px-4 py-2 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Prev
      </button>

      <span className="px-3 py-1 text-sm font-medium text-slate-600">
        {currentPage} / {totalPages}
      </span>

      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
        className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next
      </button>

    </div>
  );
};

export default Pagination;
