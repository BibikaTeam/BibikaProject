import axios from "axios";

const instance = axios.create({
    // baseURL: "https://localhost:5001/",
    //baseURL: "https://localhost:44381/",
    baseURL: "/",
    headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
        'Authorization' : `Bearer ${localStorage.getItem("token")}`
    }
});

instance.interceptors.request.use(
    (config) => {
      if (localStorage.getItem("token")) {
        config.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const rs = await getRefreshToken();
          const { token } = rs.data;
          const { refreshTokenThere } = rs.data;
          window.localStorage.setItem("token", token);
          window.localStorage.setItem("refreshToken", refreshTokenThere);
          instance.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
          return instance(originalConfig);
        } catch (_error) {
          if (_error.response && _error.response.data) {
            return Promise.reject(_error.response.data);
          }
          return Promise.reject(_error);
        }
      }
      if (err.response.status === 403 && err.response.data) {
        return Promise.reject(err.response.data);
      }
    }
    return Promise.reject(err);
  }
);

function getRefreshToken() {
  return instance.post("/api/refresh", {
    refreshToken: getLocalRefreshToken(),
    token: getLocalAccessToken()
  });
}

  function getLocalAccessToken() {
    const accessToken = localStorage.getItem("token");
    return accessToken;
  }
  function getLocalRefreshToken() {
    const refreshToken = localStorage.getItem("refreshToken");
    return refreshToken;
  }

export default instance;