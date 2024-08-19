// import React, { useContext, useEffect } from 'react';
// import MyContext from '../../context/data/myContext';
// import Layout from '../../components/layout/Layout';
// import Loader from '../../components/loader/Loader';

// function Order() {
//   const { status = {}, updateStatus = () => {} } = useContext(MyContext);
//   const [userid, setUserid] = React.useState(null);
//   const context = useContext(MyContext);
//   const { mode, loading, order = [] } = context;

//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       setUserid(JSON.parse(storedUser).user.uid);
//     }
//   }, []);

//   const handleTrackStatus = (orderId) => {
//     const currentStatus = status[orderId] || 'Pending';
//     const newStatus = currentStatus === 'Shipped' ? 'Processing' : 'Shipped';
//     updateStatus(orderId, newStatus);
//   };

//   return (
//     <Layout>
//       {loading && <Loader />}
//       {userid && order.length > 0 ? (
//         <div className="h-full pt-10">
//           <h1 className="text-white text-center font-bold text-4xl mb-5">My Orders</h1>
//           {order.filter(obj => obj.userid === userid).map((order) => (
//             <div key={order.id} className="mx-auto max-w-5xl px-6 xl:px-0">
//               {order.cartItems.map((item) => (
//                 <div key={item.id} className="rounded-lg mb-6">
//                   <div
//                     className="flex rounded-lg p-4 shadow-md"
//                     style={{
//                       backgroundColor: mode === 'dark' ? '#282c34' : '',
//                       color: mode === 'dark' ? 'white' : 'black',
//                     }}
//                   >
//                     <div className="flex-shrink-0">
//                       <img
//                         src={item.imageUrl}
//                         alt="product-image"
//                         className="rounded-lg"
//                         style={{ width: '150px', height: '150px', objectFit: 'cover', marginRight: '10px' }}
//                       />
//                     </div>
//                     <div className="flex-grow flex flex-col justify-center ml-20">
//                       <h2
//                         className="text-2xl font-bold"
//                         style={{ color: mode === 'dark' ? 'white' : 'black' }}
//                       >
//                         {item.title}
//                       </h2>
//                       <p
//                         className="mt-1 text-lg"
//                         style={{ color: mode === 'dark' ? 'white' : 'black' }}
//                       >
//                         {item.description}
//                       </p>
//                       <p
//                         className="mt-1 text-lg"
//                         style={{ color: mode === 'dark' ? 'white' : 'black' }}
//                       >
//                         Rs. {item.price}
//                       </p>
//                       <button
//                         onClick={() => handleTrackStatus(order.id)}
//                         className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
//                       >
//                         Track Status
//                       </button>
//                       {status[order.id] && (
//                         <p className="mt-2 text-lg">
//                           Status: {status[order.id]}
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ))}
//         </div>
//       ) : (
//         <h2 className="text-center text-2xl text-white">No Orders</h2>
//       )}
//     </Layout>
//   );
// }

// export default Order;
// // import React, { useContext } from "react";
// // import myContext from "../../context/data/myContext";
// // import Layout from "../../components/layout/Layout";
// // import Loader from "../../components/loader/Loader";

// // function Order() {
// //   const userid = JSON.parse(localStorage.getItem("user")).user.uid;
// //   const context = useContext(myContext);
// //   const { mode, loading, order } = context;

// //   return (
// //     <Layout>
// //       {/* Header */}
// //       <h1 className="text-center text-3xl font-bold text-white mb-0 mt-10 mr-4 sm:mr-8 md:mr-16 lg:mr-24 xl:mr-2">
// //   My Orders
// // </h1>

// //       {/* Loader */}
// //       {loading && <Loader />}

// //       {/* Order List */}
// //       {order.length > 0 ? (
// //         <div className="h-full pt-10">
// //           {order
// //             .filter((obj) => obj.userid === userid)
// //             .map((order) => (
// //               <div
// //                 className="mx-auto max-w-5xl px-6 md:flex md:space-x-6 xl:px-0 mb-6"
// //                 key={order.id}
// //               >
// //                 {order.cartItems.map((item) => (
// //                   <div className="rounded-lg md:w-2/3 mb-4" key={item.id}>
// //                     <div
// //                       className="flex items-center justify-between rounded-lg bg-black p-6 shadow-md "
// //                       style={{
// //                         backgroundColor: mode === "dark" ? "black" : "",
// //                         color: mode === "dark" ? "white" : "black",
// //                       }}
// //                     >
// //                       <img
// //                         src={item.imageUrl}
// //                         alt="product"
// //                         className="w-40 h-40 object-cover rounded-lg"
// //                       />
// //                       <div className="ml-12 flex-1">
// //                         <h2
// //                           className="text-lg font-bold"
// //                           style={{
// //                             color: mode === "dark" ? "white" : "white",
// //                           }}
// //                         >
// //                           {item.title}
// //                         </h2>
// //                         <p
// //                           className="mt-1 text-lg font-semibold"
// //                           style={{
// //                             color: mode === "dark" ? "white" : "white",
// //                           }}
// //                         >
// //                         Rs.  {item.price}
// //                         </p>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             ))}
// //         </div>
// //       ) : (
// //         <h2 className="text-center text-2xl text-white">No Orders Found</h2>
// //       )}
// //     </Layout>
// //   );
// // }

