import React, { useContext, useEffect, useState } from "react";
import myContext from "../../context/data/myContext";
import Layout from "../../components/layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromCart, addToCart } from "../../redux/cartSlice";
import { toast } from "react-toastify";
import { addDoc, collection } from "firebase/firestore";
import { fireDB } from "../../fireabase/FirebaseConfig";
import cart_img from "../../../dist/assets/cart_image.png";
import border_img from "../../../dist/assets/border_img.jpg";
import { useNavigate } from "react-router-dom";

function Wishlist() {
  const context = useContext(myContext);
  const { mode } = context;
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    let temp = 0;
    cartItems.forEach((cartItem) => {
      temp += parseInt(cartItem.price, 10);
    });
    setTotalAmount(temp);
  }, [cartItems]);

  const shipping = 100;
  const grandTotal = shipping + totalAmount;

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const buyNow = async () => {
    if (name === "" || address === "" || pincode === "" || phoneNumber === "") {
      return toast.error("All fields are required", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }

    const addressInfo = {
      name,
      address,
      pincode,
      phoneNumber,
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    };

    const orderInfo = {
      cartItems,
      addressInfo,
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
      email: JSON.parse(localStorage.getItem("user")).user.email,
      userid: JSON.parse(localStorage.getItem("user")).user.uid,
    };

    try {
      const orderRef = collection(fireDB, "orders");
      const docRef = await addDoc(orderRef, orderInfo);
      localStorage.setItem("cart", JSON.stringify([]));
      toast.success("Order placed successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to place the order");
    }
  };

  return (
    <Layout>
      <div
        className="bg-black pt-5 pb-[10%]"
        style={{
          backgroundColor: mode === "dark" ? "#282c34" : "",
          color: mode === "dark" ? "white" : "",
        }}
      >
        <h1 className="mb-10 text-center text-3xl font-bold text-white">
          My Wishlist
        </h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg md:w-2/3">
            {cartItems.map((item, index) => {
              const { title, price, description, imageUrl } = item;
              return (
                <div
                  key={index}
                  className="mb-6 rounded-lg drop-shadow-xl bg-black p-6 sm:flex sm:justify-between"
                  style={{
                    backgroundColor: mode === "dark" ? "rgb(32 33 34)" : "",
                    color: mode === "dark" ? "white" : "",
                  }}
                >
                  <div className="flex flex-col sm:flex-row items-center">
                    <img
                      style={{
                        width: "100%",
                        maxWidth: "250px",
                        height: "150px",
                        marginRight: "10px",
                        backgroundImage: `url(${border_img})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        borderRadius: "20px",
                        padding: "10px",
                        transition: "background 0.3s ease-in-out",
                      }}
                      src={imageUrl}
                      alt="product-image"
                      className="rounded-lg"
                    />
                    <div className="mt-4 sm:mt-0 sm:ml-4 text-center sm:text-left">
                      <h2
                        className="text-lg font-bold text-white"
                        style={{ color: mode === "dark" ? "white" : "" }}
                      >
                        {title}
                      </h2>
                      <h2
                        className="text-sm text-white"
                        style={{ color: mode === "dark" ? "white" : "" }}
                      >
                        {description}
                      </h2>
                      <p
                        className="mt-1 text-xs font-semibold text-white"
                        style={{ color: mode === "dark" ? "white" : "" }}
                      >
                        ₹{price}
                      </p>
                    </div>
                  </div>
                  <button
                    className="relative mt-4 sm:mt-0 text-black py-2 px-6 focus:outline-none border-0 rounded-full w-full sm:w-[350px]"
                    style={{
                      backgroundImage: `url(${border_img})`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      borderRadius: "70px",
                      height: "40px",
                      padding: "10px",
                      transition: "background 0.3s ease-in-out",
                    }}
                    onClick={() => {
                      dispatch(addToCart(item));
                      navigate("/cart");
                    }}
                  >
                    Add To Cart
                    <img
                      src={cart_img}
                      alt="Heart Icon"
                      className="absolute right-6 top-1/2 transform -translate-y-1/2 w-5 h-5"
                    />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Wishlist;
