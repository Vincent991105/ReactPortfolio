import { IoSettings } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { useContext } from "react";
import { BridgeContext } from "../context/BridgeContext";
import { useAuth } from "../context/AuthContext";
import { CustomTooltip } from "./FloatingMenu";
import { PopupContext } from "../context/PopupContext";
import { useNavigate } from "react-router-dom";

function MachineBridge({ filterItems, sensorPoint }) {
  const navigate = useNavigate();

  const { deleteBridge, selectSensor, select } = useContext(BridgeContext);
  const { changeEdit } = useContext(PopupContext);
  const { groupType } = useAuth();

  const getBackgroundColor = (id, connect, latestHealth) => {
    if (id === select.sensor) return "#00FF00"; // 被選擇的點顯示亮綠色
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
          {groupType !== "CommonUser" && (
            <CustomTooltip title="編輯橋梁" placement="left">
              <span>
                <IoSettings
                  className="iconButton"
                  onClick={() => navigate("/edit-bridge")}
                />
              </span>
            </CustomTooltip>
          )}
          <h3
            onClick={() => navigate("/bridge-monitoring/data-result")}
            style={{ cursor: "pointer" }}
          >
            (ID：{filterItems.id}) {filterItems.name}
          </h3>
        </div>
        {groupType !== "CommonUser" && (
          <CustomTooltip title="刪除橋梁" placement="left">
            <span>
              <MdDelete
                className="iconButton"
                style={{ color: "rgb(255, 59, 59)" }}
                onClick={() => deleteBridge(filterItems.id)}
              />
            </span>
          </CustomTooltip>
        )}
      </div>
      <div className="ImgBox">
        <img
          src={`/image/bridge/${filterItems.photoName}?version=${Math.floor(
            Math.random() * 100000
          )}`}
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
              onClick={() => selectSensor(formData.id, select.bridge)} // 綁定點擊事件
            ></div>
          ))}
      </div>
    </div>
  );
}

export default MachineBridge;
