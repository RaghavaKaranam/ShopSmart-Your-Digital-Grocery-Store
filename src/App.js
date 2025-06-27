import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import SignUp from './User-module/Pages/SignUp/Signup';
import Header from './User-module/components/header/Header';
import Footer from './User-module/components/footer/Footer';
import Home from './User-module/components/home/Home';
import FeedbackPage from './User-module/Pages/FeedbackPage';
import Login from './User-module/Pages/login/Login';
import Landing from './User-module/Pages/landing/Landing';
import Cart from './User-module/Pages/Cart/Cart';
import Products from './User-module/Pages/products/Products';
import Checkout from './User-module/Pages/checkout/Checkout';
import OrderHistory from './User-module/Pages/orderHistory/OrderHistory';

import AdminLogin from './Admin/AdminLogin/adminLogin';
import AdminDashboard from './Admin/Admin-DashBoard/adminDasboard';
import AddCategory from './Admin/category/category';
import AddProduct from './Admin/Add-Products/AddProducts';
import AdminFeedback from './Admin/Feedback-View/FeedbackView';
import EditProduct from './Admin/Edit-Product/EditProduct';
import Orders from './Admin/Orders/OrdersList';
import AdminUsers from './Admin/Users_details/Users_details'

import { CartProvider } from './User-module/CartContext/CartContext';
import { AuthProvider } from './User-module/AuthContext/AuthContext';
import ProtectedRoute from './User-module/components/ProtectedRotes';

// Wrapper component to conditionally show Header/Footer
function Layout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {/* Show Header/Footer only if not on admin page */}
      {!isAdminRoute && <Header />}

      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/feedback" element={<FeedbackPage />} />

        {/* Admin Pages */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/add-category" element={<AddCategory />} />
        <Route path="/admin/add-product" element={<AddProduct />} />
        <Route path="/admin/feedback" element={<AdminFeedback />} />
        <Route path="/admin/edit-product" element={<EditProduct />} />
        {/* <Route path="/admin/checkout" element={<CheckoutProducts />} /> */}
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/orders" element={<Orders />} />

        {/* User Protected Pages */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/product"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <OrderHistory />
            </ProtectedRoute>
          }
        />
      </Routes>

      {!isAdminRoute && <Footer />}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Layout />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
