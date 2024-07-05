import React, { useState, useRef, useEffect, useCallback } from "react";
import { Link, useNavigate } from 'react-router-dom';
import close from "../Assets/Close.png";
import keydropdown from "../Assets/keydropdown.png";
import "../Stylesheets/homepage.css";
import '../Stylesheets/Navbar.css';
import axios from 'axios';

const NavItem = React.memo(({ name, items, onClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li 
      className="nav-item"   
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onClick={onClick}
    >
      <a>{name}</a>
      {isOpen && items && (
        <ul className="dropdown">
          {items.map((item, index) => (
            <li key={index}><Link className="link-component" to={item.link} onClick={onClick}>{item.name}</Link></li>
          ))}
        </ul>
      )}
    </li>
  );
});

const Navbar = () => {
  const bottomNavItems = [
    { name: 'Home', items: [{ name: 'Profile', link: '/profile' }, { name: 'Recent orders', link: '/recentorders' }] },
    { name: 'Medicine' },
    { name: 'Health care' },
    { name: 'Health Blogs', items: [{ name: 'Privacy Policy', link: '/Privacy Policy' }] },
    { name: 'Value Store' },
    { name: 'Offers' },
    { name: 'Cart', items: [{ name: 'Cart Details', link: '/cartdetails' }] },
  ];

  const [formState, setFormState] = useState({
    phoneNumber: "",
    OTP: "",
    formVar: true,
    isLoading: false,
    user: localStorage.getItem('user') || 'Login/Signup',
    cart: [],
    pincode: "",
    cityName: '',
    error: '',
  });

  const navigate = useNavigate();
  const popupRef = useRef(null);
  const popupRef2 = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      setFormState(prevState => ({ ...prevState, cart: JSON.parse(storedProducts) }));
    }
  }, []);

  const sendOtp = async (event) => {
    event.preventDefault();
    setFormState(prevState => ({ ...prevState, isLoading: true }));
    try {
      const response = await fetch('http://localhost:3005/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber: formState.phoneNumber }),
      });
      const data = await response.json();
      console.log('OTP sent:', data);
      setFormState(prevState => ({ ...prevState, formVar: false }));
    } catch (error) {
      console.error('Error sending OTP:', error);
    } finally {
      setFormState(prevState => ({ ...prevState, isLoading: false }));
    }
  };

  const verifyOtp = async (event) => {
    event.preventDefault();
    setFormState(prevState => ({ ...prevState, isLoading: true }));
    try {
      const response = await fetch('http://localhost:3005/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber: formState.phoneNumber, code: formState.OTP }),
      });
      const data = await response.text();
      console.log('Verification result:', data);
      if (data === 'Verification successful') {
        const userInfoResponse = await fetch(`http://localhost:3005/login/${formState.phoneNumber}`);
        const userInfo = await userInfoResponse.json();
        if (userInfoResponse.status === 200) {
          console.log('User information:', userInfo);
          localStorage.setItem('login', 'true');
          localStorage.setItem('user', formState.phoneNumber);
          localStorage.setItem('userid', userInfo[0]._id);
          setFormState(prevState => ({ ...prevState, user: formState.phoneNumber }));
          setTimeout(() => {
            window.location.href = '/';
          }, 1000);
        } else {
          alert('User information not found.');
        }
      } else {
        alert('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
    } finally {
      setFormState(prevState => ({ ...prevState, isLoading: false }));
    }
  };

  const togglePopup = useCallback((isVisible) => {
    popupRef.current.style.display = isVisible ? 'block' : 'none';
    overlayRef.current.style.display = isVisible ? 'block' : 'none';
  }, []);

  const togglePopup2 = useCallback((isVisible) => {
    popupRef2.current.style.display = isVisible ? 'block' : 'none';
    overlayRef.current.style.display = isVisible ? 'block' : 'none';
  }, []);

  const handleCartClick = useCallback(async () => {
    const isLogged = localStorage.getItem('login');
    if (isLogged) {
      const userId = localStorage.getItem('userid');
      const currentCartResponse = await fetch(`http://localhost:3005/v1/cart/${userId}`);
      const currentCart = await currentCartResponse.json();
      const currentCartProductIds = currentCart.length > 0 ? currentCart.map(product => product.Id) : [];
      const newProducts = formState.cart.filter(product => !currentCartProductIds.includes(product.Id));
      const response = newProducts.map(async (product) => {
        await fetch(`http://localhost:3005/addingtocart/${product.Id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userid: userId,
            name: product.name,
            manufacturers: product.manufacturers,
            imgurl1: product.imgurl1,
            MRP: product.MRP,
            price: product.price,
          }),
        });
      });
      await Promise.all(response);
      localStorage.removeItem('products');
    }
  }, [formState.cart]);

  const getCityNameFromPincode = async (pincode) => {
    const url = `https://api.postalpincode.in/pincode/${pincode}`;
    try {
      console.log("pincode", pincode);
      const response = await axios.get(url);
      if (response.status === 200) {
        const data = response.data;
        if (data && data.length > 0 && data[0].PostOffice) {
          setFormState(prevState => ({ ...prevState, cityName: data[0].PostOffice[0].Block, error: '' }));
          localStorage.setItem('city', data[0].PostOffice[0].Block);
          window.location.href = '/';
        } else {
          setFormState(prevState => ({ ...prevState, cityName: '', error: 'City not found' }));
        }
      } else {
        setFormState(prevState => ({ ...prevState, cityName: '', error: 'Invalid pincode' }));
      }
    } catch (error) {
      console.error(error);
      setFormState(prevState => ({ ...prevState, cityName: '', error: 'An error occurred' }));
    }
  };

  const handlePincodeSubmit = (event) => {
    event.preventDefault();
    if (formState.pincode) {
      getCityNameFromPincode(formState.pincode);
    } else {
      setFormState(prevState => ({ ...prevState, cityName: '', error: 'Please enter a pincode' }));
    }
  };

  return (
    <div>
      <div className="top_nav">
        <div className="left">
          <div className="logo">
            <Link to="/" style={{ textDecoration: "none" }}>
              <p><span>Pharm</span>pe</p>
            </Link>
          </div>
        </div>
        <div className="left">
          <div className="pincode">
            {!localStorage.getItem('city') && (
              <p>
                <span>
                  <a href="#" onClick={() => togglePopup2(true)}>
                    Select your address please <img src={keydropdown} alt="dropdown" />
                  </a>
                </span>
              </p>
            )}
            {localStorage.getItem('city') && (
              <p>
                <span>
                 Deliver to <a href="#" onClick={() => togglePopup2(true)}>
                    {localStorage.getItem('city')} <img src={keydropdown} alt="dropdown" />
                  </a>
                </span>
              </p>
            )}
          </div>
        </div>
        <div className="right">
          <ul>
            {formState.user === 'Login/Signup' && (
              <li>
                <a href="#" onClick={() => togglePopup(true)}>LogIn/SignUp</a>
              </li>
            )}
            {formState.user !== 'Login/Signup' && (
              <li>
                <a href={`/profile?user=${localStorage.getItem('userid')}`}>Profile</a>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="bottom_nav">
        <ul>
          {bottomNavItems.map((item, index) => (
            item.name === 'Cart' ? (
              <NavItem key={index} name={item.name} items={item.items} onClick={handleCartClick} />
            ) : (
              <NavItem key={index} name={item.name} items={item.items} />
            )
          ))}
        </ul>
      </div>

      <div className="overlay" ref={overlayRef} onClick={() => { togglePopup(false); togglePopup2(false); }}></div>
      <div className="popup" ref={popupRef}>
        <div className="loginhead">
          <img className="crossingbutton" onClick={() => togglePopup(false)} src={close} alt="Close" />
          <h1>Login/Signup</h1>
        </div>
        <div className="popup-content">
          {formState.isLoading && <div className="loading">Loading...</div>}
          {!formState.isLoading && formState.formVar && (
            <form onSubmit={sendOtp}>
              <div className="loginformbox">
                <label htmlFor="phoneNumber" className="loginlabel">Enter your mobile number</label>
                <input 
                  type="tel" 
                  name="phoneNumber" 
                  className="addressinput" 
                  placeholder="Mobile Number*" 
                  value={formState.phoneNumber} 
                  onChange={(e) => setFormState(prevState => ({ ...prevState, phoneNumber: e.target.value }))} 
                  required 
                /><br />
                <button className="add-new-address" type="submit">Send OTP</button>
              </div>
              <div>By continuing, you agree with our Privacy Policy and Terms and Conditions</div>
            </form>
          )}
          {!formState.isLoading && !formState.formVar && (
            <form onSubmit={verifyOtp}>
              <div className="loginformbox">
                <label htmlFor="OTP" className="loginlabel">Enter OTP sent to your mobile*</label>
                <input 
                  type="text" 
                  name="OTP" 
                  className="addressinput" 
                  placeholder="OTP*" 
                  value={formState.OTP} 
                  onChange={(e) => setFormState(prevState => ({ ...prevState, OTP: e.target.value }))} 
                  required 
                /><br />
                <button className="add-new-address" type="submit">Continue</button>
              </div>
              <div>By continuing, you agree with our Privacy Policy and Terms and Conditions</div>
            </form>
          )}
        </div>
      </div>
      <div className="popup" ref={popupRef2}>
        <div className="loginhead">
          <img className="crossingbutton" onClick={() => togglePopup2(false)} src={close} alt="Close" />
          <h1>Choose your Location</h1>
        </div>
        <div className="popup-content">
          {formState.isLoading && <div className="loading">Loading...</div>}
          {!formState.isLoading && formState.formVar && (
            <form onSubmit={handlePincodeSubmit}>
              <div className="loginformbox">
                <input 
                  type="text" 
                  name="pincode" 
                  className="addressinput" 
                  placeholder="Enter your pincode*" 
                  value={formState.pincode} 
                  onChange={(e) => setFormState(prevState => ({ ...prevState, pincode: e.target.value }))} 
                  required 
                /><br />
                <button className="add-new-address" type="submit">Check</button>
              </div>
              <div>By continuing, you agree with our Privacy Policy and Terms and Conditions</div>
            </form>
          )}
          {formState.cityName && <div>{formState.cityName}</div>}
          {formState.error && <div>{formState.error}</div>}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
