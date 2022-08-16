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
<<<<<<< HEAD
=======

>>>>>>> 1fbc4b9f71b5c86ccee32149bd08d1c777567a5a
import UserProfile from "./components/userCabinet";
import AuthorizedBasedRoute from "./routing/authorizedBasedRoute";
import HomePage from "./components/home";
import DefaultLayout from "./components/containers/defaultLayout";
import SearchResult from "./components/posts/result/searchResult";
<<<<<<< HEAD
=======
import PostAdd from "./components/posts/add";
import PostPage from "./components/posts/postPage";
import DetailSearch from "./components/posts/search/detailSearch";
import Test from "./components/test";
>>>>>>> 1fbc4b9f71b5c86ccee32149bd08d1c777567a5a

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/post/add" element={<AddPostPage />} />
<<<<<<< HEAD
          <Route path="/post/search-result" element={<SearchResult />} />
=======
          <Route path="/post/detail-search" element={<DetailSearch />} />
          <Route path="/post/search-result" element={<SearchResult />} />
          <Route path="/post/:id" element={<PostPage />}/>
>>>>>>> 1fbc4b9f71b5c86ccee32149bd08d1c777567a5a
          <Route element={<AuthorizedBasedRoute />}>
            <Route path="/user-profile" element={<UserProfile />}></Route>
          </Route>
        </Route>

        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
<<<<<<< HEAD

=======
        <Route path="/test" element={<Test />} />
>>>>>>> 1fbc4b9f71b5c86ccee32149bd08d1c777567a5a

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
      </Routes>
      <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
    </Router>
  );
}

export default App;
