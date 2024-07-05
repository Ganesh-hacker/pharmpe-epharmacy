import React from "react";
import '../Stylesheets/ShippingAddress.css';

export default function Addresscompbox({ _id, name, houseNumber, area, landmark, town, state, pincode, number, toggle }) {
    const deleteaddress = async () => {
        try {
            const response = await fetch(`http://localhost:3005/address/${_id}/${localStorage.getItem('userid')}`, {
                method: "DELETE",
            });
            if (response.ok) {
                window.location.href = `/address`;;
            } else {
                console.error("Error deleting item");
            }
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };
    
    function handleaddress() {
        localStorage.setItem("addressid", _id);
        console.log("Address ID:", localStorage.getItem("addressid"));
    }

    return (
        <label className='shippingaddress-item'>

            <input type="radio" name="selectedAddress" className="input-class" onClick={() => { handleaddress(); toggle(_id); }} />

            <div>
                <div><b>{name}</b></div>
                <div>{houseNumber}</div>
                <div>{area}</div>
                <div>{landmark}</div>
                <div>{town} {state} {pincode}</div>
                <div>{number}</div><br />
                <div className='edit-buttons'>
                    <button onClick={() => toggle(_id)}>Edit</button>
                    <button onClick={deleteaddress}>Remove</button>

            </div>
        </div>
    </label>
    )
}