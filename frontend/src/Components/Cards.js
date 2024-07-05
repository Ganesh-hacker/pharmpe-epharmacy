import React from 'react';
import '../Stylesheets/Cards.css';
// import Medicine from "./Medicine.png";
// import Healthcare from "./Healthcare.png";
// import Healthblog from "./Healthblog.png";
const Cards = () => {
    return(
<div class="box-container">
  <div class="box-item">
    <div class="flip-box">
      <div class="flip-box-front text-center" style={{backgroundImage: "url('https://static.vecteezy.com/system/resources/previews/004/948/182/non_2x/medicine-and-drugs-pills-set-collection-with-modern-flat-style-free-vector.jpg')"}}>
        <div class="inner color-white">
          <h3 class="flip-box-header">Medicine</h3>
          <p>A short sentence describing about our medicines.</p>
          <img src="https://s25.postimg.cc/65hsttv9b/cta-arrow.png" alt="" class="flip-box-img"/>
        </div>
      </div>
      <div class="flip-box-back text-center" style={{backgroundImage: "url('https://static.vecteezy.com/system/resources/previews/004/948/182/non_2x/medicine-and-drugs-pills-set-collection-with-modern-flat-style-free-vector.jpg')"}}>
        <div class="inner color-white">
          <h3 class="flip-box-header">Medicine</h3>
          <p>A short sentence describing about our medicines.</p>
          <button class="flip-box-button">Learn More</button>
        </div>
      </div>
    </div>
  </div>
  <div class="box-item">
    <div class="flip-box">
      <div class="flip-box-front text-center" style={{backgroundImage: "url('https://muslimaid-2022.storage.googleapis.com/upload/img_cache/file-2540-c3140610843658e55343c899d6b4d6f5.jpg')"}}>
        <div class="inner color-white">
          <h3 class="flip-box-header">Healthcare</h3>
          <p>A short sentence describing our Healthcare.</p>
          <img src="https://s25.postimg.cc/65hsttv9b/cta-arrow.png" alt="" class="flip-box-img"/>
        </div>
      </div>
      <div class="flip-box-back text-center" style={{backgroundImage: "url('https://muslimaid-2022.storage.googleapis.com/upload/img_cache/file-2540-c3140610843658e55343c899d6b4d6f5.jpg')"}}>
        <div class="inner color-white">
          <h3 class="flip-box-header">Healthcare</h3>
          <p>A short sentence describing our Healthcare.</p>
          <button class="flip-box-button">Learn More</button>
        </div>
      </div>
    </div>
  </div>
  <div class="box-item">
    <div class="flip-box">
      <div class="flip-box-front text-center filter-" style={{backgroundColor:"#32a6a8",backgroundImage: "url('https://www.lyrahealth.com/wp-content/uploads/2022/09/MDC-5110-Blog-Hero-2x.png')"}}>
        <div class="inner color-white">
          <h3 class="flip-box-header">Healthblog</h3>
          <p>dive into the explorations of our Healthblog</p>
          <img src="https://s25.postimg.cc/65hsttv9b/cta-arrow.png" alt="" class="flip-box-img"/>
        </div>
      </div>
      <div class="flip-box-back text-center" style={{backgroundColor:"#32a6a8", backgroundImage: "url('https://www.lyrahealth.com/wp-content/uploads/2022/09/MDC-5110-Blog-Hero-2x.png')"}}>
        <div class="inner color-white">
          <h3 class="flip-box-header">Healthblog</h3>
          <p>A short sentence describing this callout is.</p>
          <button class="flip-box-button">Learn More</button>
        </div>
      </div>
    </div>
  </div>
</div>
    );
}
export default Cards;
