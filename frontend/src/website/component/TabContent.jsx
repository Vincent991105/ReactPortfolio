import { useNavigate, Outlet, useLocation } from "react-router-dom";
import './css/TabContent.css'

function TabContent({tabs}){

    const navigate = useNavigate();
    const location = useLocation(); // 取得當前路由位置

    return(
        <div className="TabContent">
          <div className="Tablist">
            {tabs?.map((tab, index) => (
              <h4
                key={index}
                className={`Tab ${
                  location.pathname.includes(tab.path) ? "specialActive" : ""
                }`}
                onClick={() => navigate(tab.path)}
                style={{ cursor: "pointer" }}
              >
                {tab.label}
              </h4>
            ))}
          </div>
          <Outlet />
        </div>
    )

}

export default TabContent