import { useLocation, useNavigate } from "react-router-dom";
import { FaUser, FaExchangeAlt, FaHistory, FaChartLine } from "react-icons/fa";

function MenuBar({ type }) {
  const navigate = useNavigate();
  const location = useLocation();

  const Data = [
    { icon: <FaUser />, name: "個人資料", path: "HomePage" },
    { icon: <FaExchangeAlt />, name: "轉帳功能", path: "Translate" },
    { icon: <FaHistory />, name: "歷史資料", path: "History" },
    { icon: <FaChartLine />, name: "投資專區", path: "Investment" },
  ];

  return (
    <div className="PC_MenuBar">
      <div className="MenuList">
        {Data.map((menu, index) => (
          <h4
            className={`${location.pathname === menu.path ? "active" : ""}`}
            key={index}
            onClick={() => navigate(menu.path)}
          >
            {type ? menu.icon : menu.name}
          </h4>
        ))}
      </div>
      <button>登出</button>
    </div>
  );
}

export default MenuBar;
