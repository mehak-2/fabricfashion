import React from 'react';
import { MyProvider } from './context/data/myContext';
import Order from './components/Order';
import DashboardTab from './components/DashboardTab';

function App() {
  return (
    <MyProvider>
      <Order />
      <DashboardTab />
    </MyProvider>
  );
}

export default App;
