import { createContext, useState, useContext, useEffect } from "react";
import { BridgeContext } from "./BridgeContext";
import dayjs from "dayjs";
import { generateMockData } from '../js/mockData';

export const ResultContext = createContext();

export const ResultProvider = ({ children }) => {
  
  const { select, taiwanTime } = useContext(BridgeContext);

  const [dataUrl, setDataUrl] = useState(); //Data report URL
  const [historyTrendUrl, setHistoryTrendUrl] = useState(); //History trend URL
  const [resultType, setResultType] = useState(); // whole structure / sensor
  const [resultDate, setResultDate] = useState({
    start: dayjs().subtract(30, "day").format("YYYY-MM-DD"),
    end: dayjs().subtract(1, "day").format("YYYY-MM-DD"),
  });

  // Change chart data URL according to type
  // useEffect(() => {
  //   if (resultType === !undefined && !select) return;

  //   let start = resultDate.start + "T00:00:00";
  //   let end = resultDate.end + "T23:59:59";
  //   if (resultType === undefined && !select) return;

  //   //Sensor Data URL
  //   if (resultType === "sensor") {
  //     //Data report
  //     setDataUrl(
  //       `http://${window.location.hostname}:8000/api/bridges/${select.bridge}/sensors/${select.sensor}/data-report`
  //     );
  //     //History Trend
  //     setHistoryTrendUrl(
  //       `http://${window.location.hostname}:8000/api/bridges/${select.bridge}/sensors/${select.sensor}/history-trend?start=${start}&end=${end}`
  //     );
  //   }
  //   //Whole structure URL
  //   else if (resultType === "wholeStructure") {
  //     //Data report
  //     setDataUrl(
  //       `http://${window.location.hostname}:8000/api/bridges/${select.bridge}/data-report`
  //     );
  //     //History Trend
  //     setHistoryTrendUrl(
  //       `http://${window.location.hostname}:8000/api/bridges/${select.bridge}/history-trend?start=${start}&end=${end}`
  //     );
  //   }
  // }, [select, resultType, resultDate]);

  // storage of Minute and Hour
  const [resultTab, setresultTab] = useState("minute"); // 預設選中第一個 Tab

  const [historyData, setHistoryData] = useState();

  useEffect(() => {
    const data = generateMockData();
    setHistoryData(data);
  }, [select]);

  // const [historyLoading, setHistoryLoading] = useState(true);

  // const [TrendData, setTrendData] = useState();

  //Fetch Sensor History Data
  // useEffect(() => {
  //   //if (!dataUrl) return;
  //   if (select?.sensor && select?.bridge) {
  //     fetchLineChartData(dataUrl);
  //     fetchHistoryTrend({
  //       bridge: select.bridge,
  //       sensor: select.sensor,
  //       //  start: resultDate.start,
  //       // end: resultDate.end,
  //       url: historyTrendUrl,
  //     });
  //   } else {
  //     setHistoryLoading(false);
  //     setNewData({ time: [] });
  //     setTrendData({ data: { time: [] } });
  //   }
  // }, [select, dataUrl, historyTrendUrl]);

  // 更新時間後呼叫API

  /*
  useEffect(() => {
    if (select?.sensor && select?.bridge) {
      // fetchLineChartData(dataUrl);
      fetchHistoryTrend({
        bridge: select.bridge,
        sensor: select.sensor,
        //start: resultDate.start,
        //end: resultDate.end,
        url: historyTrendUrl,
      });
    }
  }, [resultDate, select]);
*/
  // 中文名稱對應英文名稱的映射表
  const typeMapping = {
    health: { name: "健康度", unit: "%" },
    seismic: { name: "震度", unit: "grade" },
    centroid_frequency: { name: "中心頻率", unit: "Hz" },
    cable_force: { name: "索力", unit: "tonf" },
    damping_ratio: { name: "阻尼比", unit: "%" },
    temperature: { name: "溫度", unit: "" },
    wind_speed: { name: "風速", unit: "" },
    wind_direction: { name: "風向", unit: "" },
    precipitation: { name: "雨量", unit: "" },
    load_carry_capacity: { name: "撓度", unit: "" },
  };

  // 數據報表的API
  // const fetchLineChartData = async (url) => {
  //   try {
  //     const response = await fetch(url, {
  //       method: "GET",
  //       credentials: "include",
  //     });

  //     if (!response.ok) {
  //       throw new Error(`Error: ${response.status}:${response.text}`);
  //     }
  //     const result = await response.json();
  //     setHistoryData(result);
  //   } catch (error) {
  //     console.log("Trouble getting data report data", error);
  //   } finally {
  //     const now = new Date().toISOString();
  //     taiwanTime(now);
  //     setHistoryLoading(false);
  //   }
  // };

  // 儲存數據報表(分鐘或小時)的資料
  const [newData, setNewData] = useState(null);

  useEffect(() => {
    if(!historyData){
      return
    }
    if (resultTab === "minute") {
      console.log('minute')
      setNewData(historyData.minute);
    } else {
      console.log('hour')
      setNewData(historyData.hour);
    }
  }, [historyData, resultTab]);

  // function of change Minute and Hour
  const changeResultTab = (tabId) => {
    setresultTab(tabId); // 設定目前被選中的 Tab
  };

  // value of open popup chart
  const [selectChart, setselectChart] = useState(null);

  // function of open chart
  const openChart = (data) => {
    setselectChart(data);
  };

  // value of save the q1 , q2 and q3 button
  const [lineActive, setlineActive] = useState({
    q1: true,
    q2: true,
    q3: true,
    fitCurve: true,
  });

  // function of change the q1,q2,q3 state
  const activeButton = (key) => {
    setlineActive((prev) => ({
      ...prev,
      [key]: !prev[key], // 切換指定數據線的狀態
    }));
  };

  // call history-trend api
  // const fetchHistoryTrend = async (data) => {
  //   try {
  //     /*let start = data.start + "T00:00:00";
  //     let end = data.end + "T23:59:59";*/

  //     const response = await fetch(data.url, {
  //       method: "GET",
  //       credentials: "include",
  //     });

  //     if (!response.ok) {
  //       throw new Error(`Error: ${response.status}:${response.text}`);
  //     }
  //     const result = await response.json();
  //     setTrendData(result);
  //   } catch (error) {
  //     setTrendData(null);
  //   } finally {
  //     const now = new Date().toISOString();
  //     taiwanTime(now);
  //     setHistoryLoading(false);
  //   }
  // };

  // 更新資料時的處理函式
  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setResultDate((prev) => ({
      ...prev,
      [name]: value, // 動態更新 start 或 end
    }));
  };

  // 更新資料時的處理函式
  const clickDateChange = (data) => {
    setResultDate({
      start: dayjs().subtract(data, "day").format("YYYY-MM-DD"),
      end: dayjs().subtract(1, "day").format("YYYY-MM-DD"),
    });
  };

  // 回傳可用的參數
  const value = {
    resultTab,
    changeResultTab,
    setResultType,
    selectChart,
    openChart,
    lineActive,
    activeButton,
    historyData,
    newData,
    // historyLoading,
    typeMapping,
    // fetchHistoryTrend,
    // TrendData,
    resultDate,
    handleDateChange,
    clickDateChange,
    // fetchLineChartData,
    historyTrendUrl,
  };

  return (
    <ResultContext.Provider value={value}>{children}</ResultContext.Provider>
  );
};
