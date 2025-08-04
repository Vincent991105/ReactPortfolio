import Sensor from "./common/Sensor";
import { useSelector } from "react-redux";
import UnknownData from "./common/UnknownData";
import './css/MachineSensor.css'

function MachineSensor() {

  const { data } = useSelector((state) => state.ProjectBridgeData);

  if(!data){
    return(<UnknownData />)
  }

  return(
    <div className="MachineSensor">
      <button
          className="AddSensor"
          // onClick={() => changeEdit("sensor", "add")}
        >
          新增感測器
      </button>
      {data.sensorList.map((item) => {
        return (
          <Sensor
            key={item.id}
            sensorData={item}
          />
        );
      })}
    </div>
  )
  

}

export default MachineSensor;
