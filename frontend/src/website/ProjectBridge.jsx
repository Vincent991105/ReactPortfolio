import { Outlet } from "react-router-dom"
import Logo from "./components/Logo"
import BridgeMap from "./component/BridgeMap"
import { AuthProvider } from "./context/AuthContext.jsx";
import { BasicProvider } from "./context/BasicContext.jsx";
import { DisasterProvider } from "./context/DisasterContext.jsx";
import { PopupProvider } from "./context/PopupContext.jsx";
import { RecordProvider } from "./context/RecordContext.jsx";
import { BridgeProvider } from "./context/BridgeContext";
import { ResultProvider } from "./context/ResultContext";
import './css/ProjectBridge.css'
import FloatingMenu from "./components/FloatingMenu.jsx";
import PopupContent from "./components/PopupContent.jsx";

function ProjectBridge(){

    return(
        <div className="ProjectBridge">
            <AuthProvider>
                <BasicProvider>
                    <PopupProvider>
                        <DisasterProvider>
                            <RecordProvider>
                                <BridgeProvider>
                                    <ResultProvider>
                                        <Logo />
                                        <FloatingMenu />
                                        <div className="content">
                                            <BridgeMap />
                                            <Outlet />
                                        </div>
                                        <PopupContent />
                                    </ResultProvider>
                                </BridgeProvider>
                            </RecordProvider>
                        </DisasterProvider>
                    </PopupProvider>
                </BasicProvider>
            </AuthProvider>
        </div>  
    )
}

export default ProjectBridge