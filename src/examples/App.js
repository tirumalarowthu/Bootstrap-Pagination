import React, { useState, useMemo } from 'react';
import Pagination from '../Pagination';
import data from './data/mock-data.json';
import { Form, Button } from 'react-bootstrap';
 
let pageSize = 10;

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');

  const filteredData = useMemo(() => {
    return data.filter(item => {
      return (
        item.first_name.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.last_name.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.email.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.phone.toLowerCase().includes(searchValue.toLowerCase())
      );
    });
  }, [searchValue]);
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return filteredData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, filteredData]);

  const handleSearchInputChange = e => {
    setSearchValue(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className='container'>
      <div className='d-flex float-end my-3'>
        <div className=''>
          <Form.Control type='text' placeholder='Search' value={searchValue} onChange={handleSearchInputChange} />
        </div>
        <div className=''>
          <Button variant='primary' onClick={() => setSearchValue('')}>
            Clear
          </Button>
        </div>
      </div>
      <table className='table table-hover'>
        <thead>
          <tr>
            <th>ID</th>
            <th>FIRST NAME</th>
            <th>LAST NAME</th>
            <th>EMAIL</th>
            <th>PHONE</th>
          </tr>
        </thead>
        <tbody>
          {currentTableData.map((item, index) => {
            return (
              <tr key={index}>
                <td>{(currentPage - 1) * pageSize + index + 1}</td>
                <td>{item.first_name}</td>
                <td>{item.last_name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination
        className='pagination-bar'
        currentPage={currentPage}
        totalCount={filteredData.length}
        pageSize={pageSize}
        onPageChange={page => setCurrentPage(page)}
      />
    </div>
  );
}
