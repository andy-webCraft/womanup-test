import React from "react";
import ReactDOM from "react-dom/client";
import { FirebaseAppProvider } from "reactfire";

import App from "./components/App/App";

import { firebaseConfig } from "./api/config";
import "./styles/null.less";
import "./styles/common.less";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <App />
  </FirebaseAppProvider>
);
