"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";

export interface TableFootI {
  rowsPerPage?: number;
  setRowsPerPage?: (rows: number) => void;
  currentPage?: number;
  setCurrentPage?: (nextPage: number) => void;
  rowsOption?: number[];
  total?: number;
}

const TableFoot = ({
  rowsPerPage,
  setRowsPerPage,
  currentPage,
  setCurrentPage,
  rowsOption,
  total,
}: TableFootI) => {
  const [dropdown, setDropdown] = useState<boolean>(false);

  const handleClick = () => {
    setDropdown(!dropdown);
  };

  // useEffect(() => {
  //   if (setCurrentPage) setCurrentPage(1);
  // }, [rowsPerPage, setCurrentPage]);

  const closeDropdown = (e: MouseEvent) => {
    let target = e.target as HTMLElement;
    while (target) {
      if (
        target.id === "dropdownCardsButton" ||
        target.classList.contains("bypass")
      ) {
        return;
      }
      // @ts-expect-error/not necessary
      target = target.parentElement;
    }
    setDropdown(false);
  };

  function getPageSequence(
    totalItems: number,
    currentPage: number,
    rowsPerPage: number
  ) {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = Math.min((currentPage - 1) * rowsPerPage, totalItems);

    let endIndex2 = endIndex + rowsPerPage;
    if (endIndex2 > (total ?? 100)) {
      endIndex2 = total ?? 100;
    }

    return [startIndex + 1, endIndex2];
  }

  const startIndex = () => {
    if (currentPage && rowsPerPage) {
      return (currentPage - 1) * rowsPerPage;
    }
    return 0;
  };

  const endIndex = () => {
    if (currentPage && rowsPerPage && total) {
      const calculatedEndIndex = currentPage * rowsPerPage;
      return Math.min(calculatedEndIndex, total); // Ensures endIndex does not exceed total items
    }
    return 0;
  };

  useEffect(() => {
    document.body.addEventListener("click", closeDropdown);
    return () => {
      document.body.removeEventListener("click", closeDropdown);
    };
  });

  const disableSate = () => {
    if (
      getPageSequence(total || 100, currentPage || 0, rowsPerPage || 5)[1] ===
      total
    ) {
      return true;
    }
    return false;
  };

  return (
    <div className="h-[40px]  py-4 text-sm w-full flex items-end justify-end px-1 md:px-6 gap-1 md:gap-8 mt-3">
      <div className="flex items-center gap-1 md:gap-3">
        <p className="text-primary-heading text-xs font-medium sm:text-sm">
          Rows per page:
        </p>
        <div className="relative">
          <button
            id="dropdownCardsButton"
            className="flex items-center justify-center focus:ring-1 focus:outline-none focus:ring-primary-heading px-3 rounded-sm text-primary-heading text-xs font-medium sm:text-sm"
            onClick={handleClick}
          >
            {rowsPerPage}
            <svg
              className="w-2.5 h-2.5 ms-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          {dropdown && (
            <ul className="absolute bottom-[30px] flex flex-col w-full z-10 bg-primary-heading rounded-lg shadow-md">
              {rowsOption &&
                rowsOption.map((each, index) => (
                  <button
                    className={`${
                      each === rowsPerPage ? "bg-gray-100" : "bg-white"
                    } w-full flex items-center justify-center px-4 py-1 cursor-pointer ${
                      index === 0 ? "" : "border-t border-neutral-gray-20"
                    } bypass text-left`}
                    key={each}
                    onClick={() => {
                      if (setRowsPerPage) {
                        setRowsPerPage(each);
                      }
                      setDropdown(false);
                    }}
                  >
                    <p>{each}</p>
                  </button>
                ))}
            </ul>
          )}
        </div>
      </div>
      <p className=" text-xs font-medium sm:text-sm text-primary-heading">
        {total === 0 ? 0 : `${startIndex() + 1} - ${endIndex()} of ${total}`}
      </p>
      <div className="flex gap-x-2">
        <button
          onClick={() => {
            if (setCurrentPage && currentPage) setCurrentPage(currentPage - 1);
          }}
          disabled={currentPage === 1}
        >
          <ChevronLeft
            className={`${
              currentPage === 1 ? "text-nuetral-gray" : "text-primary-heading"
            } cursor-pointer text-xl font-medium sm:text-2xl`}
          />
        </button>
        <button
          disabled={disableSate()}
          onClick={() => {
            if (setCurrentPage && currentPage) setCurrentPage(currentPage + 1);
          }}
        >
          <ChevronRight
            className={`${
              disableSate() ? "text-nuetral-gray" : "text-primary-heading"
            } cursor-pointer text-xl font-medium sm:text-2xl`}
          />
        </button>
      </div>
    </div>
  );
};

export default TableFoot;
