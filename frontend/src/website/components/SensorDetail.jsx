import { useContext, useEffect, useState } from "react";
import { FaClipboardList } from "react-icons/fa";
import MachineBridge from "./MachineBridge";
import { BridgeContext } from "../context/BridgeContext";
import LinearProgress from "@mui/material/LinearProgress";
import { AiFillFileUnknown } from "react-icons/ai";
import { DisasterContext } from "../context/DisasterContext";
import { BasicContext } from "../context/BasicContext";
import { useSwipeable } from "react-swipeable";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { IoMdRefreshCircle } from "react-icons/io";

function SensorDetail() {
  const navigate = useNavigate();
  const location = useLocation(); // 取得當前路由位置

  // 用於判斷當前路由與每個 tab 的對應關係
  const tabs = [
    { path: "data-result", label: "數據報表" },
    { path: "history-result", label: "歷史趨勢" },
    { path: "earthquake-result", label: "地震資訊" },
    { path: "typhoon-result", label: "颱風資訊" },
  ];

  const { isMobile } = useContext(BasicContext);

  const handlers = useSwipeable({
    onSwipedLeft: () => changeSensor("left"),
    onSwipedRight: () => changeSensor("right"),
  });

  const {
    filterItems,
    select,
    loading,
    dataTime,
    changeSensor,
    selectSensorData,
    selectSensor,
  } = useContext(BridgeContext);
  const { callEarthData, callTyphoonData } = useContext(DisasterContext);

  const [activeTab, setActiveTab] = useState("DataResult"); // 預設選中第一個 Tab

  const statusColor =
    selectSensorData[0]?.status === 0 && selectSensorData[0]?.latestHealth
      ? { backgroundColor: "#9DCD7B", color: "#FFF" }
      : selectSensorData[0]?.status === 1 && selectSensorData[0]?.latestHealth
      ? { backgroundColor: "#FFD700", color: "#FFF" }
      : { backgroundColor: "#FF6347", color: "#FFF" };

  const handleTabClick = (tabId) => {
    setActiveTab(tabId); // 設定目前被選中的 Tab
  };

  useEffect(() => {
    if (select && activeTab === "EarthquakeResult") {
      callEarthData(select);
    }
    if (select && activeTab === "TyphoonResult") {
      callTyphoonData(select);
    }
  }, [select, activeTab]);

  if (!filterItems) {
    return (
      <div className="SensorDetail">
        <div
          style={{
            margin: "auto",
            width: "100%",
          }}
        >
          <LinearProgress />
        </div>
      </div>
    );
  }

  if (filterItems) {
    return (
      <div className="SensorDetail" {...(isMobile ? handlers : {})}>
        <div className="TopBar">
          <div className="Title">
            <FaClipboardList fontSize="1.5em" />
            <h2>即時報表</h2>
          </div>
          <div className="Title">
            <span style={{cursor:'pointer', display:'flex'}} onClick={() => selectSensor(select.sensor,select.bridge)}><IoMdRefreshCircle fontSize="1em" /></span>
            <p>更新時間：{dataTime}</p>
          </div>
        </div>
        <div className="MachineTable">
          {filterItems.data.bridge && (
            <MachineBridge
              filterItems={filterItems.data.bridge}
              sensorPoint={filterItems.data.sensorList}
            />
          )}
          <div className="TableColumn">
            <div className="CommonData">
              <h3>橋梁基本資料</h3>
              <h4>{filterItems.data.bridge?.name || "未提供名稱"}</h4>
              <p>
                {filterItems.data.bridge?.city}
                {filterItems.data.bridge?.district}
              </p>
              <p>經度：{filterItems.data.bridge?.latitude}</p>
              <p>緯度：{filterItems.data.bridge?.longitude}</p>
            </div>
            {selectSensorData.length > 0 ? (
              <div className="SensorCommonData" style={statusColor}>
                <h3>感測器資料</h3>
                <h4>{selectSensorData[0]?.detailedLocation}</h4>
                <p style={{ fontWeight: "bold" }}>
                  構件樣態：{selectSensorData[0]?.sensorLocation}
                </p>
                <p style={{ fontWeight: "bold" }}>
                  {selectSensorData[0]?.status === 0
                    ? "連線正常"
                    : selectSensorData[0]?.status === 1
                    ? "連線延遲(超過10分鐘)"
                    : "連線中斷(超過60分鐘)"}
                </p>
              </div>
            ) : (
              <div className="CommonData" style={{ alignItems: "center" }}>
                <AiFillFileUnknown fontSize={80} />
                <h4>未發現任何感測器</h4>
              </div>
            )}
          </div>
        </div>
        {selectSensorData && (
          <div className="SensorTool">
            <div className="Tablist">
              {tabs.map((tab, index) => (
                <h4
                  key={index}
                  className={`Tab ${
                    location.pathname === `/ProjectBridge/sensor-monitoring/${tab.path}` ? "specialActive" : ""
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
        )}
      </div>
    );
  }

  // 如果 `filterItems` 存在但没有数据
  if (filterItems && filterItems.success === false) {
    return (
      <div className="MachineList">
        <div className="TopBar">
          <div className="Title">
            <FaClipboardList fontSize="1.5em" color="#E95098" />
            <h2>即時報表</h2>
          </div>
          <p>更新時間：資料異常</p>
        </div>
        <div className="noneData">
          <AiFillFileUnknown fontSize={100} />
          <h2>並未發現任何資料</h2>
        </div>
      </div>
    );
  }
}

export default SensorDetail;
