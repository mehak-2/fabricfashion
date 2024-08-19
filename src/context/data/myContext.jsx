import React, { createContext, useState } from 'react';

const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [status, setStatus] = useState({});

  const updateStatus = (orderId, newStatus) => {
    setStatus((prevStatus) => ({
      ...prevStatus,
      [orderId]: newStatus,
    }));
  };

  return (
    <MyContext.Provider value={{ status, updateStatus }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyContext;
