import "core-js/stable";
import "regenerator-runtime/runtime";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import { store } from "./redux/store/configureStore";

ReactDOM.render(
  <>
    <CssBaseline />
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </>,
  document.getElementById("app")
);

module.hot.accept();
