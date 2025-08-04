import { MdCloudySnowing } from "react-icons/md";
import { RiTempColdFill } from "react-icons/ri";
import { FaWind } from "react-icons/fa6";
import { TbWindsockFilled } from "react-icons/tb";
import './css/WeatherList.css'

function WeatherList({filterItems}) {

  console.log(filterItems)

  return (
    <div className="WeatherList">
      <div className="WeatherData">
        <MdCloudySnowing size={40} color="var(--color-Header)" />
        <div className="Data">
          <h4>雨量</h4>
          <p>{filterItems.weather.latestPrecipitation ?? '-'} ml</p>
        </div>
      </div>
      <div className="WeatherData">
        <RiTempColdFill size={40} color="var(--color-Header)" />
        <div className="Data">
          <h4>溫度</h4>
          <p>{filterItems.weather.latestTemperature ?? '-'} °C</p>
        </div>
      </div>
      <div className="WeatherData">
        <FaWind size={32} color="var(--color-Header)" />
        <div className="Data">
          <h4>風速</h4>
          <p>{filterItems.weather.latestWindSpeed ?? '-'} m/s</p>
        </div>
      </div>
      <div className="WeatherData">
        <TbWindsockFilled size={40} color="var(--color-Header)" />
        <div className="Data">
          <h4>風向</h4>
          <p>{filterItems.weather.latestWindDirection ?? '-'} °</p>
        </div>
      </div>
    </div>
  );
}

export default WeatherList;
