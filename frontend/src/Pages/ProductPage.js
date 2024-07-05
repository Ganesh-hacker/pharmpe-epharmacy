import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import '../Stylesheets/ProductPage.css';
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Productpagecomp from "../Components/Productpagecomp"
const ProductPage = () => {
 
  return (
    <div>
      <Navbar/>
   <Productpagecomp/>
   <Footer/>
   </div>
  );
};

export default ProductPage;
