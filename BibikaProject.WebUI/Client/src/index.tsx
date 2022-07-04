import React from "react";
// @ts-ignore
import * as ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";

import "./styles/theme.scss";
import "./index.scss";


// import { createBrowserHistory } from "history";
import configureStore from "./store/configureStore";
import { GoogleOAuthProvider } from "@react-oauth/google";

// const history = createBrowserHistory();
const store = configureStore();

let root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  // <React.StrictMode>
  <Provider store={store}>  
      <App />
  </Provider>
  // </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
