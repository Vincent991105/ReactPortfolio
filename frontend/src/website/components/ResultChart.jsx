import DataSet from "./DataSet";
import { useContext, useEffect, useState } from "react";
import { ResultContext } from "../context/ResultContext";
import { AiFillFileUnknown } from "react-icons/ai";
import { BasicContext } from "../context/BasicContext";

function ResultChart({type}){

    const{isMobile} = useContext(BasicContext);
    
    const {
        resultTab,
        changeResultTab,
        selectChart,
        openChart,
        lineActive,
        activeButton,
        historyData,
        typeMapping,
        TrendData,
        resultDate,
        handleDateChange,
        clickDateChange
    } = useContext(ResultContext);
    
    const [newData , setNewData] = useState(null)
    const [selectData , setSelectData] = useState(null)

    useEffect(()=>{

    if(!historyData || !historyData.success){
        return
    }else{
        if(resultTab === 'minute'){
        setNewData(historyData.data.minutes)
        }else{
        setNewData(historyData.data.hours)
        }
    }

    },[historyData,resultTab])

    useEffect(() => {
        if(type ==='dataResult'){
            if(newData){
                setSelectData({data:newData.result.filter(i => i.title === selectChart),time:newData.time,weatherData:newData.weatherResult})
            }
        }else{
            if(TrendData){
                console.log(TrendData);
                setSelectData({data:TrendData.data.result.filter(i => i.title === selectChart), time:TrendData.data.time, weatherData:TrendData.data.weatherResult})
            }
        }
    },[newData,TrendData])

    useEffect(() => {console.log(selectData)},[selectData])

    return <div className="ResultChart">
        <div className="ModalContent">
            <div className="title">
                <h2>{typeMapping[selectChart].name}</h2>
                <button className="close-button" onClick={() => openChart(null)}>×</button>
            </div>
            <div className="Filter">
                {type === 'dataResult' ?
                    (<div className="TabSet">
                        <h4 id="minute" className={resultTab === 'minute' ? "specialActive" : "specialInactive"} onClick={() => changeResultTab("minute")} >分鐘</h4>
                        <h4 id="hour" className={resultTab === 'hour' ? "specialActive" : "specialInactive"} onClick={() => changeResultTab("hour")} >小時</h4>
                    </div>) :
                    (<div className="DateFilter">
                        <input type="date" id="start" name="start" value={resultDate.start} onChange={handleDateChange}/>~<input type="date" id="end" name="end" value={resultDate.end} onChange={handleDateChange}/>
                        {!isMobile && (<><span onClick={() => clickDateChange(1)}>前1天</span>
                        <span onClick={() => clickDateChange(30)}>前30天</span>
                        <span onClick={() => clickDateChange(365)}>前365天</span></>)}
                    </div>)}
                <div className="TabSet">
                    <h4 className={lineActive.q1 ? "specialActive" : "specialInactive"} onClick={() => activeButton("q1")} >{lineActive.q1 ? "隱藏 q1" : "顯示 q1"}</h4>
                    <h4 className={lineActive.q2 ? "specialActive" : "specialInactive"} onClick={() => activeButton("q2")} >{lineActive.q2 ? "隱藏 q2" : "顯示 q2"}</h4>
                    <h4 className={lineActive.q3 ? "specialActive" : "specialInactive"} onClick={() => activeButton("q3")} >{lineActive.q3 ? "隱藏 q3" : "顯示 q3"}</h4>
                </div>
            </div>
            {selectData?.time?.length > 0 && (
                <>
                <DataSet
                lineActive={lineActive}
                time={selectData.time}
                type={selectData.data[0].title}
                q1={selectData.data[0].Q1}
                q2={selectData.data[0].Q2}
                q3={selectData.data[0].Q3}
                value={selectData.data[0].latestData}
                />
                {selectData?.weatherData?.map((chartdata, index) => (
                    <DataSet
                    lineActive={lineActive}
                    key={chartdata.title}
                    type={chartdata.title}
                    time={selectData.time}
                    q1={chartdata.Q1}
                    q2={chartdata.Q2}
                    q3={chartdata.Q3}
                    value={chartdata.latestData}
                    />
                ))}
                </>
            )}
            {selectData?.time?.length === 0 && (
                <div className="DataList">
                    <div className="noneData" style={{height:'300px'}}>
                        <AiFillFileUnknown fontSize={100} />
                        <h2>未發現任何資料</h2>
                    </div>
                </div>
            )}
        </div>
    </div>
}

export default ResultChart;