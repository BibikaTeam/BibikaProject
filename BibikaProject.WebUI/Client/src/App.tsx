import * as React from "react";
import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AdminLayout from "./components/containers/adminLayout";

const RegisterPage = lazy(() => import("./components/authorization/register"));
const LoginPage = lazy(() => import("./components/authorization/login"));
const BrandPage = lazy(() => import("./components/adminPanel/brand"));

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/">
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/brand" element={<BrandPage />} />
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
