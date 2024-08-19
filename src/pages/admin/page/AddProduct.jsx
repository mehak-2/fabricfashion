import React, { useContext, useState } from "react";
import myContext from "../../../context/data/myContext";
import borderImage from "../../../../dist/assets/border_img.jpg";


function AddProduct() {
  const context = useContext(myContext);
  const { products, setProducts, addProduct } = context;

  const [errors, setErrors] = useState({});
  const [sizes, setSizes] = useState("");

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProducts((prevProducts) => ({
      ...prevProducts,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSizesChange = (e) => {
    setSizes(e.target.value);
  };

  const handleAddProduct = () => {
    const newErrors = {};
    if (!products.title) newErrors.title = "Title is required.";
    if (!products.price) newErrors.price = "Price is required.";
    if (!products.imageUrl) newErrors.imageUrl = "Main image URL is required.";
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const sizesArray = sizes.split(',').map(size => size.trim());
    setProducts((prevProducts) => ({
      ...prevProducts,
      sizes: sizesArray // Store sizes as an array
    }));

    addProduct(products);
  };


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-4 px-2">
      <div
        style={{
            backgroundColor: "black",
          }}
        className="p-6 rounded-xl max-w-lg w-full shadow-lg overflow-auto"
      >
        <h1 className="text-center text-white text-2xl mb-4 font-bold">
          Add Product
        </h1>

        {/* Product Title */}
        <div className="mb-4">
          <input
            type="text"
            value={products.title || ""}
            onChange={handleInputChange}
            name="title"
            className="bg-gray-100 px-3 py-2 w-full rounded-lg text-blue-900 placeholder:text-gray-500 outline-none"
            placeholder="Product title"
          />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
        </div>

        {/* Product Price */}
        <div className="mb-4">
          <input
            type="number"
            value={products.price || ""}
            onChange={handleInputChange}
            name="price"
            className="bg-gray-100 px-3 py-2 w-full rounded-lg text-blue-900 placeholder:text-gray-500 outline-none"
            placeholder="Product price"
          />
          {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
        </div>

        {/* Main Image URL */}
        <div className="mb-4">
          <input
            type="text"
            value={products.imageUrl || ""}
            onChange={handleInputChange}
            name="imageUrl"
            className="bg-gray-100 px-3 py-2 w-full rounded-lg text-blue-900 placeholder:text-gray-500 outline-none"
            placeholder="Main image URL"
          />
          {errors.imageUrl && <p className="text-red-500 text-xs mt-1">{errors.imageUrl}</p>}
        </div>

        {/* Additional Image URLs */}
        {['imageUrl1', 'imageUrl2', 'imageUrl3', 'imageUrl4'].map((imageField, index) => (
          <div className="mb-4" key={index}>
            <input
              type="text"
              value={products[imageField] || ""}
              onChange={handleInputChange}
              name={imageField}
              className="bg-gray-100 px-3 py-2 w-full rounded-lg text-blue-900 placeholder:text-gray-500 outline-none"
              placeholder={`Additional image ${index + 1} URL`}
            />
          </div>
        ))}

        {/* Product Category */}
        <div className="mb-4">
          <input
            type="text"
            value={products.category || ""}
            onChange={handleInputChange}
            name="category"
            className="bg-gray-100 px-3 py-2 w-full rounded-lg text-blue-900 placeholder:text-gray-500 outline-none"
            placeholder="Product category"
          />
        </div>

        {/* Product Type */}
        <div className="mb-4">
          <select
            value={products.type || ""}
            onChange={handleInputChange}
            name="type"
            className="bg-gray-100 px-3 py-2 w-full rounded-lg text-blue-900 placeholder:text-gray-500 outline-none"
          >
            <option value="" disabled>Select Product Type</option>
            <option value="type1">Type 1</option>
            <option value="type2">Type 2</option>
            <option value="type3">Type 3</option>
          </select>
        </div>

        {/* Product Fabric */}
        <div className="mb-4">
          <select
            value={products.fabric || ""}
            onChange={handleInputChange}
            name="fabric"
            className="bg-gray-100 px-3 py-2 w-full rounded-lg text-blue-900 placeholder:text-gray-500 outline-none"
          >
            <option value="" disabled>Select Fabric</option>
            <option value="fabric_1">Fabric 1</option>
            <option value="fabric_2">Fabric 2</option>
            <option value="fabric_3">Fabric 3</option>
          </select>
        </div>

        {/* Product Description */}
        <div className="mb-4">
          <textarea
            cols="30"
            rows="3"
            name="description"
            value={products.description || ""}
            onChange={handleInputChange}
            className="bg-gray-100 px-3 py-2 w-full rounded-lg text-blue-900 placeholder:text-gray-500 outline-none"
            placeholder="Product description"
          ></textarea>
        </div>

        {/* Additional Product Description */}
        <div className="mb-4">
          <textarea
            cols="30"
            rows="3"
            name="description1"
            value={products.description1 || ""}
            onChange={handleInputChange}
            className="bg-gray-100 px-3 py-2 w-full rounded-lg text-blue-900 placeholder:text-gray-500 outline-none"
            placeholder="Additional description"
          ></textarea>
        </div>

        {/* Checkbox Fields */}
        {[
          { name: "isAnarkaliDress", label: "Mark as Anarkali Dress" },
          { name: "isWestern", label: "Mark as Western" },
          { name: "isKoreanTrendy", label: "Mark as Korean Trendy" },
          { name: "isPakistaniSuits", label: "Mark as Pakistani Suits" },
          { name: "isPinterestFinds", label: "Mark as Pinterest Finds" },
          { name: "isEthnic", label: "Mark as Ethnic" },
          { name: "isAccessories", label: "Mark as Accessories" },
          { name: "isHandbags", label: "Mark as Handbags" },
          { name: "isJewellery", label: "Mark as Jewellery" },
          { name: "isMore", label: "Mark as More" },
        ].map((checkbox, index) => (
          <div className="mb-4 flex items-center" key={index}>
            <input
              type="checkbox"
              name={checkbox.name}
              checked={products[checkbox.name] || false}
              onChange={handleInputChange}
              className="mr-2"
            />
            <label className="text-white">{checkbox.label}</label>
          </div>
        ))}
        <div className="mb-4">
          <textarea
            cols="30"
            rows="3"
            name="sizes"
            value={sizes}
            onChange={handleSizesChange}
            className="bg-gray-100 px-3 py-2 w-full rounded-lg text-blue-900 placeholder:text-gray-500 outline-none"
            placeholder="Enter sizes separated by commas (e.g., S, M, L, XL)"
          ></textarea>
        </div>

        {/* Add Product Button */}
        <div className="flex justify-center mt-6">
          <button
           style={{
            backgroundImage: `url(${borderImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          color:"black",
          padding: '10px'
          }}
            onClick={handleAddProduct}
            className="text-white font-bold px-6 py-3 rounded-lg"
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
