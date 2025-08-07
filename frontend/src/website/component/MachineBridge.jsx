import { IoSettings } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import  CustomTooltip  from "./common/CustomTooltip";
import { useNavigate } from "react-router-dom";
import './css/MachineBridge.css'
import { useDispatch, useSelector } from "react-redux";
import { selectSensor } from "../store/BridgeSlice";

function MachineBridge({ filterItems, sensorPoint }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { sensorData } = useSelector((state) => state.ProjectBridgeData);

  const getBackgroundColor = (id, connect, latestHealth) => {
    if (id === sensorData.id) return "#00FF00"; // 被選擇的點顯示亮綠色
    if (connect === 2 || !latestHealth) {
      return "#FF6347";
    } else if (connect === 1) {
      return "#FFD700";
    } else {
      return "#9DCD7B";
    }
  };

  return (
    <div className="MachineBridge">
      <div className="SubTitle">
        <div className="Main">
          <CustomTooltip title="編輯橋梁" placement="left">
            <span>
              <IoSettings
                className="iconButton"
                onClick={() => navigate("/ProjectBridge/edit-bridge")}
              />
            </span>
          </CustomTooltip>
          <h3
            onClick={() => navigate("/bridge-monitoring/data-result")}
            style={{ cursor: "pointer" }}
          >
            (ID：{filterItems.id}) {filterItems.name}
          </h3>
        </div>
          <CustomTooltip title="刪除橋梁" placement="left">
            <span>
              <MdDelete
                className="iconButton"
                style={{ color: "rgb(255, 59, 59)" }}
                onClick={() => deleteBridge(filterItems.id)}
              />
            </span>
          </CustomTooltip>
      </div>
      <div className="ImgBox">
        <img
          src={filterItems.photoName 
          ? `/image/bridge/${filterItems.photoName}?version=${Math.floor(Math.random() * 100000)}`
          : filterItems.base64}
          alt={`橋梁 ${filterItems.name}`}
        />
        {sensorPoint &&
          sensorPoint.map((formData) => (
            <div
              key={formData.id} // 唯一鍵
              className="point"
              style={{
                left: `${Math.max(
                  0,
                  Math.min(100, formData.imageCoordinate.x)
                )}%`,
                top: `${Math.max(
                  0,
                  Math.min(100, formData.imageCoordinate.y + 6)
                )}%`,
                backgroundColor: getBackgroundColor(
                  formData.id,
                  formData.status,
                  formData.latestHealth
                ), // 根據點擊狀態設置顏色
                position: "absolute",
              }}
              id={formData.id}
              onClick={() => dispatch(selectSensor(formData.id))} // 綁定點擊事件
            ></div>
          ))}
      </div>
    </div>
  );
}

export default MachineBridge;
