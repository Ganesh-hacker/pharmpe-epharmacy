import React from "react";
import Navbar from "../Components/Navbar";
import Home from "../Components/Home";
import SearchBar from "../Components/SearchBar";
import Cards from "../Components/Cards";
import Footer from "../Components/Footer";
import MySwiper from "../Components/MySwiper";

export default function Homepage(){
    
    return(
      <div>
        <Navbar />
        <Home />
        <SearchBar />
        <MySwiper />
        <Cards />
        <Footer />
   </div>   
 );
}