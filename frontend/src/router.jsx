// router.jsx
import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectBridge from "./website/ProjectBridge";
import HomePage from "./website/components/HomePage";
import SensorDetail from "./website/components/SensorDetail";
import DataResult from "./website/component/DataResult";
import HistoryResult from "./website/component/HistoryResult";
import MachineSensor from "./website/component/MachineSensor";
import DisasterList from "./website/components/DisasterList";
import MaintenaceRepair from "./website/components/MaintenanceRepair";
import RepairTable from "./website/components/RepairTable";
import AddRepairRequest from "./website/components/AddRepairRequest";
import CheckRequest from "./website/components/CheckRequest";
import MaintenanceRecord from "./website/components/MaintenanceRecord";
import MaintenanceList from "./website/components/MaintenanceList";
import AddMaintenance from "./website/components/AddMaintenance";
import CheckMaintenance from "./website/components/CheckMaintenance";
import BridgeMonitoring from "./website/pages/BridgeMonitoring";

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
          {
            path: "earthquake-result",
            element: <DisasterList type="earthquake" dataType={"sensor"} />,
          },
          {
            path: "typhoon-result",
            element: <DisasterList type="typhoon" dataType={"sensor"} />,
          },
        ]
      },
      {
        path: "repair-list",
        element: <RepairTable />,
      },
      {
        path: "repair-add",
        element: <AddRepairRequest />,
      },
      {
        path: "repair-check/:id",
        element: <CheckRequest />,
      },
      {
        path: "maintance-list",
        element: <MaintenanceList />,
      },
      {
        path: "maintance-add",
        element: <AddMaintenance />,
      },
      {
        path: "maintance-check/:id",
        element: <CheckMaintenance />,
      },
    ]
  },
]);

export default router;
