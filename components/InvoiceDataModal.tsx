'use client'
import React from 'react';
import { Modal, Button, Table } from 'react-bootstrap';

interface InvoiceDetailsModalProps {
  showModal: boolean;
  handleClose: () => void;
  invoice: any | null;
}

const InvoiceDetailsModal: React.FC<InvoiceDetailsModalProps> = ({
  showModal,
  handleClose,
  invoice,
}) => {
  if (!invoice) {
    return null;
  }

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Invoice Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>ID: {invoice.id}</h5>
        <p>Date: {invoice.date}</p>
        <p>Total: {invoice.total} VND</p>
        <Table striped bordered hover responsive>
          <thead>
            <tr className="text-center">
              <th>#</th>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item: any, index: number) => (
              <tr key={index} className="text-center">
                <td>{index + 1}</td>
                <td>{item.title}</td>
                <td>{item.price} VND</td>
                <td>{item.quantity}</td>
                <td>{item.price * item.quantity} VND</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default InvoiceDetailsModal;
