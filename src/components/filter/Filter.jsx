import React, { useContext, useEffect, useState } from 'react';
import myContext from '../../context/data/myContext';
import borderImage from '../../../dist/assets/border_img.jpg'; // Adjust path based on your project structure

function Filter({ setFilterType, setFilterFabric, setFilterPrice, setSortPrice }) {
  const context = useContext(myContext);
  const { mode, product } = context;

  const [types, setTypes] = useState([]);
  const [fabrics, setFabrics] = useState([]);

  const handlePriceChange = (event) => {
    setSortPrice(event.target.value);
  };

  const handleTypeChange = (event) => {
    setFilterType(event.target.value);
  };

  const handleFabricChange = (event) => {
    setFilterFabric(event.target.value);
  };

  useEffect(() => {
    const uniqueTypes = [...new Set(product.map(p => p.category))];
    const uniqueFabrics = [...new Set(product.map(p => p.fabric))];
    
    setTypes(uniqueTypes);
    setFabrics(uniqueFabrics);
  }, [product]);

  return (
    <div className="w-full sm:w-80 md:w-96">
      <div
        style={{
          backgroundImage: `url(${borderImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          borderRadius: '20px',
          width: "100%",
          height: "auto",
          padding: '10px',
        }}
        className="container mx-auto px-4 mt-5"
      >
        <div
          className="p-5 rounded-lg bg-gray-100 drop-shadow-xl border border-gray-200"
          style={{
            backgroundColor: mode === "dark" ? "#282c34" : "",
            color: mode === "dark" ? "white" : "",
          }}
        >
          <p className="font-medium mb-4">Price</p>
          <div className="flex items-center justify-between mt-4">
            <select
              onChange={handlePriceChange}
              className="px-4 py-3 w-full rounded-md bg-gray-50 border-transparent outline-0 focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
              style={{
                backgroundColor: mode === "dark" ? "rgb(64 66 70)" : "",
                color: mode === "dark" ? "white" : "",
              }}
            >
              <option value="low">Low to High</option>
              <option value="high">High to Low</option>
            </select>
          </div>

          <p className="font-medium my-4">Type</p>
          <select
            onChange={handleTypeChange}
            className="px-4 py-3 w-full rounded-md bg-gray-50 border-transparent outline-0 focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
            style={{
              backgroundColor: mode === "dark" ? "rgb(64 66 70)" : "",
              color: mode === "dark" ? "white" : "",
            }}
          >
            <option value="">Choose from here</option>
            {types.map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>

          <p className="font-medium my-4">Fabric</p>
          <select
            onChange={handleFabricChange}
            className="px-4 py-3 w-full rounded-md bg-gray-50 border-transparent outline-0 focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
            style={{
              backgroundColor: mode === "dark" ? "rgb(64 66 70)" : "",
              color: mode === "dark" ? "white" : "",
            }}
          >
            <option value="">Choose from here</option>
            {fabrics.map((fabric, index) => (
              <option key={index} value={fabric}>{fabric}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default Filter;
