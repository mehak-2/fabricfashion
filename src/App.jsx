import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import More from "./pages/allproducts/More";
import PakistaniSuits from "./pages/allproducts/PakistaniSuits";
import Ethnic from "./pages/allproducts/Ethnic";
import AnarkaliDress from "./pages/allproducts/AnarkaliDress";
import KoreanTrendy from "./pages/allproducts/KoreanTrendy";
import PinterestFind from "./pages/allproducts/PinterestFind";
import Jewellery from "./pages/allproducts/Jewellery";
import Handbags from "./pages/allproducts/Handbags";
import Accessories from "./pages/allproducts/Accessories";
import Filter from "./components/filter/Filter";
import Account from "./pages/registration/account";
import Home from "./pages/home/Home";
import Order from "./pages/order/Order";
import Cart from "./pages/cart/Cart";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import NoPage from "./pages/nopage/NoPage";
import MyState from "./context/data/myState";
import Login from "./pages/registration/Login";
import Signup from "./pages/registration/Signup";
import ProductInfo from "./pages/productInfo/ProductInfo";
import AddProduct from "./pages/admin/page/AddProduct";
import UpdateProduct from "./pages/admin/page/UpdateProduct";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Allproducts from "./pages/allproducts/Allproducts";
import Wishlist from './pages/wishlist/Wishlist';
import ProfileForm from "./pages/registration/ProfileForm";
import Profile from "./pages/profile/Profile";
import Western from "./pages/allproducts/Western";
import UpdateOrderStatus from "./pages/admin/page/UpdateOrderStatus";



function App() {
  return (
    <MyState>
      <Router>
        <Routes>
        <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/profileform" element ={<ProfileForm/>}/>
          <Route path="/allproducts" element={<Allproducts />} />
          <Route path="/order" element={<ProtectedRoute><Order /></ProtectedRoute>} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/dashboard" element={<ProtectedRouteForAdmin><Dashboard /></ProtectedRouteForAdmin>} />
          <Route path="/admin/updateorderstatus" element={<ProtectedRouteForAdmin><UpdateOrderStatus/></ProtectedRouteForAdmin>} />
          <Route path="/accessories" element={<Accessories />} />
          <Route path="/western" element={<Western />} />
          <Route path="/pakistani-suits" element={<PakistaniSuits />} />
          <Route path="/handbags" element={<Handbags />} />
          <Route path="/more" element={<More />} />
          <Route path="/ethnic" element={<Ethnic />} />
          <Route path="/jewellery" element={<Jewellery />} />
          <Route path="/korean-trendy" element={<KoreanTrendy />} />
          <Route path="/pinterest-find" element={<PinterestFind />} />
          <Route path="/anarkali-dress" element={<AnarkaliDress />} />
          <Route path="/account" element={<Account />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/productinfo/:id" element={<ProductInfo />} />
          <Route path="/filter" element={<Filter />} />
          <Route path="/addproduct" element={<ProtectedRouteForAdmin><AddProduct /></ProtectedRouteForAdmin>} />
          <Route path="/updateproduct" element={<ProtectedRouteForAdmin><UpdateProduct /></ProtectedRouteForAdmin>} />
          <Route path="/*" element={<NoPage />} />
        </Routes>
        <ToastContainer />
      </Router>
    </MyState>
  );
}


export default App;

// ProtectedRoute for users
export const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("user");
  return user ? children : <Navigate to="/login" />;
};

// ProtectedRouteForAdmin for admin users
const ProtectedRouteForAdmin = ({ children }) => {
  const admin = JSON.parse(localStorage.getItem("user"));
  return admin?.user?.email === "mehak@gmail.com" ? children : <Navigate to="/login" />;
};
