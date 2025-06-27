import React from 'react';
import './OrderHistory.css';

function OrderHistory() {
  // Sample static data (replace with data from backend)
  const pastOrders = [
    {
      id: 1,
      date: '2025-06-22',
      items: ['Organic Shampoo', 'Aloe Vera Soap'],
      total: 425,
      status: 'Delivered',
    },
    {
      id: 2,
      date: '2025-06-18',
      items: ['Hair Oil'],
      total: 349,
      status: 'Shipped',
    },
    {
      id: 3,
      date: '2025-06-10',
      items: ['Face Cream', 'Lotion'],
      total: 699,
      status: 'Delivered',
    },
  ];

  return (
    <div className="history-container">
      <h2>Past Orders</h2>
      {pastOrders.length === 0 ? (
        <p>You haven't placed any orders yet.</p>
      ) : (
        <table className="order-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Items</th>
              <th>Total (₹)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {pastOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.date}</td>
                <td>{order.items.join(', ')}</td>
                <td>{order.total}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default OrderHistory;
