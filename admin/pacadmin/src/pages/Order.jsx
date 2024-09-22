import React, { useState, useEffect } from 'react';
import './materials.css'; // CSS file for styling
import axios from 'axios';

const Order = () => {
  const [orders, setOrders] = useState([]);

  // Fetch orders from backend
  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/packing-orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Handle status change (e.g., marking as delivered)
  const handleStatusChange = async (id) => {
    try {
      await axios.put(`http://localhost:4000/api/packing-orders/${id}`, { status: 'Delivered' });
      fetchOrders(); // Refresh orders
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div className="order-container">
      <h2>Packing Orders</h2>
      <table className="order-table">
        <thead>
          <tr>
            <th>Pa_Id</th>
            <th>Pro_Id</th>
            <th>O_Id</th>
            <th>Quantity</th>
            <th>Material</th>
            <th>Internal Measurement</th>
            <th>Custom Wrap</th>
            <th>Custom Note</th>
            <th>Deliver Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td>{order.pa_id}</td>
              <td>{order.pro_id}</td>
              <td>{order.o_id}</td>
              <td>{order.quantity}</td>
              <td>{order.material}</td>
              <td>{order.internalMeasurement}</td>
              <td>
                {order.customWrap !== '-' ? <img src={order.customWrap} alt="Custom Wrap" className="wrap-image" /> : '-'}
              </td>
              <td>{order.customNote}</td>
              <td>{order.deliverDate}</td>
              <td>
                {order.status !== 'Delivered' ? (
                  <button onClick={() => handleStatusChange(order._id)} className="deliver-btn">
                    Deliver
                  </button>
                ) : (
                  <span>Delivered</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Order;
