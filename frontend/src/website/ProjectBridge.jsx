import { Outlet } from "react-router-dom"
import BridgeMap from "./component/BridgeMap"
import './css/ProjectBridge.css'
import FloatingMenu from "./component/FloatingMenu.jsx";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function ProjectBridge(){

    const { colormode } = useSelector((state) => state.ProjectBridgeData);

    useEffect(() => {
        document.body.className = colormode ? "PinkTheme" : "DarkTheme";
    }, [colormode]);

    return(
        <div className="ProjectBridge">
            <div className="Logo">
                <img src='/Logo.png' alt="Logo" />
            </div>
            <FloatingMenu />
            <div className="content">
                <BridgeMap />
                <Outlet />
            </div>
        </div>  
    )
}

export default ProjectBridge