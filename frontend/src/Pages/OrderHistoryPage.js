import React from "react";
import OrderHistory from "../Components/OrderHistory"; 
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import Profile from "../Components/Profile"
export default function OrderHistoryPage() {
    return (
        <div>\
            <Navbar/>
            <div className="mainprofilepagecontainer">
            <Profile/>
            <OrderHistory/>
            </div>
            <Footer/>
        </div>   
    );
}
