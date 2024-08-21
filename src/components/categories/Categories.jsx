import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import borderImage from '../../../dist/assets/border_img.jpg';
import jewellery from "../../../dist/assets/sjewellery.jpg";
import korean from "../../../dist/assets/korean.jpg";
import handbags from "../../../dist/assets/handbags.jpg";
import ethnic from "../../../dist/assets/ethnic.jpg";
import western from "../../../dist/assets/western.jpg";
import accessories from '../../../dist/assets/jewellery.jpg'; 

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
      src: jewellery,
      text: "Jewellery",
      href: "/jewellery",
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
      src: western,
      text: "Western",
      href: "/western",
    },
    {
      src: ethnic,
      text: "Ethnic",
      href: "/ethnic",
    },
    {
      src: accessories,
      text: "Accessories",
      href: "/accessories",
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
    fontSize: "4vw", // Responsive font size
    textAlign: "center",
    margin: "20px 0",
    color: "white",
    '@media (max-width: 768px)': {
      fontSize: "6vw", // Larger font size for smaller screens
    },
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
    padding: "5px",
    backgroundImage: `url(${borderImage})`,
    backgroundRepeat: 'round',
    borderRadius: "10px",
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
    color: "white",
    fontFamily: "fantasy",
    backgroundColor: "black",
    padding: "10px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
    opacity: 1,
    transition: "opacity 0.3s ease-in-out",
    fontSize: "2vw", // Responsive font size
    '@media (max-width: 768px)': {
      fontSize: "4vw", // Larger font size for smaller screens
    },
  },
  slideHover: {
    boxShadow: "0 8px 12px rgba(0, 0, 0, 0.3)",
  },
};

export default Categories;
