import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import borderImage from '../../../dist/assets/border_img.jpg'; // Adjust path based on your project structure
import jewellery from "../../../dist/assets/sjewellery.jpg"; // Corrected import
import korean from "../../../dist/assets/korean.jpg";
import handbags from "../../../dist/assets/handbags.jpg";
import ethnic from "../../../dist/assets/ethnic.jpg";
import western from "../../../dist/assets/western.jpg";
import suit from '../../../dist/assets/suit.jpg';


const Categories = () => {
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
      src: jewellery, // Use the imported image directly
      text: "Accessories",
      href: "/accessories",
    },
    {
      src: korean,
      text: "Korean Trend",
      href: "/korean-trendy",
    },
    {
      src: handbags,
      text: "HandBags",
      href: "/handbags",
    },
    {
      src: ethnic,
      text: "Ethnic",
      href: "/ethnic",
    },
    {
      src: western,
      text: "Western",
      href: "/western",
    },
    {
      src: suit,
      text: "Pakistani Suits",
      href: "/pakistani-suits",
    },
  ];

  return (
    <div>
      <h1 style={styles.heading}>Collections</h1>
      <div style={styles.container}>
        {items.map((item, index) => (
          <div
            key={index}
            style={{
              ...styles.slide,
              ...(hoveredIndex === index ? styles.slideHover : {}),
            }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleImageClick(item.href)}
          >
            <div style={styles.imageDiv}>
              <img src={item.src} alt={item.text} style={styles.image} />
              {hoveredIndex === index && (
                <div style={styles.text}>{item.text}</div>
              )}
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
    cursor: "pointer",
  },
  imageDiv: {
    position: 'relative',
    padding: "10px",
    backgroundImage: `url(${borderImage})`,
    backgroundRepeat: 'round',
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
    fontWeight: "bold",
    color: "white",
    fontFamily: "fantasy",
    backgroundColor: "black",
    padding: "10px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
    opacity: 1,
    transition: "opacity 0.3s ease-in-out",
  },
  slideHover: {
    boxShadow: "0 8px 12px rgba(0, 0, 0, 0.3)",
  },
};

export default Categories;
