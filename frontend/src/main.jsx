import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./css/reset.css"
import { Provider } from 'react-redux';
import { BrowserRouter, RouterProvider } from "react-router-dom";
import router from "./router.jsx";
import store from "./store.jsx";
import { SpeedInsights } from "@vercel/speed-insights/react"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <SpeedInsights>
        <RouterProvider router={router} />
      </SpeedInsights>
    </Provider>
  </StrictMode>
);
