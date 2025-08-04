import { useContext, useState, useEffect } from "react";
import DataSet from "./DataSet";
import ResultChart from "./ResultChart";
import { BridgeContext } from "../context/BridgeContext";
import { ResultContext } from "../context/ResultContext";
import { AiFillFileUnknown } from "react-icons/ai";
import LinearProgress from "@mui/material/LinearProgress";
import { BasicContext } from "../context/BasicContext";

function HistoryResult({ type }) {
  const { isMobile } = useContext(BasicContext);
  const { select } = useContext(BridgeContext);

  const {
    selectChart, //OK
    openChart,
    lineActive, //OK
    activeButton, //OK
    TrendData, //OK
    historyLoading,
    resultDate,
    handleDateChange,
    clickDateChange,
    setResultType,
    historyTrendUrl,
  } = useContext(ResultContext);

  //Update result type (whole structure / sensor)
  console.log("History Result Type", type);
  useEffect(() => {
    setResultType(type);
  }, [type]);

  // 自動更新
  useEffect(() => {
    const intervalFilterItems = setInterval(async () => {
      if (select) {
        await fetchHistoryTrend({
          bridge: select.bridge,
          sensor: select.sensor,
          //start: resultDate.start,
          //end: resultDate.end,
          url: historyTrendUrl,
        }); // 异步调用
      }
    }, 60000);

    return () => clearInterval(intervalFilterItems); // 清理定时器
  }, [select, historyTrendUrl]);

  return (
    <div className="HistoryResult">
      <div className="Filter">
        <div className="DateFilter">
          <input
            type="date"
            id="start"
            name="start"
            value={resultDate.start}
            onChange={handleDateChange}
          />
          ~
          <input
            type="date"
            id="end"
            name="end"
            value={resultDate.end}
            onChange={handleDateChange}
          />
          {!isMobile && (
            <>
              <span onClick={() => clickDateChange(2)}>前1天</span>
              <span onClick={() => clickDateChange(31)}>前30天</span>
              <span onClick={() => clickDateChange(366)}>前365天</span>
            </>
          )}
        </div>
        <div className="TabSet">
          <h4 className="specialActive" style={{ cursor: "auto" }}>
            傾斜值 : {TrendData?.data?.result?.[0]?.slope ?? "無數據"}
          </h4>
        </div>
        {/* <div className="TabSet">
  return (
    <div className="HistoryResult">
      <div className="Filter">
        <div className="DateFilter">
          <input
            type="date"
            id="start"
            name="start"
            value={resultDate.start}
            onChange={handleDateChange}
          />
          ~
          <input
            type="date"
            id="end"
            name="end"
            value={resultDate.end}
            onChange={handleDateChange}
          />
          {!isMobile && (
            <>
              <span onClick={() => clickDateChange(2)}>前1天</span>
              <span onClick={() => clickDateChange(31)}>前30天</span>
              <span onClick={() => clickDateChange(366)}>前365天</span>
            </>
          )}
        </div>
        <div className="TabSet">
          <h4 className="specialActive">
            傾斜值 : {TrendData?.data?.result?.[0]?.slope ?? "無數據"}
          </h4>
        </div>
        {/* <div className="TabSet">
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
            </div> */}
      </div>
      {historyLoading && (
        <div
          style={{
            margin: "auto",
            width: "100%",
          }}
        >
          <LinearProgress />
        </div>
      )}

      {(!TrendData || !TrendData.success) && (
        <div className="DataList">
          <div className="noneData">
            <AiFillFileUnknown fontSize={100} />
            <h2>未發現任何資料</h2>
          </div>
        </div>
      )}

      {TrendData?.success && (
        <div className="DataList">
          {TrendData?.data?.result?.map((chartdata, index) => (
            <DataSet
              lineActive={lineActive}
              openChart={openChart}
              key={index}
              type={chartdata.title}
              time={TrendData.data.time}
              q1={chartdata.Q1}
              q2={chartdata.Q2}
              q3={chartdata.Q3}
              fitCurve={chartdata.fitCurve}
              value={chartdata.latestData}
            />
          ))}
        </div>
      )}

      {selectChart && <ResultChart type="HistoryResult" />}
    </div>
  );
}

export default HistoryResult;
