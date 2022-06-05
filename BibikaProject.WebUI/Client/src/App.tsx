import * as React from "react";
import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AdminLayout from "./components/containers/adminLayout";

import RegisterPage from "./components/authorization/register";
import LoginPage from "./components/authorization/login";
const AddPost = lazy(() => import("./components/posts/add"));

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/">
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/add-post" element={<AddPost />} />

          <Route path="/admin" element={<AdminLayout />}>
          
          </Route>
        </Route>
      </Routes>
      <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
    </Router>
  );
}

export default App;

// https://www.npmjs.com/package/ntc
