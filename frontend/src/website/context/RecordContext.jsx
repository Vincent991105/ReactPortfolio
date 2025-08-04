import { createContext, useEffect, useState } from "react";

export const RecordContext = createContext();

export const RecordProvider = ({ children }) => {
  const [maintenanceData, setmaintenanceData] = useState([
    {
      id: 1,
      bridgeName: "南門橋",
      type:'一般橋檢',
      urgent: 0,
      createTime: "2025-04-08 14:49",
      task: "B-32梁柱出現異常",
      time: null,
      result: null,
      link: null,
      image: null,
    },
    {
      id: 2,
      bridgeName: "南門橋",
      type:'特殊橋檢',
      urgent: 0,
      createTime: "2025-04-08 14:49",
      task: "B-32梁柱出現異常",
      time: "2025-04-08 14:49",
      result: "B-32梁柱出現異常",
      link: "https://github.com/joshsmiththenoob/shm/blob/e1a2afe4f0a5e6a34b7bd8a9244802354eea9469/frontend/src/App.css",
      image: null,
    },
  ]);

  const addMaintenanceData = (newItem) => {
    // 計算新 id（假設 id 為資料中最大 id + 1）
    const newId =
      maintenanceData.length > 0
        ? Math.max(...maintenanceData.map((item) => item.id)) + 1
        : 1;

    const itemWithId = {
      ...newItem,
      id: newId, // 加上新計算的 id
    };

    setmaintenanceData((prev) => [...prev, itemWithId]);
  };

  const changeMaintenanceData = (updatedItem) => {
    setmaintenanceData((prev) =>
      prev.map((item) =>
        item.id === updatedItem.id ? { ...item, ...updatedItem } : item
      )
    );
  };

  const [keyWord, setKeyWord] = useState("");

  const searchBridge = (data) => {
    setKeyWord(data);
  };

  // if maintenanceId === null；this record is manualy add。
  // if time && result === null ； status is red(尚未處理)
  const [repairData, setRepairData] = useState([
    {
      id: 1,
      bridgeName: "南門橋",
      task: "B-32梁柱出現異常",
      maintenanceId: "1",
      time: null,
      result: null,
      image: null,
      link: null,
    },
    {
      id: 2,
      bridgeName: "南門橋",
      task: "B-32梁柱出現異常",
      maintenanceId: null,
      time: null,
      result: null,
      image: null,
      link: null,
    },
    {
      id: 3,
      bridgeName: "新北大橋",
      task: "B-32梁柱出現異常",
      maintenanceId: 1,
      time: "2025/04/08 上午10:44:15",
      result: null,
      image: null,
      link: null,
    },
  ]);

  const autoRepairData = (newItem) => {
    // 計算新 id（假設 id 為資料中最大 id + 1）
    const newId =
      repairData.length > 0
        ? Math.max(...repairData.map((item) => item.id)) + 1
        : 1;

    const itemWithId = {
      ...newItem,
      id: newId, // 加上新計算的 id
    };

    setRepairData((prev) => [...prev, itemWithId]);
  };

  //Add new repair request
  const AddRepairRequest = (newItem) => {
    // 計算新 id（假設 id 為資料中最大 id + 1）
    const newId =
      repairData.length > 0
        ? Math.max(...repairData.map((item) => item.id)) + 1
        : 1;

    const itemWithId = {
      ...newItem,
      id: newId, // 加上新計算的 id
    };
    setRepairData((prev) => [...prev, itemWithId]);
  };

  //update repair data after complete repair
  const UpdateRepairData = (updatedItem) => {
    setRepairData((prev) =>
      prev.map((item) =>
        item.id === updatedItem.id ? { ...item, ...updatedItem } : item
      )
    );
  };

  // 回傳可用的參數
  const value = {
    maintenanceData,
    addMaintenanceData,
    changeMaintenanceData,
    autoRepairData,
    repairData,
    searchBridge,
    keyWord,
    AddRepairRequest,
    UpdateRepairData,
  };

  return (
    <RecordContext.Provider value={value}>{children}</RecordContext.Provider>
  );
};
