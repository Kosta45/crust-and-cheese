import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";

import { store } from "./redux/store.js";
import { Provider } from "react-redux";

import "./index.css";

const rootElem = document.getElementById("root");

if (rootElem) {
  const root = ReactDOM.createRoot(rootElem);

  root.render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  );
}
