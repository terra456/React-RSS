import React from 'react';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

export interface Props {
  currentPage: number;
  pages: number;
  count: number;
  handlePage: (el: number) => void;
}

export default function Pagination({ currentPage, pages, count, handlePage }: Props) {
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{(currentPage - 1) * 20 + 1}</span> to{' '}
            <span className="font-medium">{(currentPage - 1) * 20 + 20}</span> of{' '}
            <span className="font-medium">{count}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <a
              href="#"
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              onClick={() => handlePage(currentPage - 1)}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </a>
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
            {Array(pages)
              .fill(' ')
              .map((el, i) => {
                if (
                  (currentPage < 5 && i < 10) ||
                  Math.abs(i + 1 - currentPage) <= 5 ||
                  (currentPage > pages - 5 && i > pages - 11)
                ) {
                  if (
                    (currentPage <= 5 && i === 9) ||
                    (currentPage > 5 &&
                      currentPage <= pages - 5 &&
                      Math.abs(i + 1 - currentPage) === 5) ||
                    (currentPage > pages - 5 && i === pages - 10)
                  ) {
                    return (
                      <span
                        key={i + 'link'}
                        className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0"
                      >
                        ...
                      </span>
                    );
                  } else {
                    return (
                      <a
                        key={i + 'link'}
                        href="#"
                        onClick={() => handlePage(i + 1)}
                        className={
                          i === currentPage - 1
                            ? 'relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                            : 'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0'
                        }
                      >
                        {i + 1}
                      </a>
                    );
                  }
                }
              })}
            <a
              href="#"
              onClick={() => handlePage(currentPage + 1)}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}
