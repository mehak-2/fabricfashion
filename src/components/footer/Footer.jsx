import React, { useContext } from "react";
import { Link } from "react-router-dom";
import myContext from "../../context/data/myContext";
import logo from "../navbar/logo.png";
import payment from "./payment.png";
import borderImage from '../../../dist/assets/border_img.jpg'; // Adjust path based on your project structure

import {
  TiSocialFacebookCircular,
  TiSocialInstagram,
  TiSocialYoutube,
} from "react-icons/ti";

function Footer() {
  const context = useContext(myContext);
  const { mode } = context;

  const footerStyles = {
    color: "black", // Set text color to white
  };
  const socials = {
    color: "#a67c00",
    fontSize: "30px",
  };
  const socialGroup = {
    display: "flex", // Set text color to white
    // fontSize: "200px",
  };

  const commonLinkStyles = {
    color: "Black", // Set link color to white
  };

  return (
    <div
      className="p-3"
      style={{
        ...footerStyles,
        // padding: "10px",
        backgroundImage: `url(${borderImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          borderRadius: '20px',
          padding: '10px',
      }}
    >
      <div
        className="up sm:flex justify-around "
        style={{background: "white",height:"100%",padding:"40px"}}
      >
        <div className="one flex flex-col flex-1 ">
          <h1
            className="font-medium"
            style={{ ...footerStyles, fontWeight: "bold"}}
          >
            SHOP
          </h1>

          {[
            "New Arrivals",
            "Tops",
            "Pakistani Suits",
            "T-Shirts",
            "Trousers",
            "Korean Trend",
            "Pinterest Find",
            "Best Selling",
          ].map((category) => (
            <Link
              key={category}
              to=""
              className="text-sm mt-1"
              style={commonLinkStyles}
            >
              {category}
            </Link>
          ))}
        </div>

        <div className="three flex-1">
          <h2 className="text-sm mt-1" style={footerStyles}></h2>
        </div>
        <div className="four flex-1">
          <h1 className="font-medium my-2" style={footerStyles}>
            Fabric Fashion
          </h1>
          <h1 className="font-medium my-2" style={footerStyles}>
            Address: 21 Hill Road,Bandra West, Mumbai
          </h1>
          <h1 className="font-medium my-2" style={footerStyles}>
            Maharashtra 400050
          </h1>
          <h1 className="font-medium my-2" style={footerStyles}>
            Fabric Fashion
          </h1>
          <ul style={socialGroup}>
            <li>
              {" "}
              <TiSocialFacebookCircular style={socials} />{" "}
            </li>
            <li>
              {" "}
              <TiSocialInstagram style={socials} />{" "}
            </li>
            <li>
              {" "}
              <TiSocialYoutube style={socials} />{" "}
            </li>
          </ul>
        </div>
      </div>

    </div>
  );
}

export default Footer;
