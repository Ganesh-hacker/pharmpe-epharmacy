import React, { useEffect, useState } from "react";
import '../Stylesheets/ShippingAddress.css';
import Addresscompbox from "./Addresscompbox";
import Profile from './Profile';

function ShippingAddress() {
    const [addressdetails, setaddress] = useState({ name: "", number: "", pincode: "", houseNumber: "", area: "", landmark: "", town: "", state: "" });
    const [addressdata, setaddressdata] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [togglevalue, settoggle] = useState();
    const [showModal, setShowModal] = useState(false);
    const [editIndex, setEditIndex] = useState(-1);
    const userid = localStorage.getItem('userid');

    useEffect(() => {
        setLoading(true);
        setError(null);

        fetch(`http://localhost:3005/address/${userid}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch address data');
                }
                return response.json();
            })
            .then(data => {
                setaddressdata(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
                console.error('Error fetching data:', error);
            });
    }, [userid]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setShowModal(false);
        try {
            const method = editIndex >= 0 ? 'PATCH' : 'POST';
            const url = `http://localhost:3005/address/${userid}${editIndex >= 0 ? `/${togglevalue}` : ''}`;
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(addressdetails),
            });

            if (response.ok) {
                const updatedData = await response.json();
                setaddressdata(prevData => editIndex >= 0 ? prevData.map(addr => addr._id === togglevalue ? updatedData : addr) : [...prevData, updatedData]);
                setShowModal(false);
                setaddress({ name: "", number: "", pincode: "", houseNumber: "", area: "", landmark: "", town: "", state: "" });
            } else {
                throw new Error('Failed to save address data');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setError(error.message);
        }
    };

    const handleChange = (event) => {
        const { value, name } = event.target;
        setaddress(prevaddressdetails => ({
            ...prevaddressdetails,
            [name]: value
        }));
    };

    function toggle(_id) {
        settoggle(_id);
        handleedit(_id);
    }

    const handleedit = (_id) => {
        setShowModal(true);
        const editaddress = addressdata.find(item => _id === item._id);
        setaddress({
            name: editaddress.name,
            number: editaddress.number,
            pincode: editaddress.pincode,
            houseNumber: editaddress.houseNumber,
            area: editaddress.area,
            landmark: editaddress.landmark,
            town: editaddress.town,
            state: editaddress.state,
        });
        setEditIndex(addressdata.findIndex(item => item._id === _id));
    };
    console.log(editIndex);

    function initialAddAddress() {
        console.log("intialization called");
        setShowModal(true);
        setEditIndex(-1);
        setaddress({ name: "", number: "", pincode: "", houseNumber: "", area: "", landmark: "", town: "", state: "" });
        
    }
useEffect(() => {
    console.log("showModal:", showModal);
  }, [showModal]);
    const addressdetailcomp = addressdata.map(item => (
        <Addresscompbox key={item._id} {...item} toggle={toggle} />
    ));

    return (
        <div className='shipping-address-container'>
            <Profile />
            <div className='content'>
                <button onClick={initialAddAddress} className='btn btn-addAddress'>ADD NEW ADDRESS</button>
                {showModal && (
                    <div>
                        <div className='modal-content'>
                            <h2>{editIndex >= 0 ? "Edit Address" : "Add a new Address"}</h2>

                             <form onSubmit={handleSubmit}>
                                <div >
                                <label className="label-class" htmlFor='name-container'>Full Name (First and last Name) :</label>
                                <input
                                className="input-class"

                                    type='text'
                                    name="name"
                                    value={addressdetails.name}
                                    id='name-container'
                                    onChange={handleChange}
                                    required
                                />
                                <label className="label-class" htmlFor='mobile-number-container'>Mobile Number :</label>
                                <input

                                className="input-class"

                                    type='text'
                                    name="number"
                                    value={addressdetails.number}
                                    onChange={handleChange}
                                    id='mobile-number-container'
                                    pattern="[1-9]{1}[0-9]{9}"
                                    maxLength="10"
                                    required
                                />
                                <label className="label-class" htmlFor='pincode-container'>Pincode :</label>
                                <input

                                className="input-class"

                                    type='text'
                                    name='pincode'
                                    value={addressdetails.pincode}
                                    onChange={handleChange}
                                    id='pincode-container'
                                    pattern="[0-9]{6}"
                                    maxLength="6"
                                    required
                                />
                                <label className="label-class" htmlFor='house-number-container'>Flat, House Number :</label>
                                <input

                                className="input-class"

                          

                                    type='text'
                                    name='houseNumber'
                                    value={addressdetails.houseNumber}
                                    onChange={handleChange}
                                    id='house-number-container'
                                    maxLength="100"
                                    required
                                />
                                <label className="label-class" htmlFor='area-container'><b>Area, Street, Village:</b></label>
                                <input

                                className="input-class"

                                    type='text'
                                    name='area'
                                    value={addressdetails.area}
                                    onChange={handleChange}
                                    id='area-container'
                                    maxLength="100"
                                    required
                                />
                                <label className="label-class" htmlFor='landmark-container'>Landmark:</label>
                                <input

                                className="input-class"

                                    type='text'
                                    name='landmark'
                                    value={addressdetails.landmark}
                                    placeholder='E.g. near apollo hospital'
                                    onChange={handleChange}
                                    id='landmark-container'
                                    maxLength="30"
                                />
                                <label className="label-class" htmlFor='town-container'>Town:</label>
                                <input
                                className="input-class"
                                    type='text'
                                    name='town'
                                    value={addressdetails.town}
                                    onChange={handleChange}
                                    id='town-container'
                                    maxLength="30"
                                    required
                                />
                                <label className="label-class" htmlFor='state-container'>State:</label>
                                <input
                                className="input-class"
                                    type='text'
                                    name='state'
                                    value={addressdetails.state}
                                    onChange={handleChange}
                                    id='state-container'
                                    maxLength="30"
                                    required
                                />
                                </div>
                                <div className='edit-buttons'>
                                <button type='submit'>{editIndex >= 0 ? "Save Changes" : "Add Address"}</button>
                                    <button type='button' onClick={() => setShowModal(false)}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                <div className='right-shipping-addresses'>
                    <h1>Saved Addresses</h1>
                    <div>
                        {addressdata.length ? (
                            addressdetailcomp
                        ) : (userid ?
                            <div>Add address</div>  :<div>Login to get  address</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShippingAddress;
