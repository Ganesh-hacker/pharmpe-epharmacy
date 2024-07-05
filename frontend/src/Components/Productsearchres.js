
import "../Stylesheets/Searchresults.css"
import Productsearchresbox from "./Productsearcresbox"
import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';

export default function Productsearchres(){
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

const Divobj = backenddata ? backenddata.map(Data => (
  <Productsearchresbox key={Data.Id} {...Data} />
)) : null;
  return(
<div class="outer-container">
  { Divobj}
</div>
)
}
