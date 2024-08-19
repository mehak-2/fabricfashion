// import React, { useEffect, useState } from "react";
// import MyContext from "./myContext";
// import {
//   Timestamp,
//   addDoc,
//   collection,
//   deleteDoc,
//   doc,
//   getDocs,
//   onSnapshot,
//   orderBy,
//   query,
//   setDoc,
// } from "firebase/firestore";
// import { toast } from "react-toastify";
// import { fireDB } from "../../fireabase/FirebaseConfig";

// function myState(props) {
//   const [mode, setMode] = useState("light");

//   const toggleMode = () => {
//     if (mode === "light") {
//       setMode("dark");
//       document.body.style.backgroundColor = "rgb(17, 24, 39)";
//     } else {
//       setMode("light");
//       document.body.style.backgroundColor = "white";
//     }
//   };

//   const [loading, setLoading] = useState(false);

//   const [products, setProducts] = useState({
//     title: null,
//     price: null,
//     imageUrl: null,
//     category: null,
//     description: null,
//     time: Timestamp.now(),
//     date: new Date().toLocaleString("en-US", {
//       month: "short",
//       day: "2-digit",
//       year: "numeric",
//     }),
//   });

//   const addProduct = async () => {
//     if (
//       products.title == null ||
//       products.price == null ||
//       products.imageUrl == null ||
//       products.category == null ||
//       products.description == null
//     ) {
//       return toast.error("all fields are required");
//     }

//     setLoading(true);

//     try {
//       const productRef = collection(fireDB, "products");
//       await addDoc(productRef, products);
//       toast.success("Add product successfully");
//       setTimeout(() => {
//         window.location.href = "/dashboard";
//       }, 800);
//       getProductData();
//       setLoading(false);
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//     }
//     // setProducts("")
//   };

//   const [product, setProduct] = useState([]);

//   const getProductData = async () => {
//     setLoading(true);

//     try {
//       const q = query(collection(fireDB, "products"), orderBy("time"));

//       const data = onSnapshot(q, (QuerySnapshot) => {
//         let productArray = [];
//         QuerySnapshot.forEach((doc) => {
//           productArray.push({ ...doc.data(), id: doc.id });
//         });
//         setProduct(productArray);
//         setLoading(false);
//       });

//       return () => data;
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getProductData();
//   }, []);

//   // update product function

//   const edithandle = (item) => {
//     setProducts(item);
//   };

//   const updateProduct = async () => {
//     setLoading(true);
//     try {
//       await setDoc(doc(fireDB, "products", products.id), products);
//       toast.success("Product Updated successfully");
//       setTimeout(() => {
//         window.location.href = "/dashboard";
//       }, 800);
//       getProductData();
//       setLoading(false);
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//     }
//   };

//   // delete product

//   const deleteProduct = async (item) => {
//     setLoading(true);
//     try {
//       await deleteDoc(doc(fireDB, "products", item.id));
//       toast.success("Product Deleted successfully");
//       getProductData();
//       setLoading(false);
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//     }
//   };

//   const [order, setOrder] = useState([]);

//   const getOrderData = async () => {
//     setLoading(true);
//     try {
//       const result = await getDocs(collection(fireDB, "orders"));
//       const ordersArray = [];
//       result.forEach((doc) => {
//         ordersArray.push(doc.data());
//         setLoading(false);
//       });
//       setOrder(ordersArray);
//       // console.log(ordersArray);
//       setLoading(false);
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//     }
//   };

//   // update order status

//   const updateOrderStatus = async (orderId, newStatus) => {
//     setLoading(true);
//     try {
//       const orderRef = doc(fireDB, "orders", orderId);
//       await setDoc(orderRef, { status: newStatus }, { merge: true });
//       toast.success("Order status updated successfully");
//       // getOrderData(); // Refresh order data
//       setLoading(false);
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//     }
//   };


//   const [user, setUser] = useState([]);

//   const getUserData = async () => {
//     setLoading(true);
//     try {
//       const result = await getDocs(collection(fireDB, "users"));
//       const usersArray = [];
//       result.forEach((doc) => {
//         usersArray.push(doc.data());
//         setLoading(false);
//       });
//       setUser(usersArray);
//       // console.log(usersArray);
//       setLoading(false);
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getOrderData();
//     getUserData();
//   }, []);

