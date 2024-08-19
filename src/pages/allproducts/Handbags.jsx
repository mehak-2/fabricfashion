import React, { useContext, useEffect, useState } from "react";
import Filter from "../../components/filter/Filter";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/data/myContext";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { toast } from "react-toastify";

const Handbags = () => {
  const context = useContext(myContext);
  const { mode, product, searchkey } = context;

  const [filterType, setFilterType] = useState("");
  const [filterFabric, setFilterFabric] = useState("");
  const [filterPrice, setFilterPrice] = useState("");
  const [sortPrice, setSortPrice] = useState("low");

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  const addCart = (product) => {
    dispatch(addToCart(product));
    toast.success("Added to cart");
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Assuming new arrivals are marked with a specific property or category
  const filteredProducts = product
    .filter((obj) => obj.isHandbags)  // Filter for new arrivals
    .filter((obj) => obj.title.toLowerCase().includes(searchkey.toLowerCase()))
    .filter((obj) => obj.category.toLowerCase().includes(filterType.toLowerCase()))
    .filter((obj) => (filterFabric ? (obj.fabric || "").toLowerCase() === filterFabric.toLowerCase() : true))
    .filter((obj) => (filterPrice ? obj.price <= parseFloat(filterPrice) : true));

  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortPrice === "low") {
      return a.price - b.price;
    } else if (sortPrice === "high") {
      return b.price - a.price;
    }
    return 0;
  });

  return (
    <Layout>
      <div className="flex flex-col sm:flex-row" style={{ backgroundColor: "black", minHeight: "100vh" }}>
        <div className="h-full sticky top-24 my-12">
          <Filter 
            setFilterType={setFilterType} 
            setFilterFabric={setFilterFabric} 
            setFilterPrice={setFilterPrice} 
            setSortPrice={setSortPrice}
          />
        </div>
        <div className="text-red-600 body-font flex-grow">
          <div className="container px-5 py-8 md:py-16 mx-auto">
            <h1 className="text-gold mb-4">HandBags</h1>
            <div className="flex flex-wrap -m-4">
              {sortedProducts.map((item) => {
                const { title, price, imageUrl, id } = item;
                return (
                  <div
                    onClick={() => (window.location.href = `/productinfo/${id}`)}
                    key={id}
                    className="p-4 md:w-1/4 drop-shadow-lg cursor-pointer"
                  >
                    <div
                      className="h-full transition-shadow duration-300 ease-in-out rounded-2xl overflow-hidden"
                      style={{
                        backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "transparent",
                        color: mode === "dark" ? "white" : "black",
                      }}
                    >
                      <div className="flex flex-col h-full">
                        <div className="flex justify-center items-center flex-grow">
                          <img
                            className="w-full h-80 object-cover rounded-lg"
                            src={imageUrl}
                            alt={title}
                            style={{ borderRadius: "10px" }}
                          />
                        </div>
                        <div className="p-5">
                          <h1
                            className="title-font text-lg font-medium mb-3"
                            style={{
                              color: mode === "dark" ? "white" : "white",
                            }}
                          >
                            {title}
                          </h1>
                          <p
                            className="leading-relaxed mb-3"
                            style={{
                              color: mode === "dark" ? "white" : "white",
                            }}
                          >
                            Rs.{price}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Handbags;
