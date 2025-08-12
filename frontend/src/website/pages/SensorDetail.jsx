import { useState } from "react";
import { FaClipboardList } from "react-icons/fa";
import MachineBridge from "../component/MachineBridge";
import { IoMdRefreshCircle } from "react-icons/io";
import './css/SensorDetail.css'
import { useSelector } from "react-redux";
import TabContent from "../component/TabContent";
import { MdOutlineSensors } from "react-icons/md";

function SensorDetail() {
  // 用於判斷當前路由與每個 tab 的對應關係
  const tabs = [
    { path: "data-result", label: "數據報表" },
    { path: "history-result", label: "歷史趨勢" },
    // { path: "earthquake-result", label: "地震資訊" },
    // { path: "typhoon-result", label: "颱風資訊" },
  ];

  const { data, sensorData } = useSelector((state) => state.ProjectBridgeData);

  const statusColor =
    sensorData?.status === 0 && sensorData?.latestHealth
      ? { backgroundColor: "#9DCD7B", color: "#FFF" }
      : sensorData?.status === 1 && sensorData?.latestHealth
      ? { backgroundColor: "#FFD700", color: "#FFF" }
      : { backgroundColor: "#FF6347", color: "#FFF" };

  return (
    <div className="SensorDetail" >
      <div className="TopBar">
        <div className="Title">
          <FaClipboardList fontSize="1.5em" />
          <h2>即時報表</h2>
        </div>
        <div className="Title">
          <span style={{cursor:'pointer', display:'flex'}} onClick={() => selectSensor(select.sensor,select.bridge)}><IoMdRefreshCircle fontSize="1em" /></span>
          <p>更新時間：2025/08/06</p>
        </div>
      </div>
      <div className="MachineTable">
        <MachineBridge filterItems={data} sensorPoint={data.sensorList}/>
        <div className="TableColumn">
          <div className="CommonData">
            <h3>橋梁基本資料</h3>
            <h4>{data.name || "未提供名稱"}</h4>
            <p>
              {data.city}
              {data.district}
            </p>
            <p>經度：{data.latitude}</p>
            <p>緯度：{data.longitude}</p>
          </div>
          {sensorData ? (
            <div className="SensorCommonData" style={statusColor}>
              <MdOutlineSensors color="black" size={30} />
              <h3>{sensorData.detailedLocation}_{sensorData.sensorLocation}</h3>
              
              {/* 優化 status 處理邏輯 */}
              <h4>
                {(() => {
                  switch (sensorData.status) {
                    case 0:
                      return "連線正常";
                    case 1:
                      return "連線延遲(超過10分鐘)";
                    default:
                      return "連線中斷(超過60分鐘)";
                  }
                })()}
              </h4>
            </div>
          ) : (
            <div className="SensorCommonData">
              <h3>目前尚無資料</h3>
            </div>
          )}
        </div>
      </div>
      <TabContent tabs={tabs}/>
    </div>
  );
}

export default SensorDetail;
