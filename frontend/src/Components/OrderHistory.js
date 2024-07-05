import React, { useState, useEffect } from 'react';
import '../Stylesheets/OrderHistoryPage.css';
import axios from "axios"
import { Link } from 'react-router-dom';
const OrderHistory = () => {
  const [address,setaddress] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [cancellationSuccess, setCancellationSuccess] = useState(false);
  useEffect(() => {
 
    const fetchData = async () => {
      try {
        const addressid = localStorage.getItem('addressid');
        const response = await axios.get(`http://localhost:3005/v1/address/${addressid}`);
        setaddress(response.data);
      } catch (error) {
        console.log("Error", error);
      }
    };
    const fetchorder = async () => {
      try {
        const userid = localStorage.getItem('userid');
        const response = await axios.get(`http://localhost:3005/v1/order/${userid}`);
        setOrders(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData(); 
    fetchorder();
  
  }, []);


  const handleViewDetails = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
    setCancellationSuccess(false);
  };
  



  const handleCancelOrder = async (orderid) => {
    try {
        const response = await axios.patch(`http://localhost:3005/proceed/${orderid}`);
        if (response.data.success) {
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.orderid === orderid ? { ...order, cancel: false } : order
                )
            );
            setCancellationSuccess(true);
        } else {
            console.error('Error cancelling order:', response.data.message);
        }
    } catch (error) {
        console.error('Error cancelling order:', error);
    }
};


  const handleReorder = (orderId) => {
    // Logic for reordering (e.g., add the order items to the cart)
    console.log(`Reordering items from order ID: ${orderId}`);
  };

  const handleLeaveReview = (orderId) => {
    // Logic for leaving a review
    console.log(`Leaving a review for order ID: ${orderId}`);
  };

  return (
    <div className="mainprofileform">
    <div className="order-history-container">
      <h2>Order History</h2>
      <div className="orders">
      {
        orders && orders.length>0 ?   orders.map(order => (
          <div key={order._id} className="order-card">
            <div className="order-header">
              <div>Order ID: {order.orderid}</div>
              <div>Date: {order.date}</div>
              <div>Total: {order.totalprice}</div>
              {/* <div>Status: <span className={`status ${order.status.toLowerCase()}`}>{order.status}</span></div> */}
            </div>
            <div className="order-items">
            {orders && order.cartData && order.cartData.map((item, index) => (
                     <div key={index} className="order-item">
                      <div> {item.name.length > 20 ? `${item.name.slice(0, 20)}...` : item.name}</div>
                        <div>Quantity: {item.qty}</div>
                        <div>Price: {item.price}</div>
                            </div>
                   ))}
            </div>
            <div className="order-details">
             {address.map(item =>(
              <div><strong>Shipping Address</strong>{item.area},{item.landmark},{item.pincode},{item.town},{item.state}</div>
             ))}
              <div><strong>Payment Method:</strong> upi</div>
              <div><strong>Tracking Number:</strong> +23456789</div>
              <div><strong>Customer Notes:</strong> happy shopping</div>
            </div>
            <div className="order-actions">
            <Link to={`/tracking/${order.orderid}`}> <button>Track</button></Link>
             {order.cancel ?<button onClick={()=> handleCancelOrder(order.orderid)}>cancel</button>:<button disabled>cancelled </button>}
            </div>
          </div>
        )) : <p>Login to get orderdetails</p>}
      
      </div>

      {selectedOrder && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <h2>Order Details</h2>
            <div><strong>Order ID:</strong> {selectedOrder.id}</div>
            <div><strong>Date:</strong> {selectedOrder.date}</div>
            <div><strong>Total:</strong> {selectedOrder.total}</div>
            <div><strong>Status:</strong> {selectedOrder.status}</div>
            <div className="order-items">
              {selectedOrder.items.map((item, index) => (
                <div key={index} className="order-item">
                  <div>{item.name}</div>
                  <div>Quantity: {item.quantity}</div>
                  <div>Price: {item.price}</div>
                </div>
              ))}
            </div>
            <div><strong>Shipping Address:</strong> {selectedOrder.shippingAddress}</div>
            <div><strong>Payment Method:</strong> {selectedOrder.paymentMethod}</div>
            <div><strong>Tracking Number:</strong> {selectedOrder.trackingNumber}</div>
            <div><strong>Customer Notes:</strong> {selectedOrder.customerNotes}</div>
            <div className="modal-actions">
              <button onClick={() => handleReorder(selectedOrder.id)}>Reorder</button>
              <button onClick={() => handleLeaveReview(selectedOrder.id)}>Leave Review</button>
            </div>
            {cancellationSuccess && <div className="cancellation-success">Order successfully cancelled!</div>}
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default OrderHistory;
