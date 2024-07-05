import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import OrderTracking from "../Components/OrderTracking";
export default function Trackingpage(){
    return(
        <div>
            <Navbar/>
         <OrderTracking/>
        
        <Footer/>
        </div>
    )
}