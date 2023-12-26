'use client'
import React from 'react';
import Container from 'react-bootstrap/Container';
import HistoryTable from '@/app/components/historytable';

const history: React.FC = () => {
  const tableData = [
    {id: '#123', date: '2023-02-01', total: 200, status: 'Completed' },
    {id: '#124', date: '2023-12-01', total: 100, status: 'Completed' },
    {id: '#223', date: '2023-12-01', total: 400, status: 'Completed' },
    {id: '#323', date: '2023-11-01', total: 100, status: 'Completed' },
    {id: '#523', date: '2023-11-01', total: 500, status: 'Completed' },
  ];

  return (
    <Container className="mt-5 mb-5">
      <h2>Order History</h2>
      <HistoryTable data={tableData} />
    </Container>
  );
};

export default history;
