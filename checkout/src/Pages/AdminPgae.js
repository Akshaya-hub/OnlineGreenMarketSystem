import React, { useEffect, useState } from 'react';
import './AdminOrdersPage.css'; // Import the CSS file for styling

const AdminPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch orders from the API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/cartItems/cart');
        const data = await response.json();
        setOrders(data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch orders');
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Handle the confirm order action
  const handleConfirmOrder = async (orderId) => {
    try {
      // API call to update order status
      const response = await fetch(`http://localhost:8000/api/cartItems/confirm/${orderId}`, {
        method: 'PUT', // Assuming you use PUT to update the order status
      });

      if (!response.ok) throw new Error('Order confirmation failed');

      const updatedOrders = orders.map(order =>
        order._id === orderId ? { ...order, status: 'Confirmed' } : order
      );
      setOrders(updatedOrders);
    } catch (error) {
      setError('Failed to confirm the order');
    }
  };

  if (loading) return <div>Loading orders...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="admin-orders-page">
      <header className="admin-header">
        <h1>Admin - Orders Management</h1>
      </header>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search orders by name, ID, or status..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="orders-table">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders
              .filter(order =>
                order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order._id.includes(searchTerm) ||
                order.status.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map(order => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.name}</td>
                  <td>{order.cartQuantity}</td>
                  <td>${order.totalAmount.toFixed(2)}</td>
                  <td>
                    <span
                      className={`status-badge ${
                        order.status === 'Confirmed' ? 'status-confirmed' : 'status-pending'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="confirm-btn"
                      onClick={() => handleConfirmOrder(order._id)}
                      disabled={order.status === 'Confirmed'}
                    >
                      {order.status === 'Confirmed' ? 'Confirmed' : 'Confirm'}
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;
