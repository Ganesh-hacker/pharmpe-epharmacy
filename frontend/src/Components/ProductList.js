import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import Productlistdiv from "./Productlistdiv";
import '../Stylesheets/ProductList.css'; // Import the CSS file

const ProductList = () => {
  const [backenddata, setBackendData] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation(); 

  useEffect(() => {
    const params = new URLSearchParams(location.search); 
    const search = params.get('search');
    console.log("search", search);

    fetch(`http://localhost:3005/v1/medicines/query?search=${search}`) 
      .then(response => response.json())
      .then(data => setBackendData(data))
      .catch(error => {
        setError(error);
        console.error('Error fetching data:', error);
      });
  }, [location.search]); 

  const Divobj = backenddata ? backenddata.map(product => (
    <Productlistdiv key={product.Id} product={product} />
  )) : null;

  return (
    <div className="productmaindiv">
      {error ? <div>Error fetching data</div> : Divobj}
    </div>
  );
};

export default ProductList;
