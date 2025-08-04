import { createContext, useState, useEffect } from "react";
// import axios from "axios";
import axios from "../../config/aioxsConfig";
import { useNavigate } from "react-router-dom";
import { FaKey } from "react-icons/fa";

export const BridgeContext = createContext();

export const BridgeProvider = ({ children }) => {

  const fakeData = {data:{
      bridge: {
        longitude: 121.284,
        latitude: 25.0564,
        id: 1,
        name: "南崁橋",
        city: "桃園市",
        district: "蘆竹區",
        photoName: "bridgeDemo.png",
        latestHealth: 91
      },
      weather: {
        latestWeatherTime: "2025-04-10 00:00:00",
        latestPrecipitation: 0.5,
        latestTemperature: 21,
        latestWindSpeed: 3.9,
        latestWindDirection: 335
      },
      earthquake: {
        id: 114072,
        originTime: "2025-03-14 18:50:12",
        endTime: "2025-03-14 18:52:12",
        magnitudeValue: 4,
        longitude: 121.09,
        latitude: 22.88,
        postEventHealth: 91
      },
      typhoon: {
        id: 202425,
        chtName: "天兔",
        engName: "USAGI",
        seaStartDatetime: "2024-11-14 05:30:00",
        seaEndDatetime: "2024-11-16 11:30:00",
        maxIntensity: "m",
        postEventHealth: 99
      },
      sensorList: [
        {
          type: "accelerometer",
          ip: 43,
          elasticity: 2.4,
          inertia: 1.1,
          mass: 30.5,
          status: 2,
          id: 1,
          latestTime: "2025-03-11 10:53:00",
          latestHealth: 89.82,
          sensorLocation: "cable",
          detailedLocation: "L-77",
          cableMassPerLength: 1.66,
          cableLength: 22.66,
          healthAlertIndex: 90,
          healthMoveIndex: 85,
          eventAlertIndex: 1,
          eventMoveIndex: 1,
          bridgeAlertIndex: 30,
          bridgeMoveIndex: 40,
          imageCoordinate: {
            x: 12.3,
            y: 4.56
          }
        },
        {
          type: "accelerometer",
          ip: 42,
          elasticity: null,
          inertia: null,
          mass: null,
          status: 2,
          id: 2,
          latestTime: "2025-03-11 10:52:00",
          latestHealth: 93.48,
          sensorLocation: "cable",
          detailedLocation: "L-80",
          cableMassPerLength: 1.102,
          cableLength: 26.146,
          healthAlertIndex: 90,
          healthMoveIndex: 85,
          eventAlertIndex: 1,
          eventMoveIndex: 1,
          bridgeAlertIndex: 1,
          bridgeMoveIndex: 0.1,
          imageCoordinate: {
            x: 63.3374,
            y: 63.3125
          }
        }
      ]
    }}

  const navigate = useNavigate();

  //橋梁資料_地圖

  const [bridgePoint, setbridgePoint] = useState(
    [
      {
        id: 1,
        type: "bridge",
        bno: "test",
        name: "南崁橋",
        longitude: 121.284,
        latitude: 25.0564,
        photo_name: "bridgeDemo.png",
        base64: '',
        deleted: 0,
        city: "桃園市",
        district: "蘆竹區"
      },
      {
        id: 2,
        type: "bridge",
        bno: "test",
        name: "彩虹橋",
        longitude: 121.249,
        latitude: 25.1177,
        photo_name: "cropped-image-1740020212429.png",
        base64: '',
        deleted: 0,
        city: "桃園市",
        district: "大園區"
      },
    ]
  );
  const [filterItems, setfilterItems] = useState(
    {data:{
      bridge: {
        longitude: 121.284,
        latitude: 25.0564,
        id: 1,
        name: "南崁橋",
        city: "桃園市",
        district: "蘆竹區",
        photoName: "bridgeDemo.png",
        latestHealth: 91
      },
      weather: {
        latestWeatherTime: "2025-04-10 00:00:00",
        latestPrecipitation: 0.5,
        latestTemperature: 21,
        latestWindSpeed: 3.9,
        latestWindDirection: 335
      },
      earthquake: {
        id: 114072,
        originTime: "2025-03-14 18:50:12",
        endTime: "2025-03-14 18:52:12",
        magnitudeValue: 4,
        longitude: 121.09,
        latitude: 22.88,
        postEventHealth: 91
      },
      typhoon: {
        id: 202425,
        chtName: "天兔",
        engName: "USAGI",
        seaStartDatetime: "2024-11-14 05:30:00",
        seaEndDatetime: "2024-11-16 11:30:00",
        maxIntensity: "m",
        postEventHealth: 99
      },
      sensorList: [
        {
          type: "accelerometer",
          ip: 43,
          elasticity: 2.4,
          inertia: 1.1,
          mass: 30.5,
          status: 2,
          id: 1,
          latestTime: "2025-03-11 10:53:00",
          latestHealth: 89.82,
          sensorLocation: "cable",
          detailedLocation: "L-77",
          cableMassPerLength: 1.66,
          cableLength: 22.66,
          healthAlertIndex: 90,
          healthMoveIndex: 85,
          eventAlertIndex: 1,
          eventMoveIndex: 1,
          bridgeAlertIndex: 30,
          bridgeMoveIndex: 40,
          imageCoordinate: {
            x: 34.3,
            y: 34.56
          }
        },
        {
          type: "accelerometer",
          ip: 42,
          elasticity: null,
          inertia: null,
          mass: null,
          status: 2,
          id: 2,
          latestTime: "2025-03-11 10:52:00",
          latestHealth: 93.48,
          sensorLocation: "cable",
          detailedLocation: "L-80",
          cableMassPerLength: 1.102,
          cableLength: 26.146,
          healthAlertIndex: 90,
          healthMoveIndex: 85,
          eventAlertIndex: 1,
          eventMoveIndex: 1,
          bridgeAlertIndex: 1,
          bridgeMoveIndex: 0.1,
          imageCoordinate: {
            x: 63.3374,
            y: 63.3125
          }
        }
      ]
    }}
  );
  const [select, setSelect] = useState({bridge: 1, sensor: 1});
  const [dataTime, setDataTime] = useState(() => {
    return new Date().toISOString(); // 初始化为当前时间
  });
  const [loading, setLoading] = useState(false); // 定义加载状态

  const [alertData, setalertData] = useState([]);
  const [alertPoint, setalertPoint] = useState([]);
  const [structuresList, setStructuresList] = useState([
    {
      bid: 1,
      name: "南崁橋",
      type: "橋梁",
      station: {
        name: "蘆竹",
        detail: {
          precipitation: 0.5,
          temperature: 21,
          windSpeed: 3.9,
          windDirection: 335
        }
      },
      anomaly_sensor_list: {
        counts: 2,
        detail: {
          connectionErrors: [
            2
          ],
          healthErrors: [
            0
          ]
        }
      },
      latest_health: 89.82,
      slope: {
        daysUntilAlert: 0,
        daysUntilMove: 389
      },
      earthquake: {
        beforeAfter: 0.99855,
        maxDuring: 0.9892
      },
      typhoon: {
        beforeAfter: 0.9943,
        maxDuring: null
      }
    },
    {
      bid: 2,
      name: "彩虹橋",
      type: "橋梁",
      station: {
        name: "竹圍",
        detail: {
          precipitation: 0.5,
          temperature: 21.1,
          windSpeed: 6,
          windDirection: 342
        }
      },
      anomaly_sensor_list: {
        counts: 2,
        detail: {
          connectionErrors: [
            2
          ],
          healthErrors: [
            0
          ]
        }
      },
      latest_health: 90.54,
      slope: {
        daysUntilAlert: 44,
        daysUntilMove: 452
      },
      earthquake: {
        beforeAfter: 0.9992,
        maxDuring: 0.98875
      },
      typhoon: {
        beforeAfter: 0.97595,
        maxDuring: null
      }
    }
  ]);

  // 轉換時間格式的code
  const taiwanTime = (data) => {
    // 转换为 Date 对象
    const date = new Date(data);

    // 使用 Intl.DateTimeFormat 格式化为台湾时间
    const taiwanTimeString = new Intl.DateTimeFormat("zh-TW", {
      timeZone: "Asia/Taipei",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(date);

    setDataTime(taiwanTimeString);
  };

  // // BridgeMap的API
  // useEffect(() => {
  //   // 获取 Django API 的数据
  //   fetchBridges();
  //   fetchalertData();
  //   fetchStructures();
  // }, [isAuthenticated]);

  // //Fetch list of structures
  // const fetchStructures = async () => {
  //   try {
  //     const result = await axios.get(
  //       `http://${window.location.hostname}:8000/api/projects/`
  //     );
  //     setStructuresList(result.data.data);
  //   } catch (error) {
  //     console.log("Error Fetching full list of structures", error);
  //   } finally{
  //     const now = new Date().toISOString();
  //     taiwanTime(now);
  //   }
  // };

  // // 顯示地圖點位的API
  // const fetchBridges = async (data) => {
  //   try {
  //     const response = await axios.get(
  //       `http://${window.location.hostname}:8000/api/bridges/coordinates`
  //     );

  //     setbridgePoint(response.data.data);
  //     if (data === "timer") {
  //       timerSelect(select.bridge);
  //     } else {
  //       setSelect(response.data.data[0].id);
  //       fetchfilterItems(response.data.data[0].id);
  //     }
  //   } catch (error) {
  //     console.error("获取数据失败:", error);
  //   } 
  // };

  // 切換MachineList的Function
  const selectBridge = (data) => {
    console.log(data)
    // setLoading(true); // 在執行請求之前設置加載狀態
    navigate("bridge-monitoring/data-result");
    if(data === 1){
      setfilterItems(fakeData)
      setSelect({bridge: data, sensor: 1})
    }else{
      setfilterItems(null)
      setSelect({bridge: data, sensor: null})
    }
    // fetchfilterItems(data);
  };



  // 切換MachineList的Function
  // const timerSelect = (data) => {
  //   fetchfilterItems(data);
  // };

  // MachineList的API
  // const fetchfilterItems = async (data) => {
  //   try {
  //     let url = `http://${window.location.hostname}:8000/api/bridges/information/`;
  //     let config = {};

  //     if (typeof data === "number") {
  //       // 如果 data 是數字，構造動態 URL
  //       url = `${url}${data}/`;
  //     } else if (typeof data === "object" && data !== null) {
  //       // 如果 data 是物件，將其作為查詢參數
  //       config.params = data;
  //     }

  //     const response = await axios.get(url, config);

  //     setfilterItems(response.data); // 設置獲取的資料
  //     setSelect({
  //       bridge: response.data.data.bridge.id,
  //       sensor: response.data.data.sensorList[0]?.id || "",
  //     });
  //   } catch (error) {
  //     console.error("獲取資料失敗:", error);
  //     setfilterItems([]);
  //   } finally {
  //     const now = new Date().toISOString();
  //     taiwanTime(now);
  //     setLoading(false); // 無論成功或失敗，清除加載狀態
  //   }
  // };

  // SensorDetail的切換感測器的Function
  const selectSensor = (data, bridge) => {
    setSelect({ bridge: bridge, sensor: data });
  };

  const selectSensorData =
    filterItems?.data?.sensorList?.filter(
      (item) => item.id === select.sensor
    ) || [];

  //刪除橋梁的功能
  const deleteBridge = async (data) => {
    const isConfirmed = window.confirm("確定要刪除此橋樑嗎？");

    if (!isConfirmed) {
      return; // 如果使用者取消，直接返回
    }

    try {
      let config = {};
      let url = `http://${window.location.hostname}:8000/api/bridges/${data}/`;

      const response = await axios.delete(url, config);
    } catch (error) {
      console.error("刪除失敗:", error);
    } finally {
      // fetchBridges();
    }
  };

  //刪除感測器的功能
  const deleteSensor = async (data) => {
    const isConfirmed = window.confirm("確定要刪除此感測器嗎？");

    if (!isConfirmed) {
      return; // 如果使用者取消，直接返回
    }

    try {
      let config = {};
      let url = `http://${window.location.hostname}:8000/api/bridges/${data.bridge}/sensors/${data.sensor}/`;

      const response = await axios.delete(url, config);
    } catch (error) {
      console.error("刪除失敗:", error);
    } finally {
      // fetchfilterItems(data.bridge);
    }
  };

  // Mobile橫劃的function
  const changeBridge = (direction) => {
    const foundIndex = bridgePoint.findIndex(
      (item) => item.id === filterItems.data.bridge.id
    );
    if (foundIndex !== -1) {
      if (direction === "left" && foundIndex < bridgePoint.length - 1) {
        selectBridge(bridgePoint[foundIndex + 1].id);
      } else if (direction === "right" && foundIndex > 0) {
        selectBridge(bridgePoint[foundIndex - 1].id);
      }
    }
  };

  // Mobile橫劃的function
  const changeSensor = (direction) => {
    const Data = filterItems.data.sensorList;
    const foundIndex = Data.findIndex((item) => item.id === select.sensor);
    if (foundIndex !== -1) {
      if (direction === "left" && foundIndex < bridgePoint.length - 1) {
        selectSensor(Data[foundIndex + 1].id);
      } else if (direction === "right" && foundIndex > 0) {
        selectSensor(Data[foundIndex - 1].id);
      }
    }
  };

  const fetchalertData = async () => {
    try {
      let url = `http://${window.location.hostname}:8000/api/bridges/sensors/alert/`;
      let config = {};

      if (typeof data === "number") {
        // 如果 data 是數字，構造動態 URL
        url = `${url}${data}/`;
      } else if (typeof data === "object" && data !== null) {
        // 如果 data 是物件，將其作為查詢參數
        config.params = data;
      }

      const response = await axios.get(url, config);
      setalertData(response.data); // 設置獲取的資料
    } catch (error) {
      console.error("獲取資料失敗:", error);
      setfilterItems([]);
    } finally {
      const now = new Date().toISOString();
      taiwanTime(now);
      setLoading(false); // 無論成功或失敗，清除加載狀態
    }
  };

  const checkalertPoint = () => {
    if (!alertData?.data || !bridgePoint) return; // 防止数据为空

    const healthList = alertData.data.healthErrors?.sensorList || [];
    const connectionList = alertData.data.connectionErrors?.sensorList || [];

    // 统计 healthErrors 和 connectionErrors
    const bidCountMap = new Map();

    const countBids = (list, key) => {
      list.forEach(({ bid }) => {
        if (!bidCountMap.has(bid)) {
          bidCountMap.set(bid, {
            id: bid,
            healthErrors: 0,
            connectionErrors: 0,
          }); // id 取代 bid
        }
        bidCountMap.get(bid)[key] += 1;
      });
    };

    countBids(healthList, "healthErrors");
    countBids(connectionList, "connectionErrors");

    // 合并 bridgePoint 资料，并去除 bid 字段
    const result = Array.from(bidCountMap.values()).map(({ id, ...rest }) => {
      const bridgeInfo = bridgePoint.find((b) => b.id === id) || {}; // 以 id 进行匹配
      return { id, ...rest, ...bridgeInfo };
    });

    setalertPoint(result);
  };

  useEffect(() => {
    checkalertPoint();
  }, [alertData, bridgePoint]);

  const [searchTerm, setSearchTerm] = useState(""); // 搜尋文字
  const [searchData, setSearchData] = useState({
    connectionErrors: alertData?.data?.connectionErrors?.sensorList,
    healthErrors: alertData?.data?.healthErrors?.sensorList,
  });

  const value = {
    bridgePoint,
    setbridgePoint,
    selectBridge,
    selectSensor,
    select,
    filterItems,
    deleteBridge,
    loading,
    dataTime,
    // fetchBridges,
    taiwanTime,
    // fetchfilterItems,
    deleteSensor,
    changeBridge,
    changeSensor,
    selectSensorData,
    fetchalertData,
    alertData,
    alertPoint,
    searchTerm,
    setSearchTerm,
    searchData,
    setSearchData,
    structuresList,
    // fetchStructures
  };

  return (
    <BridgeContext.Provider value={value}>{children}</BridgeContext.Provider>
  );
};