// // export default Order;

// import React, { useContext } from 'react';
// import myContext from '../../context/data/myContext';
// import Layout from '../../components/layout/Layout';
// import Loader from '../../components/loader/Loader';

// function Order() {
//   const userid = JSON.parse(localStorage.getItem('user')).user.uid;
//   const context = useContext(myContext);
//   const { mode, loading, order } = context;
//   // console.log(order)

//   return (
//     <Layout>
//       {loading && <Loader />}
//       {order.length > 0 ? (
//         <div className="h-full pt-10">
//           <h1 style={{ color: "white", textAlign: "center", fontWeight: "bold", fontSize: "40px", marginBottom: "20px" }}>My Orders</h1>
//           {order.filter(obj => obj.userid === userid).map((order) => (
//             <div key={order.id} className="mx-auto max-w-5xl px-6 xl:px-0">
//               {order.cartItems.map((item) => (
//                 <div key={item.id} className="rounded-lg mb-6">
//                   <div
//                     className="flex rounded-lg p-4 shadow-md"
//                     style={{
//                       backgroundColor: mode === 'dark' ? '#282c34' : '',
//                       color: mode === 'dark' ? 'white' : 'white',
//                     }}
//                   >
//                     <div className="flex-shrink-0">
//                       <img
//                         src={item.imageUrl}
//                         alt="product-image"
//                         className="rounded-lg"
//                         style={{ width: '150px', height: '150px', objectFit: 'cover', marginRight: '10px' }}
//                       />
//                     </div>
//                     <div className="flex-grow flex flex-col justify-center ml-20">
//                       <h2
//                         className="text-[40px] font-bold text-gray-900"
//                         style={{ color: mode === 'dark' ? 'white' : 'white' }}
//                       >
//                         {item.title}
//                       </h2>
//                       <p
//                         className="mt-1 text-[20px] text-gray-700"
//                         style={{ color: mode === 'dark' ? 'white' : 'white' }}
//                       >
//                         {item.description}
//                       </p>
//                       <p
//                         className="mt-1 text-[20px] text-gray-700"
//                         style={{ color: mode === 'dark' ? 'white' : 'white' }}
//                       >
//                         Rs. {item.price}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ))}
//         </div>
//       ) : (
//         <h2 className="text-center text-2xl text-white">No Orders</h2>
//       )}
//     </Layout>
//   );
// }

// export default Order;
import React, { useContext } from "react";
import myContext from "../../context/data/myContext";
import Layout from "../../components/layout/Layout";
import Loader from "../../components/loader/Loader";
import border_img from '../../../dist/assets/border_img.jpg';

function Order() {
  const userid = JSON.parse(localStorage.getItem("user")).user.uid;
  const context = useContext(myContext);
  const { mode, loading, order } = context;
  console.log(order);

  return (
    <Layout>
      {loading && <Loader />}
      {order.length > 0 ? (
        <div className="h-full pt-10 px-4 sm:px-6 lg:px-8">
          <h1
            className="text-center font-bold text-white mb-6"
            style={{
              fontSize: "24px", // Adjusted for mobile
              marginBottom: "16px", // Adjusted for mobile
            }}
          >
            My Orders
          </h1>
          {order
            .filter((obj) => obj.userid === userid)
            .map((order) => (
              <div key={order.id} className="max-w-5xl mx-auto mb-6">
                <div
                  className="flex flex-col sm:flex-row justify-between rounded-lg p-4 shadow-md"
                  style={{
                    backgroundColor: mode === "dark" ? "#282c34" : "",
                    color: mode === "dark" ? "white" : "white",
                  }}
                >
                  <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-4">
                    <img
                      src={order.cartItems[0].imageUrl} // Assuming at least one item exists
                      alt="product-image"
                      className="rounded-lg w-full sm:w-[150px] sm:h-[150px] object-cover"
                      style={{
                        backgroundImage: `url(${border_img})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        borderRadius: '20px',
                        padding: '10px',
                        transition: "background 0.3s ease-in-out",
                      }}
                    />
                  </div>
                  <div className="flex-grow flex flex-col justify-center sm:ml-6 text-center sm:text-left">
                    <h2
                      className="text-lg sm:text-2xl font-bold text-gray-900"
                      style={{ color: mode === "dark" ? "white" : "white" }}
                    >
                      {order.cartItems[0].title}{" "}
                      {/* Assuming at least one item exists */}
                    </h2>
                    <p
                      className="mt-1 text-sm sm:text-base text-gray-700"
                      style={{ color: mode === "dark" ? "white" : "white" }}
                    >
                      {order.cartItems[0].description}
                    </p>
                    <p
                      className="mt-1 text-sm sm:text-base text-gray-700"
                      style={{ color: mode === "dark" ? "white" : "white" }}
                    >
                      Rs. {order.cartItems[0].price}
                    </p>
                    <p
                      className="mt-1 text-sm sm:text-base text-gray-700"
                      style={{ color: mode === "dark" ? "white" : "white" }}
                    >
                      Status: <span className="px-2 bg-yellow-400 rounded-lg py-1">{order.orderStatus}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <h2 className="text-center text-2xl text-white">No Orders</h2>
      )}
    </Layout>
  );
}

export default Order;
