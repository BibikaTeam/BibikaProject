import axios from "axios";

const instance = axios.create({
    baseURL: "https://localhost:5001/",
    //baseURL: "https://localhost:44381/",
    headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
        'Authorization' : `Bearer ${localStorage.getItem("token")}`
    }
});

instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers["x-access-token"] = token;
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
          const rs = await refreshToken();
          const { accessToken } = rs.data;
          window.localStorage.setItem("accessToken", accessToken);
          instance.defaults.headers.common["x-access-token"] = accessToken;
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

function refreshToken() {
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