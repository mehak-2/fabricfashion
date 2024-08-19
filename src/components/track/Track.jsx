import React, { Component } from "react";
import borderImage from '../../../dist/assets/border_img.jpg'; // Adjust path based on your project structure
import suit from '../../../dist/assets/suit.jpg';
import ethnic from '../../../dist/assets/ethnic.jpg';
import jewellery from '../../../dist/assets/sjewellery.jpg';
import anarkali from '../../../dist/assets/anarkali.jpg';
import sharara from '../../../dist/assets/sharara.jpg';


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
              src: suit,
            
            },
            {
              src: ethnic,
            },
            {
              src: "https://thelibas.com/wp-content/uploads/2021/06/303.jpg",
        
            },
            // Second row of images
            {
              src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpSm_URTTGz0PkdjFS7YIdWg3xUTgE7k_AhOsJbq-s6B7VGI1-T6ACAnVkyytRk3X9h1Q&usqp=CAU",
              
            },
            {
              src: "https://palakfashionbsk.com/media/catalog/product/cache/1/image/abef50ec66cdaae8f2c2d4915b6f160f/i/m/img-20220627-wa0135_1.jpg",
            
            },
            {
              src: "https://i.pinimg.com/236x/d3/96/ae/d396ae0c1e577e1e9dc809e64141c934.jpg",
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
    fontFamily: "fantasy", // Set the font family
    fontSize: "50px", // Set the font size
    textAlign: "center", // Center align the heading
    margin: "20px 0", // Add margin for spacing
    color: "white",
  },
  container: {
    display: "flex",
    flexWrap: "wrap", // Allow items to wrap into rows
    gap: "30px", // Space between images
    padding: "0", // Remove padding to avoid extra space
    justifyContent: "center", // Center align items in the container
  },
  slide: {
    position: "relative",
    flex: "0 0 calc(33.333% - 40px)", // Three items per row with gaps
    overflow: "hidden",
    borderRadius: "10px", // Optional: rounded corners
    transition: "box-shadow 0.3s ease-in-out", // Smooth transition for box-shadow
  },
  imageDiv: {
    position: 'relative', // Position the text over the image
    padding: "10px", // Padding to create space around the image
    borderRadius: '10px', // Optional: rounded corners
    backgroundImage: `url(${borderImage})`, // Use the imported image
    backgroundRepeat: 'round', // Repeat the image to cover the area
  },
  image: {
    width: "100%",
    height: "300px", // Fixed height to ensure equal height
    objectFit: "cover", // Ensures the image covers the area without distortion
    display: "block",
  },
  // text: {
  //   position: "absolute",
  //   bottom: "10px",
  //   left: "10px",
  //   right: "10px",
  //   fontWeight: "bold",
  //   color: "gold", // Set text color to gold
  //   fontFamily: "Times, Times New Roman, Georgia, serif", // Set the font family
  //   backgroundColor: "black", // Background color for the text box
  //   padding: "10px",
  //   boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", // Optional: box shadow for better visibility
  //   textAlign: "center", // Center align text
  //   opacity: 1, // Ensure text is visible
  //   transition: "opacity 0.3s ease-in-out", // Smooth transition for text visibility
  // },
  slideHover: {
    boxShadow: "0 8px 12px rgba(0, 0, 0, 0.3)", // Box-shadow on hover
  },
};

export default Track;
