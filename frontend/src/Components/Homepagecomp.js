import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import close from "../Assets/Close.png";
import "../Stylesheets/homepage.css";

export default function Homepagecomp() {
    const [phoneNumber, setPhoneNumber] = useState(""); // State for storing the phone number input
    const [OTP, setOTP] = useState("");
    const [formVar, setFormVar] = useState(true);
    const [isLoading, setIsLoading] = useState(false); // State for loading animation
    const navigate = useNavigate(); // Initialize useNavigate

    const sendOtp = async (event) => {
        event.preventDefault(); // Prevent form submission and page refresh
        setIsLoading(true); // Start loading animation
        try {
            const response = await fetch('http://localhost:3005/send-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phoneNumber }),
            });
            const data = await response.json();
            console.log('OTP sent:', data);
            setFormVar(false);
        } catch (error) {
            console.error('Error sending OTP:', error);
        } finally {
            setIsLoading(false); // Stop loading animation
        }
    };

    const verifyOtp = async (event) => {
        event.preventDefault(); // Prevent form submission and page refresh
        setIsLoading(true); // Start loading animation
        try {
            const response = await fetch('http://localhost:3005/verify-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phoneNumber, code: OTP }),
            });
            const data = await response.text();
            console.log('Verification result:', data);
            if (data === 'Verification successful') { // Check if OTP is verified
                window.location.href = '/';            } else {
                alert('Invalid OTP. Please try again.');
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
        } finally {
            setIsLoading(false); // Stop loading animation
        }
    };

    const togglePopup = (isVisible) => {
        document.querySelector('.popup').style.display = isVisible ? 'block' : 'none';
        document.querySelector('.overlay').style.display = isVisible ? 'block' : 'none';
    };

    return (
        <div>
            <button onClick={() => togglePopup(true)}>Login</button>
            <div className="overlay" onClick={() => togglePopup(false)}></div> {/* Overlay for the shaded background */}
            <div className="popup">
                <div className="loginhead">
                    <img className="crossingbutton" onClick={() => togglePopup(false)} src={close} alt="Close" />
                    <h1>Login/Signup to continue with your order</h1>
                </div>
                <div className="popup-content">
                    {isLoading && <div className="loading">Loading...</div>}
                    {!isLoading && formVar && (
                        <form onSubmit={sendOtp}> {/* Add onSubmit handler to the form */}
                            <div className="loginformbox">
                                <label htmlFor="phoneNumber" className="loginlabel">Enter your mobile number</label> {/* Changed 'for' to 'htmlFor' */}
                                <input 
                                    type="tel" 
                                    name="phoneNumber" 
                                    className="addressinput" 
                                    placeholder="Mobile Number*" 
                                    value={phoneNumber} 
                                    onChange={(e) => setPhoneNumber(e.target.value)} 
                                    required 
                                /><br />
                                <button className="add-new-address" type="submit">Send OTP</button> {/* Use 'type="submit"' for better usability */}
                            </div>
                            <div>By continuing, you agree with our Privacy Policy and Terms and Conditions</div>
                        </form>
                    )}
                    {!isLoading && !formVar && (
                        <form onSubmit={verifyOtp}> {/* Add onSubmit handler to the form */}
                            <div className="loginformbox">
                                <label htmlFor="OTP" className="loginlabel">Enter OTP sent to your mobile*</label> {/* Changed 'for' to 'htmlFor' */}
                                <input 
                                    type="text" 
                                    name="OTP" 
                                    className="addressinput" 
                                    placeholder="OTP*" 
                                    value={OTP} 
                                    onChange={(e) => setOTP(e.target.value)} 
                                    required 
                                /><br />
                                <button className="add-new-address" type="submit">Continue</button> {/* Use 'type="submit"' for better usability */}
                            </div>
                            <div>By continuing, you agree with our Privacy Policy and Terms and Conditions</div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
