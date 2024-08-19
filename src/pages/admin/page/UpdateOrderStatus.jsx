import React, { useContext,useRef } from "react";
import myContext from "../../../context/data/myContext";

const UpdateOrderStatus = () => {
  const context = useContext(myContext);
  const ref=useRef();
  const { updateOrderStatus, setOrderStatus, setProducts, order, products } =
      context;
    
    

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <select
        className="bg-gray-50 border w-96 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mt-4"
        ref={ref}
      >
        <option value="">Select Status</option>
        <option value="Shipped">Shipped</option>
        <option value="Delivered">Delivered</option>
        <option value="Cancelled">Cancelled</option>
      </select>
      <button
        onClick={() => updateOrderStatus( ref.current.value)}
        style={{ background: "linear-gradient(to right, #f19257, #2f4fe1)" }}
        className="w-96 mt-3 text-blue font-bold px-2 py-2 rounded-lg"
      >
        Update Order Status
      </button>
    </div>
  );
};

export default UpdateOrderStatus;
