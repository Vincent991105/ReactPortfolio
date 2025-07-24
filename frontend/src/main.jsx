import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./css/reset.css"
import "./index.css";
import { Provider } from 'react-redux';
import { BrowserRouter, RouterProvider } from "react-router-dom";
import router from "./router.jsx";
import store from "./store.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
