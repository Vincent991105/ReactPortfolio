import { useContext, useEffect } from "react";
import DataSet from "./DataSet";
import ResultChart from "./ResultChart";
import { ResultContext } from "../context/ResultContext";
import LinearProgress from "@mui/material/LinearProgress";
import { AiFillFileUnknown } from "react-icons/ai";

function DataResult({ type }) {
  const {
    resultTab, //OK
    changeResultTab, //OK
    selectChart, //OK
    openChart,
    lineActive, //OK
    activeButton, //OK
    historyData, //OK
    newData,
    // historyLoading,
    setResultType,
  } = useContext(ResultContext);

  // // 自動更新
  // useEffect(() => {
  //     const intervalFilterItems = setInterval(async () => {
  //         if (select) {
  //             await fetchSensorHistory(select); // 异步调用
  //         }
  //     }, 60000);

  //     return () => clearInterval(intervalFilterItems); // 清理定时器
  // }, [select]);

  useEffect(() => {
    setResultType(type);
  }, [type]);

  return (
    <div className="DataResult">
      <div className="Filter">
        <div className="TabSet">
          <h4
            id="minute"
            className={
              resultTab === "minute" ? "specialActive" : "specialInactive"
            }
            onClick={() => changeResultTab("minute")}
          >
            分鐘
          </h4>
          <h4
            id="hour"
            className={
              resultTab === "hour" ? "specialActive" : "specialInactive"
            }
            onClick={() => changeResultTab("hour")}
          >
            小時
          </h4>
        </div>
        <div className="TabSet">
          <h4
            className={lineActive.q1 ? "specialActive" : "specialInactive"}
            onClick={() => activeButton("q1")}
          >
            {lineActive.q1 ? "隱藏 q1" : "顯示 q1"}
          </h4>
          <h4
            className={lineActive.q2 ? "specialActive" : "specialInactive"}
            onClick={() => activeButton("q2")}
          >
            {lineActive.q2 ? "隱藏 q2" : "顯示 q2"}
          </h4>
          <h4
            className={lineActive.q3 ? "specialActive" : "specialInactive"}
            onClick={() => activeButton("q3")}
          >
            {lineActive.q3 ? "隱藏 q3" : "顯示 q3"}
          </h4>
        </div>
      </div>

      {/* {historyLoading && (
        <div
          style={{
            margin: "auto",
            width: "100%",
          }}
        >
          <LinearProgress />
        </div>
      )} */}

      {newData && newData.time.length === 0 && (
        <div className="DataList">
          <div className="noneData">
            <AiFillFileUnknown fontSize={100} />
            <h2>未發現任何資料</h2>
          </div>
        </div>
      )}

      { historyData && newData && newData.time.length > 0 && (
        <div className="DataList">
          {newData.result.map((chartdata, index) => (
            <DataSet
              lineActive={lineActive}
              openChart={openChart}
              key={index}
              type={chartdata.title}
              time={newData.time}
              q1={chartdata.Q1}
              q2={chartdata.Q2}
              q3={chartdata.Q3}
              value={chartdata.latestData}
            />
          ))}
        </div>
      )}

      {selectChart && <ResultChart type="dataResult" />}
    </div>
  );
}

export default DataResult;
