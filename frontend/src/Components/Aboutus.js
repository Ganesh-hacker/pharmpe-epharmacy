import React from "react";
import AboutUsBanner from '../Assets/AboutUsBanner.jpg';
import bestPriceIcon from '../Assets/bestPriceIcon.jpg';
import DeliveryService from '../Assets/DeliveryService.jpg';
import satisfy from '../Assets/satisfy.jpg';
import '../Stylesheets/Aboutus.css';

export default function Aboutus() {
    return (
        <div>
        <div className="aboutUsContentContainer aboutUsContent">
            <div className="aboutUsBanner" style={{textAlign: 'center', position: 'relative'}}>
                <img className="img-sz" src={AboutUsBanner} style={{height: '200px', width: '100%'}} alt="About Us Banner" />
                <div className="head-sz" style={{fontWeight: 'bold', fontSize: '50px', color: 'black', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textShadow: '2px 2px rgb(67, 67, 163)'}}>
                    About Us
                </div>
            </div>
            <h1 className="fadeIn mid-sz" style={{textAlign: 'center'}}>--Who We Are and What We Do--</h1>
            <div className="aboutDesc fadeIn mid1-sz">Welcome to Pharmpe, your trusted partner in health and wellness. Established in [Year], we have been dedicated to providing our community with high-quality pharmaceutical care. Our team of licensed pharmacists and healthcare professionals are committed to ensuring that you receive personalized, comprehensive, and compassionate care.  
            </div>
            <div className="w3-container w3-center DescContainerLeft" id="slideLeft" style={{marginRight: 'auto', marginLeft: 'auto', width: 'fit-content'}}>
                <div className="DescBoxLeft mid2-sz">Why Pharmpe</div>
                <p className="mid3-sz" style={{textAlign: 'center', marginTop: '50px', color: 'rgb(128, 128, 128)'}}>We provide accurate and timely prescription filling services, ensuring that you receive the correct medications as prescribed by your healthcare provider.
and Our pharmacists are available for one-on-one consultations to discuss your medications, answer your questions, and provide valuable health advice.
We also offer medication synchronization, refill reminders, and reviews to help you manage your medications effectively.</p>
            </div>
            <div className="w3-container w3-center DescContainerRight" id="slideRight" style={{marginRight: 'auto', marginLeft: 'auto', width: 'fit-content'}}>
                <div className="DescBoxRight mid2-sz">Why Choose Us</div>
                <p className="mid3-sz" style={{textAlign: 'center', marginTop: '50px', color: 'rgb(128, 128, 128)'}}>We Provide a variety of OTC medications, supplements, and health products to support your overall well-being.
and Protect yourself and your loved ones with our vaccination services, including flu shots, travel vaccines, and more.
We also offer health screenings for blood pressure, cholesterol, diabetes, and other conditions to help you stay proactive about your health.</p>
            </div>
            <h2 className="mid4-sz" style={{textAlign: 'center'}}>--What We Provide--</h2>
            <div className="flip-card-Container" style={{marginRight: 'auto', marginLeft: 'auto', width: 'fit-content', height:'350px'}}>
                <div className="flip-card">
                    <div className="flip-card-inner">
                        <div className="flip-card-front">
                            <img src={bestPriceIcon} alt="Best Prices & Offers" />
                            <p>Best Prices & Offers</p>
                        </div>
                        <div className="flip-card-back">
                            <h2>Best Prices & Offers</h2> 
                            <p>We provide the best value for money. We also specials on every weekend and special occasions. You can get the best quality products at the lowest prices at Pharmpe.com</p> 
                        </div>
                    </div>
                </div>
                <div className="flip-card">
                    <div className="flip-card-inner">
                        <div className="flip-card-front">
                            <img src={satisfy} alt="Satisfaction Guarantee" />
                            <p>Satisfaction Guarantee</p>
                        </div>
                        <div className="flip-card-back">
                            <h2>Satisfaction Guarantee</h2> 
                            <p>If you are not satisfied with any of our products for a valid reason, we will be more than happy to refund/replace those products for you (terms and conditions applied).</p> 
                        </div>
                    </div>
                </div>
                <div className="flip-card">
                    <div className="flip-card-inner">
                        <div className="flip-card-front">
                            <img src={DeliveryService} alt="Delivery Service" />
                            <p>Delivery Service</p>
                        </div>
                        <div className="flip-card-back">
                            <h2>Delivery Service</h2> 
                            <br></br>
                            <p>We also deliver multiple days a week in most areas. No more stucking in the traffic jams! The products will be delivered to your doorsteps</p> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        
    );
}