//   const [searchkey, setSearchkey] = useState("");
//   const [filterType, setFilterType] = useState("");
//   const [filterPrice, setFilterPrice] = useState("");

//   return (
//     <MyContext.Provider
//       value={{
//         mode,
//         toggleMode,
//         loading,
//         setLoading,
//         products,
//         setProducts,
//         addProduct,
//         product,
//         edithandle,
//         updateProduct,
//         deleteProduct,
//         order,
//         user,
//         searchkey,
//         setSearchkey,
//         filterType,
//         setFilterType,
//         filterPrice,
//         setFilterPrice,
//         updateOrderStatus,
//       }}
//     >
//       {props.children}
//     </MyContext.Provider>
//   );
// }

// export default myState;
import React, { useEffect, useState } from "react";
import MyContext from "./myContext";
import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { fireDB } from "../../fireabase/FirebaseConfig";

function myState(props) {
  const [mode, setMode] = useState("light");

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "rgb(17, 24, 39)";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
    }
  };

  const [loading, setLoading] = useState(false);

  const [products, setProducts] = useState({
    title: null,
    price: null,
    imageUrl: null,
    category: null,
    description: null,
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });
  const [wishlist, setWishlist] = useState([]);


  const [status, setStatus] = useState({
    orderStatus: null,
  });

  const addProduct = async () => {
    if (
      products.title == null ||
      products.price == null ||
      products.imageUrl == null ||
      products.category == null ||
      products.description == null
    ) {
      return toast.error("all fields are required");
    }

    setLoading(true);

    try {
      const productRef = collection(fireDB, "products");
      await addDoc(productRef, products);
      toast.success("Add product successfully");
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 800);
      getProductData();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    // setProducts("")
  };

  const [product, setProduct] = useState([]);

  const getProductData = async () => {
    setLoading(true);

    try {
      const q = query(collection(fireDB, "products"), orderBy("time"));

      const data = onSnapshot(q, (QuerySnapshot) => {
        let productArray = [];
        QuerySnapshot.forEach((doc) => {
          productArray.push({ ...doc.data(), id: doc.id });
        });
        setProduct(productArray);
        setLoading(false);
      });

      return () => data;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  // update product function

  const edithandle = (item) => {
    setProducts(item);
  };

  const handleStatus = (item) => {
    setProducts(item);
  };

  const updateOrderStatus = async (status) => {
    console.log(currentOrder);
    try {
      await updateDoc(doc(fireDB, "orders", currentOrder.id), {
        orderStatus: status,
      });
      toast.success("Product Updated successfully");
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 800);
      getProductData();
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Error updating order status");
    }
  };

  const updateProduct = async () => {
    setLoading(true);
    try {
      await setDoc(doc(fireDB, "products", products.id), products);
      toast.success("Product Updated successfully");
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 800);
      getProductData();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // delete product

  const deleteProduct = async (item) => {
    setLoading(true);
    try {
      await deleteDoc(doc(fireDB, "products", item.id));
      toast.success("Product Deleted successfully");
      getProductData();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const [order, setOrder] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);

  const getOrderData = async () => {
    setLoading(true);
    try {
      const result = await getDocs(collection(fireDB, "orders"));
      const ordersArray = [];
      result.forEach((doc) => {
        ordersArray.push({ ...doc.data(), id: doc.id });
        setLoading(false);
      });
      setOrder(ordersArray);
      // console.log(ordersArray);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // update order status

  const [user, setUser] = useState([]);

  const getUserData = async () => {
    setLoading(true);
    try {
      const result = await getDocs(collection(fireDB, "users"));
      const usersArray = [];
      result.forEach((doc) => {
        usersArray.push(doc.data());
        setLoading(false);
      });
      setUser(usersArray);
      // console.log(usersArray);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrderData();
    getUserData();
  }, []);

  const [searchkey, setSearchkey] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterPrice, setFilterPrice] = useState("");

  return (
    <MyContext.Provider
      value={{
        mode,
        toggleMode,
        loading,
        setLoading,
        products,
        setProducts,
        addProduct,
        product,
        edithandle,
        handleStatus,
        updateProduct,
        deleteProduct,
        order,
        wishlist,
        user,
        searchkey,
        setSearchkey,
        filterType,
        setFilterType,
        filterPrice,
        setFilterPrice,
        updateOrderStatus,
        setCurrentOrder,
        currentOrder,
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
}

export default myState;
