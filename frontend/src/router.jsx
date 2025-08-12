// router.jsx
import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectBridge from "./website/ProjectBridge";
import HomePage from "./website/pages/HomePage";
import AddBridge from "./website/pages/AddBridge"
import SensorDetail from "./website/pages/SensorDetail";
import DataResult from "./website/component/DataResult";
import HistoryResult from "./website/component/HistoryResult";
import MachineSensor from "./website/component/MachineSensor";
import BridgeMonitoring from "./website/pages/BridgeMonitoring";
import ProjectCathay from "./website/ProjectCathay";
import BankHome from "./website/pages/BankHome";
import UnknownData from "./website/component/common/UnknownData";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate replace to={"home"} />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "projects",
        element: <Projects />,
      },
      {
        path: "components",
        element: <Home />,
      },
    ],
  },
  {
    path: "ProjectBridge",
    element: <ProjectBridge />,
    children:[
      {
        index: true,
        element: <Navigate replace to={"home"} />,
      },
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "bridge-monitoring",
        element: <BridgeMonitoring />,
        children:[
          {
            path: "data-result",
            element: <DataResult type={"wholeStructure"} />,
          },
          {
            path: "history-result",
            element: <HistoryResult type={"wholeStructure"} />,
          },
          {
            path: "sensor-list",
            element: <MachineSensor />,
          },
        ]
      },
      {
        path: "sensor-monitoring",
        element: <SensorDetail />,
        children:[
          {
            path: "data-result",
            element: <DataResult type={"wholeStructure"} />,
          },
          {
            path: "history-result",
            element: <HistoryResult type={"wholeStructure"} />,
          },
        ]
      },
      {
        path: "add-bridge",
        element: <AddBridge type="add" />,
      },
      {
        path: "edit-bridge",
        element: <AddBridge type="edit" />,
      },
    ]
  },
  {
    path: "ProjectCathay",
    element: <ProjectCathay />,
    children:[
      {
        index: true,
        element: <Navigate replace to={"HomePage"} />,
      },
      {
        path: "HomePage",
        element: <BankHome />,
      },
      {
        path: "Translate",
        element: <UnknownData text="尚未擁有此頁面資料" />,
      },
      {
        path: "History",
        element: <UnknownData text="尚未擁有此頁面資料" />,
      },
      {
        path: "Investment",
        element: <UnknownData text="尚未擁有此頁面資料" />,
      },
    ]
  },
]);

export default router;
