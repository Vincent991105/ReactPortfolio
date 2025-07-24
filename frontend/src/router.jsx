// router.jsx
import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // {
      //   index: true,
      //   element: <Navigate replace to={"home"} />,
      // },
      // {
      //   path: "home",
      //   element: <Home />,
      // },
    ],
  },
]);

export default router;
