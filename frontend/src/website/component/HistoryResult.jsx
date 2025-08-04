import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHistoryData } from "../store/BridgeSlice";
import DataSet from "./common/DataSet";
import './css/HistoryResult.css'
import UnknownData from "./common/UnknownData";

function HistoryResult({type}) {

    const dispatch = useDispatch();
    const{data, historyData} = useSelector((state) => state.ProjectBridgeData);

    const [resultDate, setResultDate] = useState({
        start: dayjs().subtract(30, "day").format("YYYY-MM-DD"),
        end: dayjs().subtract(1, "day").format("YYYY-MM-DD"),
    });

    const handleDateChange = (e) => {
        const { name, value } = e.target;
        setResultDate((prev) => ({
        ...prev,
        [name]: value, // 動態更新 start 或 end
        }));
    };

    const clickDateChange = (data) => {
        setResultDate({
          start: dayjs().subtract(data, "day").format("YYYY-MM-DD"),
          end: dayjs().subtract(1, "day").format("YYYY-MM-DD"),
        });
    };

    useEffect(() => {
        dispatch(getHistoryData(resultDate))
    },[data,resultDate])

    const [lineActive, setlineActive] = useState({
        q1: true,
        q2: true,
        q3: true,
        fitCurve: true,
    });

    const activeButton = (key) => {
        setlineActive((prev) => ({
        ...prev,
        [key]: !prev[key], // 切換指定數據線的狀態
        }));
    };

    return(
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
                <span onClick={() => clickDateChange(2)}>前1天</span>
                <span onClick={() => clickDateChange(31)}>前30天</span>
                <span onClick={() => clickDateChange(366)}>前365天</span>
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
            {!historyData ? (<UnknownData text='目前並無相關數據資料'/>) : (
                <div className="DataList">
                    {historyData?.result?.map((chartdata, index) => (
                        <DataSet
                        lineActive={lineActive}
                        // openChart={openChart}
                        key={index}
                        type={chartdata.title}
                        time={historyData.time}
                        q1={chartdata.Q1}
                        q2={chartdata.Q2}
                        q3={chartdata.Q3}
                        fitCurve={chartdata.fitCurve}
                        value={chartdata.latestData}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default HistoryResult