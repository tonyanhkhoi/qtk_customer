'use client'
import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

interface HistoryTableProps {
  data: Array<{
    id: string;
    date: string;
    total: number;
    status: string;
  }>;
}

const HistoryTable: React.FC<HistoryTableProps> = ({ data }) => {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr className="text-center">
          <th>Number</th>
          <th>ID</th>
          <th>Date</th>
          <th>Total</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index} className="text-center text-start">
            <td className="text-center text-start">{index + 1}</td>
            <td>{item.id}</td>
            <td>{item.date}</td>
            <td>{item.total}</td>
            <td>{item.status}</td>
            <td>
              <Button variant="success">View Details</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default HistoryTable;
