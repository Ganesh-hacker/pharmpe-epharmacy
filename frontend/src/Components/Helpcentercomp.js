import React from "react";
import "../Stylesheets/helppage.css";

export default function Helpcentercomp() {
    const [searchvar, setsearchvar] = React.useState({ search: "" });

    function handleChange(event) {
        const { value, name } = event.target;
        setsearchvar(prevSearch => ({
            ...prevSearch,
            [name]: value
        }));
    }

    return (
        <main>
            <section>
                <form action="/helpcenterinfo">
                    <div className="header-middle">
                        <input 
                            type="search" 
                            name="search" 
                            value={searchvar.search} 
                            onChange={handleChange} 
                            placeholder="Search medicines/Healthcare products" 
                            id="search-input" 
                        />
                    </div>
                </form>
                <h2>Hi, what can we help you with?</h2>
                <div className="services">
                    <a href="#general_issues" className="service">
                        <h3>General Issues</h3>
                        <p>Resolve all your Medicine & Healthcare order related queries.</p>
                    </a>
                    <a href="#delivery" className="service">
                        <h3>Delivery Issues</h3>
                        <p>Know the delivery status of your order.</p>
                    </a>
                    <a href="#ordersmanagement" className="service">
                        <h3>Order Management</h3>
                        <p>Know our returns policy and resolve your issues.</p>
                    </a>
                    <a href="#payments" className="service">
                        <h3>Payments</h3>
                        <p>Manage all your online medicine expenses.</p>
                    </a>
                    <a href="#returns" className="service">
                        <h3>Returns</h3>
                        <p>Learn all about our diagnostic services.</p>
                    </a>
                    <a href="#promotions" className="service">
                        <h3>Terms & Conditions</h3>
                        <p>Learn more about our promotion service.</p>
                    </a>
                    <a href="#general-enquiries" className="service">
                        <h3>General Enquiries</h3>
                        <p>Resolve non-medicine related queries.</p>
                    </a>
                    <a href="#pharmeasy-plus" className="service">
                        <h3>PharmEasy Plus</h3>
                        <p>Learn more about the PharmEasy Plus program.</p>
                    </a>
                    <a href="#pharmeasy-wallet" className="service">
                        <h3>PharmEasy Wallet</h3>
                        <p>Learn more about the PharmEasy Wallet.</p>
                    </a>
                </div>
            </section>
        </main>
    );
}
