import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Logo from "./Logo";
import FloatingMenu from "./FloatingMenu";
import { BasicContext } from "../context/BasicContext";
import { BridgeContext } from "../context/BridgeContext";
import BridgeMap from "../components/BridgeMap";

const MaintenaceRepair = () => {
  const { colormode } = useContext(BasicContext);
  const { bridgePoint } = useContext(BridgeContext);

  return (
    <>
      <Logo />
      <FloatingMenu />
      <div className="Body">
        <BridgeMap bridgePoint={bridgePoint} />
        <Outlet />
      </div>
    </>
  );
};

export default MaintenaceRepair;
