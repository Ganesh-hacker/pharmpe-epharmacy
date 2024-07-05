import React, { useState, useEffect } from 'react';
import '../Stylesheets/onlinepay.css';
import axios from "axios";
const Onlinepay = () => {
    const [paymentType, setPaymentType] = useState('select');
    const [additionalInput, setAdditionalInput] = useState('');
    const [upi,setupi]=useState('');
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [count, setCount] = useState(300);
    const [address, setAddress] = useState([]);
    const [cartdata,setcartdata] = useState([]);
    const [editAddress, setEditAddress] = useState(false);
    const [newAddress, setNewAddress] = useState('');
    const totalprice = localStorage.getItem('totalprice');
    const userid = localStorage.getItem('userid')
    const addressid = localStorage.getItem('addressid')
    const orderid= localStorage.getItem('orderid')
    useEffect(() => {
        let countdown;
        if (showConfirmation) {
            countdown = setInterval(() => {
                setCount((prevCount) => {
                    if (prevCount <= 0) {
                        clearInterval(countdown);
                        window.location.href = 'success.html';
                        return 0;
                    }
                    return prevCount - 1;
                });
            }, 1000);
        }
        return () => clearInterval(countdown);
    }, [showConfirmation]);

    const handlePaymentTypeChange = (e) => {
        setPaymentType(e.target.value);
        if (e.target.value === 'Phone') {
            setAdditionalInput(<input type="text" className='upi-input' name="phoneNumber" placeholder="Enter Phone Number" />);
        } else if (e.target.value === 'UPI') {
            setAdditionalInput(<input type="email" className='upi-input' name="upi" placeholder="Enter UPI ID" onChange={(e)=>setupi(e.target.value)}/>);
        } else {
            setAdditionalInput('');
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setShowConfirmation(true);
    };

    const handleEditAddressChange = () => {
        setEditAddress(!editAddress);
    };

    const handleSaveAddress = () => {
        setAddress(newAddress);
    };

    const handleOtpSubmit = () => {
        window.location.href = 'success.html';
    };

    const minutes = Math.floor(count / 60);
    const seconds = count % 60 < 10 ? '0' + (count % 60) : count % 60;
   
    useEffect(() => {
        const fetchData = async () => {
          try {
            const addressId = localStorage.getItem('addressid');
            const response = await axios.get(`http://localhost:3005/v1/address/${addressId}`);
            setAddress(response.data);
          } catch (error) {
            console.log("Error", error);
          }
        };
        fetchData(); 
      }, []);
   
      useEffect(()=>{
     const fetchproducts = async () => {
             try {
               const userid = localStorage.getItem('userid');
               const response = await axios.get(`http://localhost:3005/v1/cart/${userid}`);
               setcartdata(response.data);
             } catch (error) {
              console.log(error);
             }
           };
           fetchproducts();
       },[])

      const handleProcess = async () =>{
        try{
        const response = await axios.post ("http://localhost:3005/proceed",{
            userid: userid,
            address,
            orderid:orderid,
            upi:upi,
            cartData:cartdata,
            totalprice:totalprice
        })
        alert("order successfully placed with a order id "+response.data.orderid);
        await axios.delete(`http://localhost:3005/cart/${userid}`)
    }catch(error){
        console.log(error);
    }

    }

    return (
        <div>
            {!showConfirmation ? (
                <div className="container" id="paymentForm">
                    <h2>Make Payment</h2>
                    <form onSubmit={handleFormSubmit}>
                        <p className="paymentType1">Select payment Type:</p>
                        {/* <label htmlFor="paymentType">Select Payment Type:</label> */}
                        <select name="paymentType" id="paymentType" onChange={handlePaymentTypeChange} value={paymentType}>
                            <option value="select">--select--</option>
                            <option value="UPI">UPI</option>
                            <option value="Phone">Phone Number</option>   
                           
                        </select>
                        <br />
                        <div id="additionalInput">{additionalInput}</div>
                        <input type="submit" value="Proceed" onClick={handleProcess} />
                    </form>
                    <div className="summary-container">
                        <h2>Payment Summary</h2>
                        <div className="summary-item">
                            <span>Shipping Charges:</span>
                         {totalprice < 1500 ? <span>₹ 100</span> : <span>Free</span>}
                        </div>
                        <div className="summary-item">
                            <span>Expenses:</span>
                            <span>$50.00</span>
                        </div>
                        <div className="summary-item">
                            <span>GST:</span>
                            <span>$6.00</span>
                        </div>
                        <div className="summary-item">
                            <span>Total Cost:</span>
                            {totalprice < 1500 ? <span>{totalprice+100}</span> : <span>{totalprice}</span>}
                        </div>
                    </div>
                    <div className="address-container">
                        <h2>Address</h2>
                        <div className="address-item">
                            <span>Address:</span>
                            <span id="address-display">{address.map((item) => (
                                         <div key={item._id}>
                                           <p>Name: {item.name}</p>
                                          <p>Number: {item.number}</p>
                                          <p>Pincode: {item.pincode}</p>
                                       <p>House Number: {item.houseNumber}</p>
                                              <p>Area: {item.area}</p>
                                             <p>Landmark: {item.landmark}</p>
                                           <p>Town: {item.town}</p>
                                        <p>State: {item.state}</p>
                                          </div>
                                       ))}</span>
                           
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                name="editAddress"
                                id="editAddress"
                                checked={editAddress}
                                onChange={handleEditAddressChange}
                            />
                            <label className="form-check-label" htmlFor="editAddress">
                                Edit Address
                            </label>
                        </div>
                        {editAddress && (
                            <div className="edit-address-container">
                                <label htmlFor="edit-address" className="form-label">New Address</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="edit-address"
                                    placeholder="Enter your new address"
                                    value={newAddress}
                                    onChange={(e) => setNewAddress(e.target.value)}
                                />
                                <input
                                    type="button"
                                    className="btn btn-secondary mt-2"
                                    value="Save Address"
                                    onClick={handleSaveAddress}
                                />
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="container confirmation" id="confirmation">
                    <h2>Please Confirm the Payment</h2>
                    <p>Please wait <span id="countdown">{minutes}:{seconds}</span> minutes for transaction confirmation...</p>
                    <input type="text" id="otp" name="otp" placeholder="Enter OTP" />
                    <input type="button" value="Submit OTP" onClick={handleOtpSubmit} />
                </div>
            )}
        </div>
    );
};

export default Onlinepay;
