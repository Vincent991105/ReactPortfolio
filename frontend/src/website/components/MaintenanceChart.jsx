import { useContext, useEffect } from "react";
import { PopupContext } from "../context/PopupContext";
import { RecordContext } from "../context/RecordContext";

function MaintenanceChart({id}){

    const { maintenanceData } = useContext(RecordContext);
    const { changeEdit } = useContext(PopupContext);

    const filterData = maintenanceData.filter(item => item.id === id)

    const urgentMap = {
        0: {text:'急', color:'rgb(112 171 67)'},
        1: {text:'緊急', color:'orange'},
        2: {text:'非常緊急', color:'rgb(255, 59, 59)'},
    };

    if(filterData.length > 0){
        {console.log(filterData)}
        return(
            <div className="MaintenanceChart">
                <div className="ModalContent" style={{minHeight:'unset'}}>
                    <div className="title">
                        <div style={{display:'flex', gap:'10px'}}>
                            <h2>橋檢紀錄 - {filterData[0].id}</h2>
                            {filterData[0].link && (<button onClick={() => window.open(filterData[0].link , '_blank')}>查看報告</button>)}
                        </div>
                        <button className="close-button" onClick={() => changeEdit('')}>×</button>
                    </div>
                    <div className="infoData">
                        <h4>建物名稱：{filterData[0].bridgeName}</h4>
                        <h4>緊急程度：<span style={{color:urgentMap[filterData[0].urgent].color}}>{urgentMap[filterData[0].urgent].text}</span></h4>
                        <h4>橋檢類型：{filterData[0].type}</h4>
                        <h4>橋檢備註：{filterData[0].task}</h4>
                        <h4>橋檢時間：{filterData[0].time}</h4>
                        <h4>橋檢完成說明：{filterData[0].result}</h4>
                        {filterData[0].image && (<><h4>橋檢圖像：</h4><img src={filterData[0].image.base64} alt="maintenance_img"/></>)}
                    </div>
                </div>
            </div>
        )
    }
}

export default MaintenanceChart