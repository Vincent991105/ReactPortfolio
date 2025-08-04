import { Gauge } from "@mui/x-charts";

function MachineDisaster(){
    return <div className="MachineDisaster">
        <div className="EarthQucik">
            <h3>最新地震資訊</h3>
            <Gauge width={200} height={80} value={60} startAngle={-90} endAngle={90} />
            <div className="InfoBar">
                <div className="Info">
                    <div className="DisasterRank">
                        <p>芮氏規模</p>
                        <h4>5.2</h4>
                    </div>
                    <div className="data">
                        <h4>編號：123456</h4>
                        <p>時間：2024/11/25 14:09</p>
                    </div>
                </div>
                <button>震央</button>
            </div>
        </div>
        <div className="Typhoon">
            <h3>最新颱風資訊</h3>
            <Gauge width={200} height={80} value={60} startAngle={-90} endAngle={90} />
            <div className="Info">
                <div className="DisasterRank">
                    <p>颱風規模</p>
                    <h4>S</h4>
                </div>
                <div className="data">
                    <h4>山陀兒</h4>
                    <p>開始時間：2024/03/21 06:83:01</p>
                    <p>結束時間：2024/03/21 06:83:01</p>
                </div>
            </div>
        </div>
    </div>
}

export default MachineDisaster;