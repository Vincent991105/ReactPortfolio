import { useContext } from "react";
import MachineBridge from "./MachineBridge";
import MachineSensor from "./MachineSensor";
import { MdAppSettingsAlt } from "react-icons/md";
import DisasterComponents from "./DisasterComponents";
import { BridgeContext } from "../context/BridgeContext";
import { DisasterContext } from "../context/DisasterContext";
import { Gauge, gaugeClasses } from "@mui/x-charts";
import { AiFillFileUnknown } from "react-icons/ai";
import LinearProgress from "@mui/material/LinearProgress";
import { useSwipeable } from "react-swipeable";
import { BasicContext } from "../context/BasicContext";
import WeatherList from "./WeatherList";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { IoMdRefreshCircle } from "react-icons/io";

function MachineList() {
  const navigate = useNavigate();
  const location = useLocation(); // 取得當前路由位置

  // 用於判斷當前路由與每個 tab 的對應關係
  const tabs = [
    { path: "sensor-list", label: "感測器列表" },
    { path: "data-result", label: "數據報表" },
    { path: "history-result", label: "歷史趨勢" },
    // { path: "/bridge-monitoring/earthquake-result", label: "地震資訊" },
    // { path: "/bridge-monitoring/typhoon-result", label: "颱風資訊" },
    // { path: "/bridge-monitoring/surveillance-images", label: "監視影像" },
  ];

  const { isMobile } = useContext(BasicContext);
  const {
    filterItems,
    loading,
    dataTime,
    changeBridge,
    fetchBridges,
    structuresList,
  } = useContext(BridgeContext);
  const { selectedId, handleToggle } = useContext(DisasterContext);

  const handlers = useSwipeable({
    onSwipedLeft: () => changeBridge("left"),
    onSwipedRight: () => changeBridge("right"),
  });

  const sData = structuresList?.filter((item) => item.bid === 1);

  // 自動更新
  // useEffect(() => {
  //     const intervalFilterItems = setInterval(async () => {
  //         if (select) {
  //             await fetchBridges('timer'); // 异步调用
  //         }
  //     }, 5000);

  //     return () => clearInterval(intervalFilterItems); // 清理定时器
  // }, [select]);

  if (loading) {
    return (
      <div className="MachineList">
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
      <div className="MachineList" {...(isMobile ? handlers : {})}>
        <div className="TopBar">
          <div className="Title">
            <MdAppSettingsAlt fontSize="1.5em" />
            <h2>監控儀錶板</h2>
          </div>
          <div className="Title">
            <span
              style={{ cursor: "pointer", display: "flex" }}
              onClick={() => fetchBridges("timer")}
            >
              <IoMdRefreshCircle fontSize="1em" />
            </span>
            <p>更新時間：{dataTime}</p>
          </div>
        </div>
        <div className="MachineTable">
          {filterItems.data.bridge && (
            <MachineBridge filterItems={filterItems.data.bridge} />
          )}
          <div className="TableColumn">
            {/* <div className="CommonData">
                            <h3>橋梁基本資料</h3>
                            <h4>{filterItems.data.bridge?.name || "未提供名稱"}</h4>
                            <p>
                                {filterItems.data.bridge?.city}
                                {filterItems.data.bridge?.district}
                            </p>
                            <p>經度：{filterItems.data.bridge?.latitude}</p>
                            <p>緯度：{filterItems.data.bridge?.longitude}</p>
                        </div> */}
            <WeatherList />
            {filterItems.data.bridge.latestHealth != null ? (
              <div className="BridgeHealthy">
                <Gauge
                  // width={200}
                  height={75}
                  value={filterItems.data.bridge.latestHealth}
                  startAngle={-90}
                  endAngle={90}
                  sx={(theme) => ({
                    [`& .${gaugeClasses.valueText}`]: {
                      fontSize: 18,
                    },
                    [`& .${gaugeClasses.valueArc}`]: {
                      fill:
                        filterItems.data.bridge.latestHealth <= 30
                          ? "#FF6347" // 红色
                          : filterItems.data.bridge.latestHealth <= 70
                          ? "#FFD700" // 黄色
                          : "#9DCD7B", // 绿色
                    },
                    [`& .${gaugeClasses.referenceArc}`]: {
                      fill: theme.palette.text.disabled,
                    },
                  })}
                />
                <h4>橋梁健康度</h4>
              </div>
            ) : (
              <div className="CommonData" style={{ alignItems: "center" }}>
                <AiFillFileUnknown fontSize={80} />
                <h4>無法計算橋梁健康度</h4>
              </div>
            )}
          </div>
        </div>
        {filterItems.data.earthquake.id && filterItems.data.typhoon.id && (
          <div className="NewsDisaster">
            {filterItems.data.earthquake.id && sData && (
              <DisasterComponents
                type="earthquake"
                isData={filterItems.data.earthquake}
                sData={sData[0].earthquake}
                isSelected={selectedId === filterItems.data.earthquake.id}
                onToggle={handleToggle}
              />
            )}
            {filterItems.data.typhoon.id && sData && (
              <DisasterComponents
                type="typhoon"
                isData={filterItems.data.typhoon}
                sData={sData[0].typhoon}
              />
            )}
          </div>
        )}
        <div className="BridgeTool">
          <div className="Tablist">
            {console.log(location.pathname)}
            {tabs.map((tab, index) => (
              <h4
                key={index}
                className={`Tab ${
                  location.pathname === `/ProjectBridge/bridge-monitoring/${tab.path}` ? "specialActive" : ""
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
      </div>
    );
  }

  // 如果 `filterItems` 存在但没有数据
  if (
    (filterItems && filterItems.success === false) ||
    !filterItems ||
    filterItems.length === 0
  ) {
    return (
      <div className="MachineList">
        <div className="TopBar">
          <div className="Title">
            <MdAppSettingsAlt fontSize="1.5em" color="#E95098" />
            <h2>監控儀錶板</h2>
          </div>
          <div className="Title">
            <span
              style={{ cursor: "pointer", display: "flex" }}
              onClick={() => fetchBridges("timer")}
            >
              <IoMdRefreshCircle fontSize="1em" />
            </span>
            <p>更新時間：資料異常</p>
          </div>
        </div>
        <div className="noneData">
          <AiFillFileUnknown fontSize={100} />
          <h2>並未發現任何資料</h2>
        </div>
      </div>
    );
  }
}

export default MachineList;
