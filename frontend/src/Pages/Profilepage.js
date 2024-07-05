import React from "react";
import Profile from "../Components/Profile";
import Profilecomp from "../Components/Profilecomp"
import "../Stylesheets/Profilestyles.css"
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
export default function Profilepage(){
    return(
        <div>
            <Navbar/>
        <div className="mainprofilepagecontainer">
            <Profile/>
           <Profilecomp/>
        </div>
        <Footer/>
        </div>
    )
}