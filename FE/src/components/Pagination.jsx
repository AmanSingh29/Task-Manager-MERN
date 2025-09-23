import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
}) => {
  if (totalPages < 1) return null;

  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const showLeftDots = leftSiblingIndex > 2;
    const showRightDots = rightSiblingIndex < totalPages - 1;

    if (!showLeftDots && showRightDots) {
      const leftRange = [];
      for (let i = 1; i <= Math.max(3, rightSiblingIndex); i++) {
        leftRange.push(i);
      }
      return [...leftRange, "...", totalPages];
    }

    if (showLeftDots && !showRightDots) {
      const rightRange = [];
      for (
        let i = Math.min(totalPages - 2, leftSiblingIndex);
        i <= totalPages;
        i++
      ) {
        rightRange.push(i);
      }
      return [1, "...", ...rightRange];
    }

    if (showLeftDots && showRightDots) {
      const middleRange = [];
      for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
        middleRange.push(i);
      }
      return [1, "...", ...middleRange, "...", totalPages];
    }

    return Array.from({ length: totalPages }, (_, i) => i + 1);
  };

  const pages = getPageNumbers();

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-6 select-none">
      <button
        className="px-3 py-2 rounded-md cursor-pointer bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous Page"
      >
        <FaChevronLeft size={16} />
      </button>
      <div className="flex items-center gap-1">
        {pages.map((page, idx) =>
          page === "..." ? (
            <span key={`dots-${idx}`} className="px-3 py-2 text-gray-500">
              ...
            </span>
          ) : (
            <button
              key={`page-${page}`}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-2 rounded-md transition-colors min-w-[40px] ${
                currentPage === page
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200 cursor-pointer text-gray-700"
              }`}
              aria-label={`Go to page ${page}`}
              aria-current={currentPage === page ? "page" : undefined}
            >
              {page}
            </button>
          )
        )}
      </div>

      <button
        className="px-3 py-2 cursor-pointer rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next Page"
      >
        <FaChevronRight size={16} />
      </button>
    </div>
  );
};

export default Pagination;
