import * as React from "react";
import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

//simply loading
import Test from "./components/test";
import LoadingPage from "./components/containers/defaultLayout/loading";
import DefaultLayout from "./components/containers/defaultLayout";
import AdminBasedRoute from "./routing/adminBasedRoute";
import AuthorizedBasedRoute from "./routing/authorizedBasedRoute";
import LoginPage from "./components/authorization/login";
import RegisterPage from "./components/authorization/register";
import ErrorPage from "./components/noMatch/errorPage";
import ZeroStep from "./components/posts/add/steps/ZeroStep";
import axios from "axios";
import ModalAdvUp from "./components/posts/advertisment/advModalPage";

//lazy loading
const HomePage = React.lazy(() => import("./components/home"));
const PostPage = React.lazy(() => import("./components/posts/postPage"));
const MyPosts = React.lazy(() => import("./components/userCabinet/myPosts"));
const ChatPage = React.lazy(() => import("./components/userCabinet/chat"));
const UserProfile = React.lazy(() => import("./components/userCabinet"));
const SearchResult = React.lazy(
  () => import("./components/posts/result/searchResult")
);
const SettingsProfile = React.lazy(
  () => import("./components/userCabinet/settings")
);
const SavedPosts = React.lazy(
  () => import("./components/userCabinet/savedPosts")
);
const DetailSearch = React.lazy(
  () => import("./components/posts/search/detailSearch")
);
const AdvOrderPage = React.lazy(
  () => import("./components/posts/advertisment/advOrder")
);
const ChangePasswordPage = React.lazy(
  () => import("./components/userCabinet/settings/changePassword")
);
//admin
const AdminLayout = React.lazy(
  () => import("./components/containers/adminLayout")
);
const BrandPage = React.lazy(() => import("./components/adminPanel/brand"));
const ModelPage = React.lazy(() => import("./components/adminPanel/model"));
const AdminPanelPostPage = React.lazy(
  () => import("./components/adminPanel/post")
);

const CarPage = React.lazy(() => import("./components/adminPanel/car"));
const CompleteSetPage = React.lazy(
  () => import("./components/adminPanel/completeSet")
);
const EnginePage = React.lazy(() => import("./components/adminPanel/engine"));
const GenerationPage = React.lazy(
  () => import("./components/adminPanel/generation")
);
const AddPostPage = React.lazy(() => import("./components/posts/add"));
const TrendAdvOrder = React.lazy(
  () => import("./components/posts/advertisment/trendAdvOrder")
);
const BannerAdvOrder = React.lazy(
  () => import("./components/posts/advertisment/bannerAdvOrder")
);

function App() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <Router>
        <Routes>
          <Route path="/" element={<DefaultLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/test" element={<Test />} />
            <Route path="/error/:errorCode" element={<ErrorPage />} />
            <Route path="/post/detail-search" element={<DetailSearch />} />
            <Route path="/post/search-result" element={<SearchResult />} />
            <Route path="/post/add" element={<AddPostPage />} />
            <Route path="/post/trend-adv-order" element={<TrendAdvOrder />} />
            <Route path="/post/trend-adv-order" element={<TrendAdvOrder />} />
            <Route path="/post/banner-adv-order" element={<BannerAdvOrder />} />

            <Route path="/post/:id" element={<PostPage />} />
            <Route element={<AuthorizedBasedRoute />}>
              <Route path="/user-profile" element={<UserProfile />}>
                <Route path="/user-profile/my-posts" element={<MyPosts />} />
                <Route path="/user-profile/chat" element={<ChatPage />} />
                <Route
                  path="/user-profile/saved-posts"
                  element={<SavedPosts />}
                />
                <Route
                  path="/user-profile/settings"
                  element={<SettingsProfile />}
                />
                <Route
                  path="/user-profile/settings/change-password"
                  element={<ChangePasswordPage />}
                />
              </Route>
            </Route>
          </Route>

          <Route path="/loading" element={<LoadingPage />} />
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
              <Route path="/admin/post" element={<AdminPanelPostPage />} />
            </Route>
          </Route>
        </Routes>
        <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
      </Router>
    </Suspense>
  );
}

export default App;
