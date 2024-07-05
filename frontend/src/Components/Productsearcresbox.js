import React from "react";
import "../Stylesheets/Searchresults.css"
export default function Productsearchresbox(props){
    return(
        <div class="inner-container">
    <div class="box">
      <img className="boximg" src={props.imgurl1} alt="book"/>
    </div>
    <div class="box">
      <h1>Books</h1>
      <h2 class="yt">Description Of Books</h2>
    </div>
  </div>
    )
}   