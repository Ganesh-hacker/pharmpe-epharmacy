import React, { useState } from 'react';
import '../Stylesheets/PaymentForm.css';
const PaymentForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        city: '',
        pincode: '',
        email: '',
        phoneNumber: '',
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform any additional form validation or submission logic here
    };

    return (
        <form className="payment" onSubmit={handleSubmit}>
            <label><h1>Personal Information</h1></label>
            <input
                type="text"
                placeholder="First name"
                id="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                placeholder="Last name"
                id="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                id="city"
                name="city"
                placeholder="Enter City"
                value={formData.city}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                id="pincode"
                name="pincode"
                placeholder="Enter Pincode"
                value={formData.pincode}
                onChange={handleChange}
                required
            />
            <input
                type="email"
                id="email"
                placeholder="E-mail"
                value={formData.email}
                onChange={handleChange}
                required
            />
            <input
                type="number"
                id="phoneNumber"
                placeholder="Phone number"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                maxLength="11"
            />
            <button type="submit" id="pay">
                <a href="cardpay.html" target="_blank" rel="noopener noreferrer">Pay via Card</a>
            </button>
            <button type="submit" id="online-pay">
                <a href="onlinepay.html" target="_blank" rel="noopener noreferrer">Pay via UPI</a>
            </button>
        </form>
    );
};

export default PaymentForm;
