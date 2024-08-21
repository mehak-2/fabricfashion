import React, { Component } from "react";
import borderImage from '../../../dist/assets/border_img.jpg'; // Adjust path based on your project structure
import jewellery from "../../../dist/assets/sjewellery.jpg"; // Corrected import
import korean from "../../../dist/assets/korean.jpg";
import handbags from "../../../dist/assets/handbags.jpg";
import ethnic from "../../../dist/assets/ethnic.jpg";
import western from "../../../dist/assets/western.jpg";
import accessories from '../../../dist/assets/jewellery.jpg';

class Track extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hoveredIndex: null,
    };
  }

  handleMouseEnter = (index) => {
    this.setState({ hoveredIndex: index });
  };

  handleMouseLeave = () => {
    this.setState({ hoveredIndex: null });
  };

  render() {
    const { hoveredIndex } = this.state;

    return (
      <div>
        <h1 style={styles.heading}>SHOP LATEST PAKISTANI SUITS</h1>
        <div style={styles.container}>
          {[
            // First row of images
            {
      src: jewellery, // Use the imported image directly
     
      href: "/jewellery",
    },
    {
      src: korean,
     
      href: "/korean-trendy",
    },
    {
      src: handbags,
      
      href: "/handbags",
    },
    {
      src: western,
     
      href: "/western",
    },
    {
      src: ethnic,
     
      href: "/ethnic",
    },
    {
      src: accessories,
      
      href: "/accessories",
    },
          ].map((item, index) => (
            <div
              key={index}
              style={{
                ...styles.slide,
                ...(hoveredIndex === index ? styles.slideHover : {}),
              }}
              onMouseEnter={() => this.handleMouseEnter(index)}
              onMouseLeave={this.handleMouseLeave}
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
  }
}

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
  },
  imageDiv: {
    position: 'relative',
    padding: "5px",
    borderRadius: '10px',
    backgroundImage: `url(${borderImage})`,
    backgroundRepeat: 'round',
  },
  image: {
    width: "100%",
    height: "300px",
    objectFit: "cover",
    display: "block",
  },
  slideHover: {
    boxShadow: "0 8px 12px rgba(0, 0, 0, 0.3)",
  },
};

export default Track;
