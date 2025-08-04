import { IoSettings } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { CustomTooltip } from "../../components/FloatingMenu";
import { useNavigate } from "react-router-dom";
import dayjs from 'dayjs';
import MuiTooltip from "@mui/material/Tooltip";
import { useDispatch } from "react-redux";

function Sensor({ sensorData }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkSensor = (data) => {
    dispatch(selectSensor(data))
    navigate("/ProjectBridge/sensor-monitoring/data-result");
  };

  return (
    <>
      <div className="Sensor">
        <div className="InfoBar">
          <div className="SubTitle">
            <div className="Main">
              <CustomTooltip title="編輯感測器" placement="top">
                  <span>
                    <IoSettings
                      className="iconButton"
                      onClick={() => changeEdit("sensor", "edit", sensorData)}
                    />
                  </span>
                </CustomTooltip>
              <h4>{sensorData.detailedLocation}</h4>
            </div>
            <CustomTooltip title="刪除感測器" placement="top">
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
