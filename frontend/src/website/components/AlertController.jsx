import { BridgeContext } from "../context/BridgeContext";
import { useEffect, useContext } from "react";
import Sensor from "../components/Sensor";
import AlertSensor from "../components/AlertSensor";
import { AiFillAlert } from "react-icons/ai";
import { AiFillFileUnknown } from "react-icons/ai";
import { IoMdRefreshCircle } from "react-icons/io";

function AlertController(){

    const { dataTime, alertData, alertPoint, searchTerm, setSearchTerm, searchData, setSearchData, fetchalertData} = useContext(BridgeContext);

    useEffect(() => {
        const lowerCaseSearchTerm = searchTerm; // 中文搜尋不需要轉小寫

        const updatedAlertData = alertData?.data?.connectionErrors?.sensorList.map(item => {
            // 假設 alertPoint 是一個陣列，你可以根據 `item.bid` 找到對應的名稱
            const matchedAlertPoint = alertPoint.find(point => point.id === item.bid);
            // 如果找到對應的 alertPoint，將名稱加到 item 中
            if (matchedAlertPoint) {
            item.name = matchedAlertPoint.name;
            item.photoName = matchedAlertPoint.photoName;
            }
            return item;
        });

        const updatedHealthErrors = alertData?.data?.healthErrors?.sensorList.map(item => {
            const matchedAlertPoint = alertPoint.find(point => point.id === item.bid);
            if (matchedAlertPoint) {
            item.name = matchedAlertPoint.name;
            item.status = 0;
            }
            return item;
        });

        // 更新過濾後的資料
        setSearchData({
            connectionErrors: updatedAlertData?.filter((item) =>
            Object.values(item).some((value) =>
                String(value).includes(lowerCaseSearchTerm) // 中文搜尋
            )
            ),
            healthErrors: updatedHealthErrors?.filter((item) =>
            Object.values(item).some((value) =>
                String(value).includes(lowerCaseSearchTerm) // 中文搜尋
            )
            ),
        });
    }, [searchTerm, alertData, alertPoint]);  // 依賴 alertPoint 變動


    return(
        <div className="SensorAlert">
          <div className="TopBar">
            <div className="Title">
              <AiFillAlert fontSize="1.5em"/>
              <h2>異常監控平台</h2>
            </div>
            <div className="Title">
              <span style={{cursor:'pointer', display:'flex'}} onClick={() => fetchalertData()}><IoMdRefreshCircle fontSize="1em" /></span>
              <p>更新時間：{dataTime}</p>
            </div>
          </div>
          <div className="searchBar">
            <h4>搜尋：</h4>
            <input type="text" id="search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="輸入搜尋關鍵字" />
          </div>
          <div className="ComponentTypeA">
            <div className="Title">
              <h3>連線異常清單</h3>
              {/* <button>ICON</button> */}
            </div>
            <div className="List">
            {searchData?.connectionErrors?.length > 0 ? (
              <>
                {searchData?.connectionErrors
                  ?.filter(point => point.name) // 只保留有 name 屬性的項目
                  .map((point, index) => (
                    <AlertSensor key={index} sensorData={point} />
                  ))}
              </>
            ):(
              <div className="noneData">
                <AiFillFileUnknown fontSize={100} />
                <h2>未發現任何資料</h2>
              </div>
            )}
            </div>
          </div>
          <div className="ComponentTypeA">
            <div className="Title">
              <h3>健康度異常清單</h3>
              {/* <button>ICON</button> */}
            </div>
            <div className="List">
            {searchData?.healthErrors?.length > 0 ? (
              <>
                {searchData?.healthErrors
                  ?.filter(point => point.name) // 只保留有 name 的項目
                  .map((point, index) => (
                    <Sensor key={index} sensorData={point} />
                  ))}
              </>
            ):(
                <div className="noneData">
                  <AiFillFileUnknown fontSize={100} />
                  <h2>未發現任何資料</h2>
                </div>
              )}
            </div>
          </div>
        </div>
    )
}

export default AlertController