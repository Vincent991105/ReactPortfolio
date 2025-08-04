import { useContext } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  ReferenceArea,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { BridgeContext } from "../context/BridgeContext";
import { ResultContext } from "../context/ResultContext";
import { min, max } from "lodash";
import MuiTooltip from "@mui/material/Tooltip";

function DataSet({ lineActive, openChart, type, q1, q2, q3, fitCurve, time, value }) {

  const{ selectSensorData } = useContext(BridgeContext)
  const { typeMapping, } = useContext(ResultContext);

  //Line chart data
  const data = time.map((t, index) => ({
    time: t, //XAxis data points
    //YAxis data points
    q1: q1[index],
    q2: q2[index],
    q3: q3[index],
    fitCurve: fitCurve && type === 'health' ? fitCurve[index] : null,
  }));

  const allValues = data.flatMap(d => [d.q1, d.q2, d.q3]);
  const yMin = parseFloat((min(allValues) * 0.95).toFixed(2)); 
  const yMax = parseFloat((max(allValues) * 1.05).toFixed(2));

  // 自定义 Tooltip 组件
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            borderRadius: "5px",
            padding: "10px",
            fontSize: "12px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <p style={{ margin: 0, fontWeight: "bold" }}>{`时间: ${label}`}</p>
          <div style={{ display: "flex", gap: "10px" }}>
            {payload.map((item, index) => (
              <p
                key={index}
                style={{ margin: 0, color: item.color }}
              >{`${item.name}: ${item.value}`}</p>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  // 判断数据格式
  const isMultiLineFormat =
    data.length > 0 && typeof data[0] === "object" && !data[0].data;

  // 动态生成 Line 元素（多条线）
  const renderLines = () => {
    if (!isMultiLineFormat) {
      return (
        <Line
          type="monotone"
          dataKey="data"
          stroke="#82ca9d"
          strokeWidth={2}
          dot={false}
        />
      );
    }

    // 遍历 lineActive 动态渲染每条线
    return Object.keys(lineActive).map((key) => {
      if (lineActive[key]) {
        return (
          <Line
            key={key}
            type="monotone"
            dataKey={key}
            stroke={getColorByKey(key)}
            strokeWidth={2}
            dot={false}
          />
        );
      }
      return null;
    });
  };

  // 动态设置颜色（可根据 key 决定颜色）
  const getColorByKey = (key) => {
    const colors = {
      q1: "#8884d8",
      q2: "#82ca9d",
      q3: "#FF0000",
      fitCurve: "#FFF",
    };
    return colors[key] || "#333"; // 默认颜色
  };

  return (
    <div className="DataSet" onClick={openChart ? (() => type && openChart(type)) : undefined}>
      <MuiTooltip 
        title={value > selectSensorData[0].healthAlertIndex ? '正常運行' : value > selectSensorData[0].healthMoveIndex ? '需進行警戒觀察' : '需進行橋檢處理'} 
        arrow 
        placement="top" 
        disableHoverListener={type !== "health"}
        slotProps={{
          tooltip: {
            sx: {
              fontSize: "1em",
            },
          },
        }}
      >
        <div className="Dashboard"
          style={
            type === "health"
              ? {
                  backgroundColor:
                    value > selectSensorData[0].healthAlertIndex
                      ? "#9DCD7B" // 绿色 (健康)
                      : value > selectSensorData[0].healthMoveIndex
                      ? "#FFD700" // 黄色 (警告)
                      : "#FF6347", // 红色 (危险)
                }
              : {
                
              }
          }
        >
          <h4 style={type === "health" ? {color: "#252525"} : {}}>
            
            {typeMapping[type].name ? typeMapping[type].name : type}
          </h4>
          <h4 style={type === "health" ? {color: "#252525"} : {}}>{Number(value).toFixed(2)} <span>{typeMapping[type].unit}</span></h4>
        </div>
      </MuiTooltip>
      <div className="DataChart">
        <ResponsiveContainer width="100%">
          <LineChart pure={false} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" hide="true" />
            <YAxis domain={[yMin, yMax]} hide="true"/>
            <Tooltip content={CustomTooltip} />
            {renderLines()}
            {type === 'health' && (<>
              <ReferenceArea y1={selectSensorData[0].healthAlertIndex} y2={selectSensorData[0].healthMoveIndex}fill="yellow" fillOpacity={0.2} />
              <ReferenceArea y2={selectSensorData[0].healthMoveIndex} fill="red" fillOpacity={0.2} />
            </>)}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default DataSet;
