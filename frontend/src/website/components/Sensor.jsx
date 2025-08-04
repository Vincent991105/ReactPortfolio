import { IoSettings } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { useContext } from "react";
import { BridgeContext } from "../context/BridgeContext";
import { useAuth } from "../context/AuthContext";
import { CustomTooltip } from "./FloatingMenu";
import { PopupContext } from "../context/PopupContext";
import { useNavigate } from "react-router-dom";
import dayjs from 'dayjs';
import { RecordContext } from "../context/RecordContext";
import MuiTooltip from "@mui/material/Tooltip";

function Sensor({ sensorData }) {
  const { select, selectSensor, deleteSensor, filterItems } = useContext(BridgeContext);
  const { addMaintenanceData } = useContext(RecordContext);
  const { changeEdit } = useContext(PopupContext);
  const { groupType } = useAuth();

  const navigate = useNavigate();

  const checkSensor = (data, bridge) => {
    selectSensor(data, bridge ? bridge : select.bridge);
    navigate("/ProjectBridge/sensor-monitoring/data-result");
  };

  const handleSubmit = () => {

    console.log(filterItems)

    const data = {
        bridgeName: filterItems.data.bridge.name,
        urgent: 1,
        type:'特殊橋檢',
        createTime: dayjs().format('YYYY-MM-DD HH:mm'),
        task: `感測器 ${sensorData.detailedLocation} 發現連線異常`,
        time:null,
        result:null,
        link:null,
        image:null, 
    }

    if(data.bridgeName && data.task){
        console.log(data)
        addMaintenanceData(data)
        alert('新增橋檢任務完成')
        navigate('/maintenance-Record')
    }else{
        alert('沒有完成表單無法送出內容')
    }
  }

  return (
    <>
      <div className="Sensor">
        <div className="InfoBar">
          <div className="SubTitle">
            <div className="Main">
              {groupType !== "CommonUser" && (
                <CustomTooltip title="編輯感測器" placement="top">
                  <span>
                    <IoSettings
                      className="iconButton"
                      onClick={() => changeEdit("sensor", "edit", sensorData)}
                    />
                  </span>
                </CustomTooltip>
              )}
              <h4>{sensorData.detailedLocation}</h4>
            </div>
            {groupType !== "CommonUser" && (
              <CustomTooltip title="編輯感測器" placement="top">
                <span>
                  <MdDelete
                    className="iconButton"
                    style={{ color: "rgb(255, 59, 59)" }}
                    onClick={() =>
                      deleteSensor({
                        bridge: select.bridge,
                        sensor: sensorData.id,
                      })
                    }
                  />
                </span>
              </CustomTooltip>
            )}
          </div>
          {sensorData.status === 0 && sensorData.latestHealth ? (
            <div
              className="Data"
              style={{
                backgroundColor:
                  sensorData.latestHealth > sensorData.healthAlertIndex
                    ? "#9DCD7B"
                    : sensorData.latestHealth > sensorData.healthMoveIndex
                    ? "#FFD700"
                    : "#FF6347",
              }}
            >
              健康度：{sensorData.latestHealth}%
            </div>
          ) : (
            <MuiTooltip 
              title='新增橋檢任務' 
              arrow 
              placement="top" 
              slotProps={{
                tooltip: {
                  sx: {
                    fontSize: "1em",
                  },
                },
              }}
            >
              <div
                className="Data"
                style={{
                  backgroundColor: "rgb(255, 59, 59)",
                  color: "white",
                  cursor: 'pointer',
                }}
                onClick={() => handleSubmit()}
              >
                感測器異常
              </div>
            </MuiTooltip>
          )}
        </div>
        <button onClick={() => checkSensor(sensorData.id, sensorData.bid)}>
          細節
        </button>
      </div>
    </>
  );
}

export default Sensor;
