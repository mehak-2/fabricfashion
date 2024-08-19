import React from 'react';
import Slider from 'react-slick';

const Carousel = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="carousel-slide">
            <img src={image} alt={`Slide ${index}`} className="w-full h-auto object-cover" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
