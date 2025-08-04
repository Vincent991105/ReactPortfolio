import { MdCloudySnowing } from "react-icons/md";
import { RiTempColdFill } from "react-icons/ri";
import { FaWind } from "react-icons/fa6";
import { TbWindsockFilled } from "react-icons/tb";
import { useContext } from "react";
import { BridgeContext } from "../context/BridgeContext";

function WeatherList() {
  const { filterItems } = useContext(BridgeContext);

  return (
    <div className="WeatherList">
      <div className="WeatherData">
        <MdCloudySnowing size={40} color="var(--color-Header)" />
        <div className="Data">
          <h4>雨量</h4>
          <p>{filterItems.data.weather.latestPrecipitation} ml</p>
        </div>
      </div>
      <div className="WeatherData">
        <RiTempColdFill size={40} color="var(--color-Header)" />
        <div className="Data">
          <h4>溫度</h4>
          <p>{filterItems.data.weather.latestTemperature} °C</p>
        </div>
      </div>
      <div className="WeatherData">
        <FaWind size={32} color="var(--color-Header)" />
        <div className="Data">
          <h4>風速</h4>
          <p>{filterItems.data.weather.latestWindSpeed} m/s</p>
        </div>
      </div>
      <div className="WeatherData">
        <TbWindsockFilled size={40} color="var(--color-Header)" />
        <div className="Data">
          <h4>風向</h4>
          <p>{filterItems.data.weather.latestWindDirection} °</p>
        </div>
      </div>
    </div>
  );
}

export default WeatherList;
