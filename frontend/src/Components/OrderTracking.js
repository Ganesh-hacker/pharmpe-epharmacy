import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import axios from "axios";
import Tracksymbol from "./Tracksymbol";
import '../Stylesheets/OrderTracking.css';
import tracking from "../Assets/tracking.jpeg"
import 'bootstrap/dist/css/bootstrap.min.css';

export default function OrderTracking(){
    const { orderid } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
        const fetchOrder = async () => {
          if (orderid) {
            try {
              const response = await axios.get(`http://localhost:3005/order/${orderid}`);
              console.log('API Response:', response.data);
              setOrder(response.data);
              setLoading(false);
            } catch (error) {
              console.error('Error fetching order:', error);
              setLoading(false);
            }
          } else {
            console.log('No order ID provided');
            setLoading(false);
          }
        };
        fetchOrder();
      }, [orderid]);
  
   
      if (loading) {
        return <div>Loading...</div>;
      }
    
      if (!order || order.address.length === 0) {
        return <div>No order found</div>;
      }
    return (
      <div className="trackflexbox">
      <div>   <img className="trackboximg"  src={tracking} style={{marginTop:"50px"}}/>
            <p style={{width:"250px", margin:"10px 10px 0px 30px", alignItem:"center", fontWeight:"bold",opacity:"0.8"}} >Track Order</p>
        </div>
      <div className="main_container">    
      <div className="asinglebox  ">
        <div class="container padding-bottom-3x mb-1">
        <div class="card mb-3">
          <div class="p-4 text-center text-white text-lg bg-dark rounded-top"><span class="text-uppercase">Tracking Order No - </span><span class="text-medium">{orderid}</span></div>
          <div class="d-flex flex-wrap flex-sm-nowrap justify-content-between py-3 px-2 bg-secondary">
            <div class="w-100 text-center py-1 px-2"><span class="text-medium">Shipped Via:</span>Ground</div>
            <div class="w-100 text-center py-1 px-2"><span class="text-medium">Status:</span>Processing Order</div>
            <div class="w-100 text-center py-1 px-2"><span class="text-medium">Expected Date:</span> Jun 14, 2024</div>
          </div>
          <div class="card-body">
           
              <Tracksymbol 
              stage={order.status} /> 
          </div>
        </div>
        <div class="d-flex flex-wrap flex-md-nowrap justify-content-center justify-content-sm-between align-items-center">
          <div class="custom-control custom-checkbox mr-3">
            <input class="custom-control-input" type="checkbox" id="notify_me"    />
            <label class="custom-control-label" for="notify_me">Notify me when order is delivered</label>
          </div>
        </div>
      </div>

      </div>
      </div>
      <div style={{marginTop:"70px"}}>   
           <div style={{border:"1px solid black",borderRadius:"10px",padding:"10px",marginBottom:"20px",fontFamily:"sans-serif", marginLeft:"50px"}}>
            <p style={{fontWeight:"bold",textDecoration:"underline"}}>BILLING ADDRESS</p>
            <p style={{width:"250px", margin:"0px 10px 0px 0px", alignItem:"center", fontWeight:"bold",fontFamily:"sans-serif"}} >VSavvy</p>
            <p style={{width:"250px", margin:"0px 10px 0px 0px", alignItem:"center", opacity:"0.8",fontFamily:"sans-serif"}} >MRpalli Pin Code - ******</p>
            <p style={{width:"250px", margin:"0px 10px 0px 0px", alignItem:"center", opacity:"0.8",fontFamily:"sans-serif"}} >Tirupati ,Telephone No.	0*********</p>
            <p style={{width:"250px", margin:"0px 10px 0px 0px", alignItem:"center",opacity:"0.8",fontFamily:"sans-serif"}} >Andhra padesh</p>
            </div>
            <div style={{border:"1px solid black",borderRadius:"10px",padding:"10px",fontFamily:"sans-serif", marginLeft:"50px"}}>
            <p style={{fontWeight:"bold",textDecoration:"underline"}}>TO ADDRESS</p>
            <p style={{width:"250px", margin:"0px 10px 0px 0px", alignItem:"center", fontWeight:"bold",fontFamily:"sans-serif" }} > {order.address[0]?.name || 'N/A'}</p>
            <p style={{width:"250px", margin:"0px 10px 0px 0px", alignItem:"center", opacity:"0.8",fontFamily:"sans-serif"}} >  {order.address[0]?.houseNumber || 'N/A'}</p>
            <p style={{width:"250px", margin:"0px 10px 0px 0px", alignItem:"center", opacity:"0.8",fontFamily:"sans-serif"}} >{order.address[0]?.area || 'N/A'},{order.address[0]?.town || 'N/A'}</p>
            <p style={{width:"250px", margin:"0px 10px 0px 0px", alignItem:"center", opacity:"0.8",fontFamily:"sans-serif"}} > {order.address[0]?.state || 'N/A'} - {order.address[0]?.pincode || 'N/A'}</p>
            </div>
        </div>
      </div>
    );
  }