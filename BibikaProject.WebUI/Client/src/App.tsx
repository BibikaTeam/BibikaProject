import * as React from "react";
import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AdminLayout from "./components/containers/adminLayout";
import RegisterPage from "./components/authorization/register";
import LoginPage from "./components/authorization/login";
import GenerationPage from "./components/adminPanel/generation";
import EnginePage from "./components/adminPanel/engine";
import BrandPage from "./components/adminPanel/brand";

const AddPost = lazy(() => import("./components/posts/add"));

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/">
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="/admin/brand" element={<BrandPage />} />
            <Route path="/admin/engine" element={<EnginePage />} />
            <Route path="/admin/generation" element={<GenerationPage />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
    </Router>
  );
}

export default App;
