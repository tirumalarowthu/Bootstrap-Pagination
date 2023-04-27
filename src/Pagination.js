import React from 'react';
import { usePagination, DOTS } from './usePagination';
// import './pagination.css';
const Pagination = props => {
  const {onPageChange, totalCount,siblingCount = 1,currentPage, pageSize } = props;

  const paginationRange = usePagination({currentPage,totalCount,siblingCount,pageSize});

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    currentPage < lastPage && onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    currentPage > 1 && onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul className='border border-2  d-flex justify-content-center'>
      <li style={{listStyleType:'none'}} disabled={currentPage === 1} onClick={onPrevious}>
        <div className='btn btn-light m-2' disabled={currentPage === 1}>prev</div>
      </li>
      {paginationRange.map(pageNumber => {
        if (pageNumber === DOTS) {
          return <li className="btn btn-light m-2 align-items-center">&#8230;</li>;
        }

        return (
          <li
            className={ pageNumber === currentPage ?"btn btn-primary m-2":"btn btn-light m-2"} onClick={() => onPageChange(pageNumber)}>{pageNumber} </li>
        );
      })}
      <li style={{ listStyleType: 'none' }} disabled={currentPage === lastPage} onClick={onNext} >
        <div className='btn btn-light m-2' disabled={currentPage === lastPage} >next</div>
      </li>
    </ul>
  );
};

export default Pagination;
