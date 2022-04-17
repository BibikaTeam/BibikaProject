import * as React from "react";
import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const RegisterPage = lazy(() => import("./components/authorization/register"));
const LoginPage = lazy(() => import("./components/authorization/login"));

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/">
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
