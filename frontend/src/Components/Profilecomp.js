
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import "../Stylesheets/Profilestyles.css"
import { Link } from 'react-router-dom'; 
export default function Profilecomp(){
  const id=localStorage.getItem('userid');
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
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then(data => {
        if (data.length > 0) {
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

  const handledataChange = (e) => {
    const { name, value } = e.target;
    setBackendData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handledataSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3005/login/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(backenddata),
      });
      if (!response.ok) {
        throw new Error('Failed to update user data');
      }
      const updatedData = await response.json();
      console.log('User data updated successfully:', updatedData);

      // Optionally, update local state with new data
      setBackendData(updatedData);
      window.location.href = `/profile?user=${localStorage.getItem('userid')}`; 
    } catch (error) {
      console.error('Error updating user data:', error);
      setError(error.message);
    }
  };
    return(
        <div className="mainprofileform">
           <div className="profileform-container">
        <h1>Edit Profile</h1>
        <form  onSubmit={handledataSubmit}>
            <label for="name" className="profilelabeltext">Name*</label>
            <input type="text" id="name" name="name" required value={backenddata.name} onChange={handledataChange}/>
            
            <label for="mobile" className="profilelabeltext">Mobile Number*</label>
            <input type="tel" id="mobile" name="mobile"  value={backenddata.mno} onChange={handledataChange}/>
            
            <label for="email" className="profilelabeltext">Email*</label>
            <input type="email" id="email" name="email" required value={backenddata.email} onChange={handledataChange} />
            
           <button type="submit">Save</button>
        </form>
    </div>
        </div>
    )
}