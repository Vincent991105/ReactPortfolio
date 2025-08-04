function SensorTable({selectSensor}){
    return <div className="SensorTable">
        <div id="sensorNote" className="TableColumn">
            <div className="header">
                <h4>安裝位置</h4>
            </div>
            <p>{selectSensor.sensorNote}</p>
        </div>
        <div id="type" className="TableColumn">
            <div className="header">
                <h4>構件樣態</h4>
            </div>
            <p>{selectSensor.type}</p>
        </div>
        <div id="connect" className="TableColumn">
            <div className="header">
                <h4>連線狀況</h4>
            </div>
            <p>{selectSensor.connect}</p>
        </div>
        <div id="download" className="TableColumn">
            <div className="header">
                <h4>下載資料</h4>
            </div>
            <p>第二根柱子</p>
        </div>
    </div>
}

export default SensorTable;