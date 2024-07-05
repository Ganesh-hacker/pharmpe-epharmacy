import React, { useState, useEffect } from "react";
import "../Stylesheets/Helpcenterinfo.css";
import { useLocation } from 'react-router-dom';

import Helpcenterdiv from "./Helpcenterdiv";

export default function Helpcenterinfocomp(props) {
    const [backenddata, setBackendData] = useState([]);
    const [error, setError] = useState(null);
    const location = useLocation(); 

    useEffect(() => {
        const params = new URLSearchParams(location.search); 
        const search = params.get('search');
        console.log("search", search);

        fetch(`http://localhost:3005/v1/query?search=${search}`) 
            .then(response => response.json())
            .then(data => setBackendData(data))
            .catch(error => {
                setError(error);
                console.error('Error fetching data:', error);
            });
    }, [location.search]); 

    const Divobj = backenddata ? backenddata.map(Data => (
        <Helpcenterdiv key={Data.id} {...Data} />
    )) : null;

    return (
        <div>
            <div className="helpcenterinfobox1">
                <div className="flexrowhelpcenterinfo1">
                    <div className="flexcolhelpcenterinfo1">
                        <h1 style={{ fontWeight: 'bold' }}>Search results</h1>
                        <p style={{ fontSize: '15px', fontWeight: 'bold', color: 'black', opacity: '0.7' }}>How-to . Customer</p>
                        {Divobj}
                    </div>
                    <div>
                        <p style={{ fontSize: '22px', fontWeight: 'bold' }}>Need to get in touch?</p>
                        <p style={{ fontSize: '1.7rem', color: '#595959', letterSpacing: 'normal' }}>We’ll start with some questions and get you to the right place.</p>
                        <div style={{ margin: '16px 16px 16px 0px' }}>
                            <a href="#" className="helpcentercontactus">Contact us</a>
                        </div>
                        <p style={{ fontSize: '1.7rem', color: '#595959', letterSpacing: 'normal' }}>You can also <a href="#" style={{ fontSize: '16px', textDecoration: 'underline', color: 'black' }}> give us feedback.</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
}
