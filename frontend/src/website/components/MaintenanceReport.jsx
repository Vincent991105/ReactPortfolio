import { useContext, useEffect } from "react";
import { PopupContext } from "../context/PopupContext";
import { RecordContext } from "../context/RecordContext";

function MaintenanceReport({ id }) {
  const { repairData } = useContext(RecordContext);
  const { changeEdit } = useContext(PopupContext);

  const filterData = repairData.filter((item) => item.id === id);

  if (filterData.length > 0) {
    {
      console.log(filterData);
    }
    return (
      <div className="MaintenanceChart">
        <div className="ModalContent" style={{ minHeight: "unset" }}>
          <div className="title">
            <div style={{ display: "flex", gap: "10px" }}>
              <h2>維修紀錄 - {filterData[0].id}</h2>
              {filterData[0].link && (
                <button
                  onClick={() => window.open(filterData[0].link, "_blank")}
                >
                  查看報告
                </button>
              )}
            </div>
            <button className="close-button" onClick={() => changeEdit("")}>
              ×
            </button>
          </div>
          <div className="infoData">
            <h4>建物名稱：{filterData[0].bridgeName}</h4>
            <h4>維修項目：{filterData[0].task}</h4>
            <h4>維修時間：{filterData[0].time}</h4>
            <h4>維修結果：{filterData[0].result}</h4>
            {filterData[0].image && (
              <>
                <h4>橋檢圖像：</h4>
                <img src={filterData[0].image.base64} alt="maintenance_img" />
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default MaintenanceReport;
