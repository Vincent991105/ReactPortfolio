import { useDispatch, useSelector } from "react-redux";
import MachineBridge from "../component/MachineBridge";
import WeatherList from "../component/WeatherList";
import { handleToggle } from "../store/BridgeSlice";
import { MdAppSettingsAlt } from "react-icons/md";
import { IoMdRefreshCircle } from "react-icons/io";
import { Gauge, gaugeClasses } from "@mui/x-charts";
import DisasterComponents from "../component/DisasterComponents";
import './css/BridgeMonitoring.css'
import TabContent from "../component/TabContent";

function BridgeMonitoring(){

    const dispatch = useDispatch();
    const { data, earthSelect } = useSelector((state) => state.ProjectBridgeData);

    // 用於判斷當前路由與每個 tab 的對應關係
    const tabs = [
        { path: "sensor-list", label: "感測器列表" },
        { path: "data-result", label: "數據報表" },
        { path: "history-result", label: "歷史趨勢" },
        // { path: "/bridge-monitoring/earthquake-result", label: "地震資訊" },
        // { path: "/bridge-monitoring/typhoon-result", label: "颱風資訊" },
        // { path: "/bridge-monitoring/surveillance-images", label: "監視影像" },
    ];

    return(
        <div className="BridgeMonitoring">
            {/* 功能標籤 */}
            <div className="TopBar">
                <div className="Title">
                    <MdAppSettingsAlt fontSize="1.5em" />
                <   h2>監控儀錶板</h2>
                </div>
                <div className="Title">
                    <span
                        style={{ cursor: "pointer", display: "flex" }}
                        onClick={() => fetchBridges("timer")}
                    >
                        <IoMdRefreshCircle fontSize="1em" />
                    </span>
                    <p>更新時間：2024/03/21 15:31</p>
                </div>
            </div>
            {/* 橋梁資料顯示 - 需要調整CSS */}
            <div className="MachineTable">
                <MachineBridge filterItems={data} />
                <div className="TableColumn">
                    <WeatherList filterItems={data}/>
                    <div className="BridgeHealthy">
                        <Gauge
                        // width={200}
                        height={75}
                        value={data.latestHealth ?? 0}
                        startAngle={-90}
                        endAngle={90}
                        sx={(theme) => ({
                            [`& .${gaugeClasses.valueText}`]: {
                            fontSize: 18,
                            },
                            [`& .${gaugeClasses.valueArc}`]: {
                            fill:
                                data.latestHealth <= 30
                                ? "#FF6347" // 红色
                                : data.latestHealth <= 70
                                ? "#FFD700" // 黄色
                                : "#9DCD7B", // 绿色
                            },
                            [`& .${gaugeClasses.referenceArc}`]: {
                            fill: theme.palette.text.disabled,
                            },
                        })}
                        />
                        <h4>{data.latestHealth ? '橋梁健康度' : '尚無資料'}</h4>
                    </div>
                </div>
            </div>
            {/* 顯示地震資料 */}
            {data.earthquake || data.typhoon ? (
                <div className="NewsDisaster">
                    {data.earthquake && (
                        <DisasterComponents
                            type="earthquake"
                            isData={data.earthquake}
                            isSelected={earthSelect?.id === data.earthquake.id}
                            onToggle={(data) => dispatch(handleToggle(data))}
                        />
                    )}
                    {data.typhoon && (
                        <DisasterComponents
                            type="typhoon"
                            isData={data.typhoon}
                        />
                    )}
                </div>
            ) : null}
            <TabContent tabs={tabs}/>
        </div>
    )
}

export default BridgeMonitoring