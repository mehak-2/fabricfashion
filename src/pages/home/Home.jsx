import React from "react";
import Layout from "../../components/layout/Layout";
import HeroSection from "../../components/heroSection/HeroSection";
import ProductCard from "../../components/productCard/ProductCard";
import Track from "../../components/track/Track";
import Testimonial from "../../components/testimonial/Testimonial";
import { Link } from "react-router-dom";
import Banner from "../../components/banner/Banner";
import Popular from "../../components/popular/Popular";
import Card from "../../components/card/Card";
import Categories from "../../components/categories/Categories";
import NavbarTypes from "../../components/navbar/NavbarTypes";

function Home() {
  return (
    <div style={{ backgroundColor: 'black', minHeight: '100vh' }}> {/* Set background color here */}
    <Layout>
    <NavbarTypes/>
    <br></br>
    <br>
    </br>
    <br></br>
      <HeroSection />

      {/* <Filter />
      <ProductCard /> */}
      {/* <div className="flex justify-center -mt-10 mb-4">
        <Link to="/allproducts">
          <button className="bg-gray-300 px-5 py-2 rounded-xl">See more</button>
        </Link>
      </div> */}
      {/* <Popular/> */}
      <br />
      {/* <Card />
      <hr style={styles.hr} />
      <Banner />
      <hr style={styles.hr} /> */}
      <br />
      <Categories />
      <br />
      <br />
      <br />
      <Track />
      <br />
      <br />
      <br />
      <Testimonial />
      <br />
      <br/>
      <br />
      <Banner />
      <br/>
      <br/>
    </Layout>
    </div>
  );
}

const styles = {
  hr: {
    width: "80%", // Set the width of the line
    border: "none", // Remove default border
    borderTop: "2px solid blue", // blue line
    height: "2px", // Line height
    margin: "20px auto", // Center the line with auto margin
  },
};

export default Home;
