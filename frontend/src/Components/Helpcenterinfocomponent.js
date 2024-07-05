import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../Stylesheets/Helpcenterinfocomponent.css";
import contactusimg from "../Assets/contactus.png"

export default function Helpcenterinfocomponent() {
  const [backendData, setBackendData] = useState([]);
  const [error, setError] = useState(null);
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchvar, setsearchvar] = React.useState({ search: "" });

  function handleChange(event) {
      const { value, name } = event.target;
      setsearchvar(prevSearch => ({
          ...prevSearch,
          [name]: value
      }));
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const search = params.get("search");
        setSearchQuery(search);
        
        const response = await fetch(`http://localhost:3005/v1/query?search=${search}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        
        const data = await response.json();
        setBackendData(data);
      } catch (error) {
        setError(error);
        console.error("Error fetching data:", error);
      }
    };
    
    fetchData();
  }, [location.search]);
  
  const toggleQuestion = (id) => {
    setExpandedQuestion(expandedQuestion === id ? null : id);
  };
  
  const handleSearch = () => {
    const params = new URLSearchParams();
    params.set('search', searchQuery);
    window.location.search = params.toString();
  };
  
  return (
    <div className="helpcenteroutercontainer">
      <div className="outer-container">
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
        <div className="data-container">
          {error && <div>Error: {error.message}</div>}
          {backendData.map((data) => (
            <div className="inner-container" key={data.id}>
              <div className="box" onClick={() => toggleQuestion(data.id)}>
                <h3>{data.question}</h3>
                <h3 className={expandedQuestion === data.id ? "down-arrow expanded" : "right-arrow"}>
  {expandedQuestion === data.id ? "▼" : "►"}
     </h3>
              </div>
              <div className={expandedQuestion === data.id ? "answer-container expanded" : "answer-container collapsed"}>
                <div className="answer">
                  <h3>{data.answer}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="contact-us">
        <div className="contact-img">
          <img className="contactimage" src={contactusimg} alt="A person asking questions to a doctor" />
        </div>
        <div className="contact-text">
          <h3>Still have any queries?</h3>
          <p>You can ping us at <a id="contact-link" href="#">Contact Us</a></p>
        </div>
      </div>
    </div>

)
}
