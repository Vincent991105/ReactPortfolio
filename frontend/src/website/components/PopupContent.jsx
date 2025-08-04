import { useContext } from "react";
import EditBridge from "./EditBridge";
import EditSensor from "./EditSensor";
import { BridgeContext } from "../context/BridgeContext";
import { PopupContext } from "../context/PopupContext";
import AlertChart from "../components/AlertChart";
import MaintenanceChart from "../components/MaintenanceChart";
import MaintenanceReport from "../components/MaintenanceReport";

function PopupContent() {
  const { filterItems } = useContext(BridgeContext);
  const { isOpen, selectError } = useContext(PopupContext);

  if (selectError) {
    return <AlertChart data={selectError} />;
  }

  if (isOpen.type === "") {
    return;
  }

  if (isOpen.type === "maintenance") {
    return <MaintenanceChart id={isOpen.data} />;
  }

  if (isOpen.type === "report") {
    return <MaintenanceReport id={isOpen.data} />;
  }

  if (isOpen.type === "bridge") {
    return <EditBridge bridgeData={filterItems.data.bridge} />;
  }

  if (isOpen.type === "sensor") {
    return (
      <EditSensor
        bridgeData={filterItems.data.bridge}
        sensorData={isOpen.data}
      />
    );
  }
}

export default PopupContent;
