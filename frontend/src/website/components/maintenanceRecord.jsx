import { Outlet } from "react-router-dom";
import BridgeMap from "../components/BridgeMap";
import { BasicContext } from "../context/BasicContext";
import { DisasterProvider } from "../context/DisasterContext";
import { useContext } from "react";
import Logo from "./Logo";
import FloatingMenu from "./FloatingMenu";

function MaintenanceRecord(){

    const { colormode } = useContext(BasicContext);

    return(
        <>
            <Logo />
            <FloatingMenu key={colormode} />
            <div className="Body">
                <DisasterProvider>
                    <BridgeMap />
                    <Outlet />
                </DisasterProvider>
            </div>
        </>
    )

}

export default MaintenanceRecord