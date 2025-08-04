import { useState, useRef, useEffect, useContext } from "react";
import { AiFillFileUnknown } from "react-icons/ai";
import DisasterComponents from "./DisasterComponents";
import DisasterTable from "./DisasterTable";
import { DisasterContext } from "../context/DisasterContext";
import LinearProgress from "@mui/material/LinearProgress";
import { BridgeContext } from "../context/BridgeContext";

function DisasterList({ type, dataType }) {
  const {
    disasterLoading,
    selectedId,
    handleToggle,
    fetchDisasterData,
    earthData,
    callEarthData,
    typhoonData,
    callTyphoonData,
  } = useContext(DisasterContext);
  const { select, selectSensorData } = useContext(BridgeContext);

  const [selectDisaster, setDisaster] = useState(null);
  const chooseDisaster = (data) => {
    setDisaster(data);
    if (data) {
      if (type === "earthquake") {
        fetchDisasterData({
          type: type,
          bridge: data.bid,
          sensor: data.sensor,
          start: data.originTime,
          end: data.endTime,
        });
      } else {
        fetchDisasterData({
          type: type,
          bridge: data.bid,
          sensor: data.sensor,
          start: data.seaStartDatetime,
          end: data.seaEndDatetime,
        });
      }
    }
  };

  useEffect(() => {
    if (type === "earthquake") {
      callEarthData(select, dataType);
    }
    if (type === "typhoon") {
      callTyphoonData(select, dataType);
    }
  }, [select, type, dataType]);

  const isData = type === "earthquake" ? earthData : typhoonData;

  const [visibleCount, setVisibleCount] = useState(20); // 初始顯示 10 筆
  const [searchTerm, setSearchTerm] = useState(""); // 搜尋文字
  const [filteredData, setFilteredData] = useState(
    type === "earthquake" ? earthData : typhoonData
  ); // 過濾後的資料
  const scrollRef = useRef(null); // 用於監聽滾動事件的容器

  const handleScroll = () => {
    const scrollArea = scrollRef.current;
    if (
      scrollArea.scrollTop + scrollArea.clientHeight >=
      scrollArea.scrollHeight - 5
    ) {
      setVisibleCount((prevCount) =>
        Math.min(prevCount + 20, filteredData.length)
      ); // 每次加載 10 筆
    }
  };

  useEffect(() => {
    const scrollArea = scrollRef.current;
    if (scrollArea) {
      scrollArea.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollArea) {
        scrollArea.removeEventListener("scroll", handleScroll);
      }
    };
  }, [filteredData]); // 滾動監聽應該根據過濾後的資料變更

  useEffect(() => {
    const handleResize = () => {
      const scrollArea = scrollRef.current;
      if (scrollArea) {
        handleScroll(); // 檢查縮放後是否需要加載更多資料
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    if (!isData) return;
    setFilteredData(
      isData.filter((item) =>
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(lowerCaseSearchTerm)
        )
      )
    );
    setVisibleCount(10); // 搜尋時重置顯示數量
  }, [searchTerm, isData]);

  if (disasterLoading) {
    return (
      <div className="DisasterList">
        <div
          style={{
            margin: "auto",
            width: "100%",
          }}
        >
          <LinearProgress />
        </div>
      </div>
    );
  } else {
    return (
      <div className="DisasterList">
        <div className="searchBar">
          <h4>搜尋：</h4>
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="輸入搜尋關鍵字"
          />
          <p>(目前顯示：{filteredData.length} 筆資料)</p>
        </div>
        {filteredData.length > 0 && (
          <div className="ScrollArea" ref={scrollRef}>
            <div className="List">
              {filteredData.slice(0, visibleCount).map((item) => (
                <DisasterComponents
                  key={item.id}
                  type={type}
                  isData={item}
                  isSelected={selectedId === item.id}
                  onToggle={handleToggle}
                  chooseDisaster={chooseDisaster}
                  healthlimit={{
                    alert: selectSensorData[0].healthAlertIndex,
                    move: selectSensorData[0].healthMoveIndex,
                  }}
                />
              ))}
            </div>
          </div>
        )}
        {filteredData.length === 0 && (
          <div className="DisasterList">
            <div className="noneData">
              <AiFillFileUnknown fontSize={100} />
              <h2>未發現任何資料</h2>
            </div>
          </div>
        )}
        {selectDisaster && (
          <DisasterTable
            selectDisaster={selectDisaster}
            chooseDisaster={chooseDisaster}
          />
        )}
      </div>
    );
  }
}

export default DisasterList;
