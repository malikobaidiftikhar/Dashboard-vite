import { Component, useState } from "react";

import "./App.css";
import SignUp from "./Components/SignUp";
import LoginPage from "./Components/LoginPage";
import ForgetPassword from "./Components/ForgetPassword";
import PasswordVerification from "./Components/PasswordVerification";
import SetNewPassword from "./Components/SetNewPassword";
import HomePage from "./Components/HomePage";
import Dashboard from "./Components/Dashboard";
import Orders from "./Components/Orders";
import NewOrder from "./Components/NewOrder";
import Reviews from "./Components/Reviews";

import Payments from "./Components/Payments";
import Settings from "./Components/Settings";

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route
            path="/passwordverification"
            element={<PasswordVerification />}
          />
          <Route path="/setnewpassword" element={<SetNewPassword />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<HomePage />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="orders" element={<Orders />} />
            <Route path="neworder" element={<NewOrder />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="payments" element={<Payments />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          Route
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
