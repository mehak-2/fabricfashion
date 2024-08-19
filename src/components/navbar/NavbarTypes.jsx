import React from "react";
import { Link } from "react-router-dom";

const NavbarTypes = () => {
  return (
    <div className="fixed top-20 left-0 w-full py-2 z-50 bg-white">
      {/* Container with responsive overflow */}
      <div className="py-2 w-full flex justify-center md:justify-around overflow-x-auto md:overflow-visible">
        {/* Container to manage spacing for mobile */}
        <div className="flex space-x-4 px-2 md:px-0 font-bold">
          {[
            "Pakistani Suits",
            "Korean Trendy",
            "Pinterest Finds",
            "Anarkali Dress",
            "Western",
            "Ethnic",
            "Accessories",
            "Handbags",
            "Jewellery",
            "More",
          ].map((category) => (
            <Link 
              key={category} 
              to={`/${category.replace(/ /g, "-").toLowerCase()}`} 
              className="text-sm mt-1 hover:text-[#a67c00] whitespace-nowrap"
            >
              {category}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavbarTypes;
