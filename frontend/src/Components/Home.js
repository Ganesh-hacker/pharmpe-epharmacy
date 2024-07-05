import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Banner from '../Assets/Banner.jpg';
import '../Stylesheets/Home.css';
const Home = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className="carousel-wrapper">
      <Slider {...settings}>
        <div>
          <img src={Banner} alt="Banner 1" />
        </div>
        <div>
          <img src={Banner} alt="Banner 2" />
        </div>
        <div>
          <img src={Banner} alt="Banner 3" />
        </div>
      </Slider>
    </div>
  );
};

export default Home;
