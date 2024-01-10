'use client'
import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import InvoiceDetailsModal from './InvoiceDataModal';

interface HistoryTableProps {}

const HistoryTable: React.FC<HistoryTableProps> = () => {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [selectedInvoice, setSelectedInvoice] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem('userInfoEmail');
    // Fetch invoice data from local storage or API and update state
    const invoiceDataString = localStorage.getItem(`Invoices${storedEmail}`);
    if (invoiceDataString) {
      const invoiceData = JSON.parse(invoiceDataString);
      setInvoices(invoiceData);
    }
  }, []);

  // Handle "View Details" button click
  const handleViewDetails = (invoice: any) => {
    // Set the selected invoice and show the modal
    setSelectedInvoice(invoice);
    setShowModal(true);
  };

  return (
    <div>
      <Table striped bordered hover responsive>
        <thead>
          <tr className="text-center">
            <th>Number</th>
            <th>ID</th>
            <th>Date</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.slice().reverse().map((item, index) => (
            <tr key={index} className="text-center">
              <td className="text-center">{index + 1}</td>
              <td>{item.id}</td>
              <td>{item.date}</td>
              <td>{item.total}</td>
              <td>
                <Button
                  variant="success"
                  onClick={() => handleViewDetails(item)}
                >
                  View Details
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal to display invoice details */}
      <InvoiceDetailsModal
        invoice={selectedInvoice}
        showModal={showModal}
        handleClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default HistoryTable;