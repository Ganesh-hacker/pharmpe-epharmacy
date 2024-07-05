// src/ProfileCard.js

import React, { useEffect, useState, useRef } from "react";
import { useLocation } from 'react-router-dom';
import '../Stylesheets/profileCard.css'
import { Link } from "react-router-dom";
const ProfileCard = () => {

    const phoneNumber=localStorage.getItem('user')
    const [backenddata, setBackendData] = useState({
      name: '',
      mno: '',
      email: ''
    });
    const [error, setError] = useState(null);
    const location = useLocation(); 
  //   const backendurl="https://backend2-n5wy.onrender.com"
    const username = localStorage.getItem('username');
    useEffect(() => {
      fetch(`http://localhost:3005/login/${phoneNumber}`)
        .then(response => {
          if (!response.ok) {
            console.log('Failed to fetch data');
          }
          return response.json();
        })
        .then(data => {
          if (data.length >0) {
            setBackendData({
              name: data[0].name || '',
              mno: data[0].mno || '',
              email: data[0].email || ''
            });
          } else {
            throw new Error('No items found in the cart for this user');
          }
        })
        .catch(error => {
          setError(error.message);
          console.error('Error fetching data:', error);
        });
    }, [phoneNumber]);
    const [cartedItems, setCartedItems] = useState([]);
    const [loading, setLoading] = useState(true);   
     const userid = localStorage.getItem('userid');
     const calculateCartTotal = () => {
        return cartedItems.reduce((acc, item) => acc + item.price * item.quantity);
      };

    // const [products,setProducts]=useState([]);
    // setProducts([...products, "newProduct"]);
    // const totalProducts=products.length;           

    const [products,setProducts]=useState([]);
  
  useEffect(() => {
    const userId = localStorage.getItem('userid');
    fetch(`http://localhost:3005/v1/cart/${userId}`)
      .then(response => response.json())
      .then(data => {
        setCartedItems(data);
      })
      .catch(error => {        setError(error);
        console.error('Error fetching data:', error);
      });

  }, []);
useEffect(()=>{
      const userid = localStorage.getItem('userid');
      // const response = await axios.get(`http://localhost:3005/v1/order/${userid}`);
      fetch(`http://localhost:3005/v1/order/${userid}`)
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        console.log("products",products)
      })
      .catch(error => {
        setError(error);
        console.error('Error fetching data:', error);
      });
  },[])
    console.log("products",products)
    // const totalProducts=products.length;



  return (
    <div className="profile-card">
      
      <div className='profile-card-content'>
          <div className='profile-card-sub-content'>
              <div>
                  <img src="https://t3.ftcdn.net/jpg/05/53/79/60/360_F_553796090_XHrE6R9jwmBJUMo9HKl41hyHJ5gqt9oz.jpg" alt="Profile" className="profile-img" />
              </div>
              <div className='profile-card-details-container'>
                  <div>
                      <h2 className="profile-name">{backenddata.name}</h2>
                      <p className="profile-email"> {backenddata.email}</p>
                      <p className="profile-mobile">{backenddata.mno}</p>
                     <Link to="/editprofile">  <button  className="profile-button">Edit Details</button></Link> 
                  </div>
                  <div className='cart-and-order-details'>
                      <p className='items-purchased'>Carted products : {cartedItems.length}</p>
                    <p className='items-purchased'>Purchased products:{products.length}</p>
                  </div>
              </div>
          </div>
     </div>
    </div>
  );
};

export default ProfileCard;
