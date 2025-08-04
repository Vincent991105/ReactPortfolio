import { useContext } from "react";
import Sensor from "./Sensor";
import { AiFillFileUnknown } from "react-icons/ai";
import { useAuth } from "../context/AuthContext";
import { PopupContext } from '../context/PopupContext'
import { BridgeContext } from "../context/BridgeContext";

function MachineSensor() {

  const {changeEdit} = useContext(PopupContext)
  const { groupType } = useAuth();
  const { filterItems } = useContext(BridgeContext)

  const isData = filterItems.data.sensorList

  if (isData) {
    return (
      <div className="MachineSensor">
        {/* <div className="Title">
          <h3>橋梁感測器健康度列表：</h3>
          {groupType !== "CommonUser" && (
            <button
              className="AddSensor"
              onClick={() => changeEdit("sensor", "add")}
            >
              新增感測器
            </button>
          )}
        </div> */}
        <div className="SensorList">
          {isData && isData.length === 0 && (
            <div className="SensorUnknown">
              <AiFillFileUnknown fontSize={100} />
              <h2>並未發現任何感測器</h2>
            </div>
          )}
          <button
              className="AddSensor"
              onClick={() => changeEdit("sensor", "add")}
            >
              新增感測器
          </button>
          {isData.map((item) => {
            return (
              <Sensor
                key={item.id}
                sensorData={item}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default MachineSensor;
