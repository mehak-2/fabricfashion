import React, { useContext, useEffect, useState } from "react";
import myContext from "../../context/data/myContext";
import Layout from "../../components/layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromCart, updateQuantity } from "../../redux/cartSlice";
import { toast } from "react-toastify";
import { addDoc, collection } from "firebase/firestore";
import { fireDB } from "../../fireabase/FirebaseConfig";
import Modal from "../../components/modal/Modal";

function Cart() {
  const context = useContext(myContext);
  const { mode } = context;

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  const [totalAmount, setTotalAmount] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    let temp = 0;
    cartItems.forEach((cartItem) => {
      temp += (cartItem.price || 0) * (cartItem.quantity || 0);
    });
    setTotalAmount(temp);
  }, [cartItems]);

  const shipping = 100;
  const grandTotal = shipping + totalAmount;

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Item removed from cart");
  };

  const updateItemQuantity = (item, quantity) => {
    const newQuantity = quantity < 1 ? 1 : quantity;
    dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const buyNow = async () => {
    if (!name || !address || !pincode || !phoneNumber) {
      return toast.error("All fields are required");
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
      await addDoc(orderRef, orderInfo);

      localStorage.setItem("cart", JSON.stringify([]));
      toast.success("Order placed successfully");
      setModalOpen(false);
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
          backgroundColor: mode === "dark" ? "black" : "",
          color: mode === "dark" ? "white" : "",
        }}
      >
        <h1 className="text-white text-center mb-10 text-2xl font-bold">Cart Items</h1>
        <div className="mx-auto max-w-5xl px-6 xl:px-0">
          <div className="grid grid-cols-5 gap-4 mb-4 text-white font-semibold">
            <div className="text-center">Product</div>
            <div className="text-center"></div>
            <div className="text-center">Price</div>
            <div className="text-center">Quantity</div>
            <div className="text-center">Total</div>
          </div>

          <hr className="border-white mb-6" />

          {cartItems.map((item) => {
            const { id, title, price, description, imageUrl, quantity = 1, size } = item;

            return (
              <div
                key={id}
                className="grid grid-cols-5 gap-4 mb-6 items-center rounded-lg drop-shadow-xl bg-black p-6"
                style={{
                  backgroundColor: mode === "dark" ? "rgb(32 33 34)" : "",
                  color: mode === "dark" ? "white" : "",
                }}
              >
                <div className="flex items-center">
                  <img
                    src={imageUrl}
                    alt="product-image"
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                </div>
                <div className="text-white">
                  <h2 className="text-lg font-bold">{title}</h2>
                  <p className="text-sm">{description}</p>
                  <p className="text-sm">Size: {size}</p>
                </div>
                <div className="text-white text-center">
                  ₹{price || 0}
                </div>
                <div className="text-white text-center border-2 border-white p-1 m-0">
                  <div className="flex items-center justify-center mt-2">
                    <button
                      onClick={() => updateItemQuantity(item, (quantity || 1) - 1)}
                      className="px-2 py-1 text-white rounded "
                    >
                      -
                    </button>
                    <input
                      type="text"
                      value={(quantity || 0).toString()}
                      readOnly
                      className="mx-2 w-12 text-center bg-transparent text-white border-none"
                    />
                    <button
                      onClick={() => updateItemQuantity(item, (quantity || 1) + 1)}
                      className="px-2 py-1 text-white rounded "
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="text-white text-center">
                  ₹{(price || 0) * (quantity || 1)}
                </div>
                <div
                  onClick={() => deleteCart(item)}
                  className="text-red-500 cursor-pointer hover:underline text-center"
                >
                  Remove
                </div>
              </div>
            );
          })}

          <hr className="border-white my-6" />

          <div
            className="mt-6 h-full rounded-lg p-6 shadow-md"
            style={{
              backgroundColor: mode === "dark" ? "rgb(32 33 34)" : "",
              color: mode === "dark" ? "white" : "white",
            }}
          >
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700" style={{ color: mode === "dark" ? "white" : "white" }}>
                Subtotal
              </p>
              <p className="text-gray-700" style={{ color: mode === "dark" ? "white" : "white" }}>
                ₹{totalAmount}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700" style={{ color: mode === "dark" ? "white" : "white" }}>
                Shipping
              </p>
              <p className="text-gray-700" style={{ color: mode === "dark" ? "white" : "white" }}>
                ₹{shipping}
              </p>
            </div>
            <div className="flex justify-between mt-2">
              <p className="text-gray-700" style={{ color: mode === "dark" ? "white" : "white" }}>
                Grand Total
              </p>
              <p className="text-gray-700" style={{ color: mode === "dark" ? "white" : "white" }}>
                ₹{grandTotal}
              </p>
            </div>
            {/* <Modal  /> */}
            <Modal
              name={name}
              address={address}
              pincode={pincode}
              phoneNumber={phoneNumber}
              setName={setName}
              setAddress={setAddress}
              setPincode={setPincode}
              setPhoneNumber={setPhoneNumber}
              buyNow={buyNow}
            />
          
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Cart;
