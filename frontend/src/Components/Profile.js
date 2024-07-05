import React from "react";
import { Link } from "react-router-dom";
import "../Stylesheets/Profilestyles.css"
import checkout from "../Assets/checkout.png"
import shoppingcart from "../Assets/shoppingcart.png" 
import editprofile from "../Assets/editprofile.png"
import manageaddress from "../Assets/manageaddress.png"
import Logout from "../Assets/Logout.png"
import history from "../Assets/history.png"
const Profile = () => {
    function handleLogout(){
        localStorage.clear()
        window.location.href = '/';  
        
    }
    return (
        <div>
            <div className="main-container">
                <header className="profileheader">
                    <div className="profilepartcontainer">
                        <h1>Profile</h1>
                    </div>
                </header>

                <section className="profile fade-in">
                    <div className="profilepartcontainer">
                        <div className="profile-info">
                            <div className="profile-image">
                                <img src="https://t3.ftcdn.net/jpg/05/53/79/60/360_F_553796090_XHrE6R9jwmBJUMo9HKl41hyHJ5gqt9oz.jpg" alt="Profile" />
                            </div>
                            <div className="user-details">
                                <h2>User</h2>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="orders fade-in">
                    <div className="profilepartcontainer">
                        <h2 className="section-head">Your Orders</h2>
                        <div class="profile-item">
    <span><img class="profileicons" src={ checkout} alt="Checkout Icon"/></span>
   <Link to="/recentorders" style={{textDecoration:"none"}}> <p className="list-item">Recent Orders</p></Link>
</div>
<div class="profile-item">
    <span><img class="profileicons" src={shoppingcart} alt="Checkout Icon"/></span>

    <Link to="/cartdetails" style={{textDecoration:"none"}}> <p className="list-item">Cart Items</p></Link>

    <p className="list-item">Cart Items</p>
</div>
<div class="profile-item">
    <span><img class="profileicons" src={history} alt="Checkout Icon"/></span>
    <p className="list-item">Order History</p>   

</div>

       
                    </div>
                </section>

                <section className="settings fade-in">
                    <div className="profilepartcontainer">
                        <h2 className="section-head">Profile Settings</h2>
                        <Link to="/profile?user=665d59d0d5f702827ed10840" class="profile-item" > 
  <span><img class="profileicons" src={editprofile} alt="Checkout Icon"/></span>
  <Link to="/editprofile" style={{textDecoration:"none"}}>  <p className="list-item">Edit profile</p></Link>
</Link>
<div class="profile-item">
    <span><img class="profileicons" src={manageaddress} alt="Checkout Icon"/></span>
    <Link to="/address" style={{textDecoration:"none"}}> <p className="list-item">Manage Address</p></Link>
</div>
  
</div>
                </section>
                <section className="logout fade-in">
                    <div className="profile-item profilepartcontainer" onClick={handleLogout}>
                    <span><img class="profileicons2" src={Logout } alt="Checkout Icon"/> </span>   <h2 className="section-head">Logout</h2>
                    </div>
                </section>

               
            </div>
        </div>
    );
};

export default Profile;