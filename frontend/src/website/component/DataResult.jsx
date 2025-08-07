import { useState } from "react";
import DataSet from "./common/DataSet";
import { useSelector } from "react-redux";
import './css/DataResult.css'
import UnknownData from "./common/UnknownData";

function DataResult({type}){

    const{realTimeData} = useSelector((state) => state.ProjectBridgeData)
    const [filterButton, setFilterButton] = useState('minute')

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

    if(!realTimeData){
        return(
            <UnknownData text='目前並無相關數據資料'/>
        )
    }

    return(
        <div className="DataResult">
            <div className="Filter">
                <div className="TabSet">
                    <h4
                        id="minute"
                        className={
                        filterButton === "minute" ? "specialActive" : "specialInactive"
                        }
                        onClick={() => setFilterButton("minute")}
                    >
                        分鐘
                    </h4>
                    <h4
                        id="hour"
                        className={
                        filterButton === "hour" ? "specialActive" : "specialInactive"
                        }
                        onClick={() => setFilterButton("hour")}
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
            <div className="DataList">
                {realTimeData[filterButton].result.map((chartdata, index) => (
                    <DataSet
                    lineActive={lineActive}
                    // openChart={openChart}
                    key={index}
                    type={chartdata.title}
                    time={realTimeData[filterButton].time}
                    q1={chartdata.Q1}
                    q2={chartdata.Q2}
                    q3={chartdata.Q3}
                    value={chartdata.latestData}
                    />
                ))}
            </div>
            {/* <ResultChart type="dataResult" /> */}
        </div>
    )
}

export default DataResult