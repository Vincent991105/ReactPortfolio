import axios from "../../config/aioxsConfig";
import { createContext, useState, useCallback } from "react";
import dayjs from "dayjs";

export const DisasterContext = createContext();

export const DisasterProvider = ({ children }) => {
  // 震央參數回傳
  const [earthPoint, setearthPoint] = useState(null);
  const getEarthPoint = useCallback((data) => {
    if (!data) {
      setearthPoint(null);
      return;
    }
    const impactRadius = data.magnitudeValue * 20;
    const place = [data.latitude, data.longitude];
    setearthPoint({ impactRadius, place });
  }, []);

  // 切換地震標示的程式
  const [selectedId, setSelectedId] = useState(null);

  const handleToggle = (data) => {
    // 切換選中狀態
    const newSelectedId = selectedId === data.id ? null : data.id;
    setSelectedId(newSelectedId);
    getEarthPoint(newSelectedId ? data : null);
  };

  const [disasterLoading, setDisasterLoading] = useState(true);

  // 收集地震資料
  const [earthData, setEarthData] = useState([]);

  const callEarthData = async (data, type) => {
    setDisasterLoading(true);
    try {
      let config = {};

      let url = ``;

      if (data) {
        // 如果 data 是數字，構造動態 URL
        if (type === "sensor") {
          //sensor data type URL
          url = `http://${window.location.hostname}:8000/api/bridges/${data.bridge}/sensors/${data.sensor}/earthquake-history`;
        } else if (type === "wholeStructure") {
          //wholeStructure data type URL
          url = `http://${window.location.hostname}:8000/api/bridges/${data.bridge}/earthquake-history`;
        }
      } else if (typeof data === "object" && data !== null) {
        // 如果 data 是物件，將其作為查詢參數
        config.params = data;
      }

      const response = await axios.get(url, config);
      setEarthData(response.data.data);
    } catch (error) {
      console.error("獲取資料失敗:", error);
      setEarthData([]);
    } finally {
      setDisasterLoading(false); // 無論成功或失敗，清除加載狀態
    }
  };

  // 收集颱風資料
  const [typhoonData, setTyphoonData] = useState([]);

  const callTyphoonData = async (data, type) => {
    setDisasterLoading(true);
    try {
      let config = {};

      let url = ``;

      if (data) {
        // 如果 data 是數字，構造動態 URL
        //url = `http://${window.location.hostname}:8000/api/bridges/${data.bridge}/sensors/${data.sensor}/typhoon-history`;
        if (type === "sensor") {
          url = `http://${window.location.hostname}:8000/api/bridges/${data.bridge}/sensors/${data.sensor}/typhoon-history`;
        } else if (type === "wholeStructure") {
          url = `http://${window.location.hostname}:8000/api/bridges/${data.bridge}/typhoon-history`;
        }
      } else if (typeof data === "object" && data !== null) {
        // 如果 data 是物件，將其作為查詢參數
        config.params = data;
      }

      const response = await axios.get(url, config);
      setTyphoonData(response.data.data);
    } catch (error) {
      console.error("獲取資料失敗:", error);
      setTyphoonData([]);
    } finally {
      setDisasterLoading(false); // 無論成功或失敗，清除加載狀態
    }
  };

  // 收集感測器區間數據
  const [DisasterData, setDisasterData] = useState(null);

  const fetchDisasterData = async (data) => {
    if (data.type === "earthquake") {
      try {
        const originalDate = dayjs(data.start, "YYYY-MM-DD HH:mm:ss");
        let config = {};
        let url = ``;
        let start = originalDate
          .subtract(5, "minutes")
          .format("YYYY-MM-DDTHH:mm:ss");
        let end = originalDate.add(5, "minutes").format("YYYY-MM-DDTHH:mm:ss");

        if (data) {
          // 如果 data 是數字，構造動態 URL
          url = `http://${window.location.hostname}:8000/api/bridges/${data.bridge}/sensors/${data.sensor}/history-trend/?start=${start}&end=${end}`;
        } else if (typeof data === "object" && data !== null) {
          // 如果 data 是物件，將其作為查詢參數
          config.params = data;
        }

        const response = await fetch(url, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}:${response.text}`);
        }
        const result = await response.json();
        setDisasterData(result);
      } catch (error) {
        console.log("Trouble getting sensor history date", error);
      }
    } else {
      try {
        let start = dayjs(data.start).format("YYYY-MM-DDTHH:mm:ss");
        let end = dayjs(data.end).format("YYYY-MM-DDTHH:mm:ss");

        const response = await fetch(
          `http://${window.location.hostname}:8000/api/bridges/${data.bridge}/sensors/${data.sensor}/history-trend/?start=${start}&end=${end}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status}:${response.text}`);
        }
        const result = await response.json();
        setDisasterData(result);
      } catch (error) {
        console.log("Trouble getting sensor history date", error);
      }
    }
  };

  const value = {
    earthPoint,
    getEarthPoint,
    selectedId,
    handleToggle,
    disasterLoading,
    callEarthData,
    earthData,
    callTyphoonData,
    typhoonData,
    DisasterData,
    fetchDisasterData,
  };

  return (
    <DisasterContext.Provider value={value}>
      {children}
    </DisasterContext.Provider>
  );
};
