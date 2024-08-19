import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import borderImage from '../../../dist/assets/border_img.jpg';
import 'slick-carousel/slick/slick-theme.css';
import './HeroSection.css'; // Import the CSS file for additional styling
import border_img from '../../../dist/assets/border_img.jpg'
function HeroSection() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 400,
    arrows: false, // Disable arrows
  };

  return (
    <div className="hero-section">
      <Slider {...settings}>
        <div className="slide">
          <img
            src="https://images.limely.co.uk/wp-content/uploads/fashion-websites-blog.jpg"
            alt=""
            className="slide-image"
          />
          <div className="slide-text">Let's Explore</div>
        </div>
        <div className="slide">
          <img
            src="https://media.istockphoto.com/id/1338646661/photo/gold-jewelry-diamond-rings-show-in-luxury-retail-store-window-display-showcase.webp?b=1&s=170667a&w=0&k=20&c=IjIyYsOhjFangGZVqki_9YHTtbN3JBFyQs7GXPA_eV0="
            alt=""
            className="slide-image"
          />
          <div className="slide-text">Shop Now</div>
        </div>
        <div
          className="slide"
          style={{
            backgroundImage: `url(${borderImage})`, // Set background image as border
            backgroundRepeat: 'repeat', // Repeat to cover border area
            backgroundSize: 'contain', // Adjust based on desired border appearance
            backgroundPosition: 'center',
            position: 'relative',
            padding: '20px',
            height: '400px', // Adjust height as needed
            width: '100%', // Full width
            borderRadius: '20px',
          }}
        >
          <img
            src="https://png.pngtree.com/thumb_back/fh260/background/20230616/pngtree-computer-desktop-interface-showcasing-3d-rendered-online-shopping-with-a-shopping-image_3613084.jpg"
            alt=""
            className="slide-image"
          />
          <div className="slide-text">New Collections</div>
        </div>
      </Slider>
    </div>
  );
}

export default HeroSection;
