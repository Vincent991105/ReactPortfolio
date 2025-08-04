import { HiPhoto } from "react-icons/hi2";
import { PopupContext } from "../context/PopupContext";
import { useContext } from "react";

function AlertSensor({sensorData}){

    const{ setselectError } = useContext(PopupContext)

    return <div className="AlertSensor">
        <div className="data">
            <p>橋梁名稱：{sensorData ? sensorData.name : '已刪除橋梁' }</p>
            <h4>感測器位置：{sensorData.detailedLocation}</h4>
        </div>
        <HiPhoto size={40} color="white" onClick={() => setselectError(sensorData)}/>
    </div>
}

export default AlertSensor;