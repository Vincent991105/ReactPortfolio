import BackgroundItem from "./asset/BackgroundItem";
import MenuBar from "./component/MenuBar";
import "./css/ProjectCathay.css";
import { Outlet } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

function ProjectCathay(){

    const isMobile = useMediaQuery({ maxWidth: 768 });

    return(
        <div className="ProjectCathay">
            <div className="Background">
                <BackgroundItem />
            </div>
            <div className="Main">
                {!isMobile && (
                <div className="Header">
                    <div className="LogoSet">
                    <img src="/CathayLogo.png" alt="Logo" />
                    <span>網路銀行</span>
                    </div>
                    <MenuBar />
                </div>
                )}
                <Outlet />
                {isMobile && <MenuBar type="Bottom" />}
            </div>
        </div>  
    )
}

export default ProjectCathay