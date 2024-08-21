import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/data/myContext";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/cartSlice";
import { fireDB } from "../../fireabase/FirebaseConfig";
import border_img from '../../../dist/assets/border_img.jpg'; // Adjust the path as needed
import drop_img from '../../../dist/assets/drop_img.png';
import cart_img from '../../../dist/assets/cart_image.png';
import heart_img from '../../../dist/assets/heart_icon.png';


function ProductInfo() {
  const context = useContext(myContext);
  const { loading, setLoading } = context;

  const [products, setProducts] = useState({});
  const [selectedSize, setSelectedSize] = useState(""); // State for selected size
  const params = useParams();

  const getProductData = async () => {
    setLoading(true);
    try {
      const productTemp = await getDoc(doc(fireDB, "products", params.id));
      setProducts(productTemp.data());
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch product data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductData();
  }, [params.id]);

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  const addCart = (product) => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }
    dispatch(addToCart({ ...product, size: selectedSize }));
    toast.success("Added to cart");
  };

  const addToWishlist = (product) => {
    // Implement wishlist functionality
    toast.success("Added to wishlist");
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <Layout>
      <section className="text-gray-600 body-font overflow-hidden bg-black">
        <div className="container px-5 py-10 mx-auto sm:px-20">
          {loading ? (
            <p className="text-white">Loading...</p>
          ) : products && (
            <div className="lg:flex gap-8">
              {/* Left Section: Main Image */}
              <div className="lg:w-1/3 w-full flex items-center justify-center">
                <img
                  alt={products.title || "Product Image"}
                  className="w-[400px] h-[400px] object-cover object-center rounded"
                  src={products.imageUrl}
                />
              </div>

              {/* Right Section: Product Details */}
              <div className="lg:w-2/3 w-full flex flex-col lg:pl-10">
                <div className="lg:w-full lg:py-6 mt-6 lg:mt-0">
                  <h2 className="text-[35px] title-font text-white tracking-widest">
                    {products.category}
                  </h2>
                  <span
                    className="title-font font-medium text-2xl mr-4"
                    style={{ color: "white" }}
                  >
                    Rs. {products.price}
                  </span>
                  <h1
                    className="text-[20px] title-font font-medium mb-5"
                    style={{ color: "white" }}
                  >
                    {products.title}
                  </h1>
                  <p className="leading-relaxed text-white text-[20px] mb-5">
                    {products.description}
                  </p>
                  {products.description1 && (
                    <p className="leading-relaxed text-white text-[20px] mb-5">
                      {products.description1}
                    </p>
                  )}
                  {products.fabric && (
                    <p className="leading-relaxed text-white text-[20px] mb-5">
                      <strong>Fabric:</strong> {products.fabric}
                    </p>
                  )}
                  {products.type && (
                    <p className="leading-relaxed mb-5 text-white text-[20px]">
                      <strong>Type:</strong> {products.type}
                    </p>
                  )}
                  <div className="flex flex-col mb-4">
                    {/* Grid Container for Select and Buttons */}
                    <div className="grid grid-cols-2 gap-4 w-full sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
                      {/* Size Selector Dropdown */}
                      <div className="relative w-full">
                        <select
                          id="size"
                          value={selectedSize}
                          onChange={(e) => setSelectedSize(e.target.value)}
                          className="text-black py-2 px-6 focus:outline-none border-0 rounded-full appearance-none w-full"
                          style={{
                            backgroundImage: `url(${border_img})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            borderRadius: '70px',
                            padding: '10px',
                            transition: "background 0.3s ease-in-out",
                            paddingRight: '2.5rem',
                            backgroundColor: 'transparent', // Ensure dropdown background is transparent
                          }}
                        >
                          <option value="">Select size</option>
                          <option value="S">S</option>
                          <option value="M">M</option>
                          <option value="L">L</option>
                          <option value="XL">XL</option>
                        </select>
                        <img
                          src={drop_img}
                          alt="Dropdown Icon"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none"
                        />
                      </div>

                      {/* Add To Cart Button */}
                      <button
                        onClick={() => addCart(products)}
                        className="relative text-black py-2 px-6 focus:outline-none border-0 rounded-full w-full"
                        style={{
                          backgroundImage: `url(${border_img})`,
                          backgroundRepeat: 'no-repeat',
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          borderRadius: '70px',
                          padding: '10px',
                          transition: "background 0.3s ease-in-out",
                          width: '100%',
                        }}
                      >
                        Add To Cart
                        <img
                          src={cart_img}
                          alt="Cart Icon"
                          className="absolute right-6 top-1/2 transform -translate-y-1/2 w-5 h-5"
                        />
                      </button>

                      {/* Order Now Button */}
                      <button
                        onClick={() => addToOrder(products)}
                        className="relative text-black py-2 px-6 focus:outline-none border-0 rounded-full w-full"
                        style={{
                          backgroundImage: `url(${border_img})`,
                          backgroundRepeat: 'no-repeat',
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          borderRadius: '70px',
                          padding: '10px',
                          transition: "background 0.3s ease-in-out",
                          width: '100%',
                        }}
                      >
                        Order Now
                      </button>

                      {/* Add To Wishlist Button */}
                      <button
                        onClick={() => addToWishlist(products)}
                        className="relative text-black py-2 px-6 focus:outline-none border-0 rounded-full w-full"
                        style={{
                          backgroundImage: `url(${border_img})`,
                          backgroundRepeat: 'no-repeat',
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          borderRadius: '70px',
                          padding: '10px',
                          transition: "background 0.3s ease-in-out",
                          width: '100%',
                        }}
                      >
                        Add To Wishlist
                        <img
                          src={heart_img}
                          alt="Heart Icon"
                          className="absolute right-6 top-1/2 transform -translate-y-1/2 w-5 h-5"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}

export default ProductInfo;
