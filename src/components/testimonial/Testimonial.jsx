import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ethnic from '../../../dist/assets/ethnic.jpg';
import suit from '../../../dist/assets/suit.jpg';
import western from '../../../dist/assets/western.jpg';
import trendy from '../../../dist/assets/trendy.jpg';
import chic from '../../../dist/assets/chic.jpg';
import handbags from '../../../dist/assets/handbags.jpg';


const Testimonial = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navigate = useNavigate();

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const handleImageClick = (href) => {
    navigate(href);
  };

  const items = [
    {
      src: ethnic,
      text: "FEELING ETHNIC",
      href: "/ethnic",
    },
    {
      src: suit,
      text: "FEELING AESTHETIC",
      href: "/pakistani-suits",
    },
    {
      src: western,
      text: "FEELING HOT",
      href: "/western",
    },
    {
      src: trendy,
      text: "FEELING TRENDY",
      href: "/korean-trendy",
    },
    {
      src: chic,
      text: "FEELING CHIC",
      href: "/jewellery",
    },
    {
      src: handbags,
      text: "FEELING COOL",
      href: "/handbags",
    },
  ];

  return (
    <div>
      <h1 style={styles.heading}>PICK YOUR MOOD</h1>
      <div style={styles.container}>
        {items.map((item, index) => (
          <div
            key={index}
            style={styles.slide}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleImageClick(item.href)}
          >
            <div style={styles.imageDiv}>
              <img src={item.src} alt={item.text} style={styles.image} />
              <div style={styles.text}>{item.text}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  heading: {
    fontFamily: "fantasy",
    fontSize: "60px",
    textAlign: "center",
    margin: "20px 0",
    color: "white",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    gap: "30px",
    padding: "0",
    justifyContent: "center",
  },
  slide: {
    position: "relative",
    flex: "0 0 calc(33.333% - 40px)",
    overflow: "hidden",
    borderRadius: "10px",
    transition: "box-shadow 0.3s ease-in-out",
    cursor: "pointer", // Change cursor on hover
  },
  imageDiv: {
    background: "linear-gradient(to right, #a67c00, #bf9b30, #ffbf00, #ffcf40)",
    position: "relative",
    padding: "10px",
    borderRadius: '10px',
  },
  image: {
    width: "100%",
    height: "300px",
    objectFit: "cover",
    display: "block",
  },
  text: {
    position: "absolute",
    bottom: "10px",
    left: "10px",
    right: "10px",
    fontFamily: "fantasy",
    marginBottom: "20px",
    fontWeight: "bold",
    color: "white",
    backgroundColor: "black",
    padding: "12px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
  },
};

export default Testimonial;
