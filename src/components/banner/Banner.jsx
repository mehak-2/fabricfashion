import React from 'react';
import './Banner.css';
import car_img from "/dist/assets/car_img.png"; 
import heart_img from "/dist/assets/heart_img.png";

const Banner = () => {
  return (
    <div className='offers'>
      <div className='offers-left'>
        <img src={car_img} alt="Car" /> {/* Use the imported image variable */}
        <h1>Fast Delivery</h1>
      </div>
      <div className='offers-right'>
        <img src={heart_img} alt="Heart" /> {/* Use the imported image variable */}
        <h1>Latest Fashion</h1>
      </div>
    </div>
  );
};

export default Banner;
