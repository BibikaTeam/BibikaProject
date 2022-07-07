import * as React from "react";
import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AdminLayout from "./components/containers/adminLayout";
import RegisterPage from "./components/authorization/register";
import LoginPage from "./components/authorization/login";
import AddPostPage from "./components/posts/add";

//admin pages
import BrandPage from "./components/adminPanel/brand";
import ModelPage from "./components/adminPanel/model";
import GenerationPage from "./components/adminPanel/generation";
import EnginePage from "./components/adminPanel/engine";
import CompleteSetPage from "./components/adminPanel/completeSet";
import CarPage from "./components/adminPanel/car";
import AdminBasedRoute from "./routing/adminBasedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/">
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminBasedRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="/admin/brand" element={<BrandPage />} />
              <Route path="/admin/model" element={<ModelPage />} />
              <Route path="/admin/generation" element={<GenerationPage />} />
              <Route path="/admin/engine" element={<EnginePage />} />
              <Route path="/admin/complete-set" element={<CompleteSetPage />} />
              <Route path="/admin/car" element={<CarPage />} />
            </Route>
          </Route>
          <Route path="/post/add" element={<AddPostPage />} />
        </Route>
      </Routes>
      <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
    </Router>
  );
}

export default App;
