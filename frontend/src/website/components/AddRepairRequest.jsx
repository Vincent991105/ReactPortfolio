import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdAppSettingsAlt } from "react-icons/md";
import { BridgeContext } from "../context/BridgeContext";
import { RecordContext } from "../context/RecordContext";

const AddRepairRequest = () => {
  const { dataTime } = useContext(BridgeContext);
  const { AddRepairRequest, keyWord, searchBridge } = useContext(RecordContext);

  const [formData, setFormData] = useState({
    bridgeName: "",
    task: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const navigate = useNavigate();
  /*
  useEffect(() => {
    if (searchTerm) {
      setStructureName(searchTerm);
    }
  }, [searchTerm]);
*/

  const SendMaintenanceRequest = () => {
    console.log("Sending Maintenacne Report");
    const data = {
      bridgeName: keyWord,
      task: formData.task,
      maintenanceId: null,
      time: null,
      result: null,
      image: null,
      link: null,
    };

    if (data.bridgeName && data.task) {
      console.log(data);
      AddRepairRequest(data);
      navigate("/maintenance-repair");
    } else {
      alert("沒有完成表單無法送出內容");
    }
  };

  // useEffect 改为确保是正确的名字和值传递
  useEffect(() => {
    handleInputChange({ target: { name: "bridgeName", value: keyWord } });
  }, [keyWord]);

  useEffect(() => {
    searchBridge("");
  }, []);

  return (
    <div className="AddMaintenance">
      <div className="TopBar">
        <div className="Title">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="1.85em"
            height="1.85em"
          >
            <path
              fill="currentColor"
              d="M17 19.22H5V7h7V5H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-7h-2z"
            ></path>
            <path
              fill="currentColor"
              d="M19 2h-2v3h-3c.01.01 0 2 0 2h3v2.99c.01.01 2 0 2 0V7h3V5h-3zM7 9h8v2H7zm0 3v2h8v-2h-3zm0 3h8v2H7z"
            ></path>
          </svg>
          <h2>新增修理紀錄</h2>
        </div>
      </div>
      <form id="bridgeForm" className="NewForm">
          <div className="information">
            <h3>建物名稱：{keyWord ? keyWord : '*請至左側地圖選擇對應建物*'}</h3>
          </div>
        <div className="InputBlock">
          <h4>
            維修項目：{!formData.task && (<span>此欄位不可空置.</span>)}
          </h4>
          <input
            type="text"
            id="task"
            name="task"
            placeholder="請輸入橋檢項目內容"
            autocomplete="off"
            value={formData.task}
            onChange={handleInputChange}
          />
        </div>
      </form>
      <div className="ButtonSet">
        <button
          className="close"
          onClick={() => navigate(-1)}
        >
          取消
        </button>
        <button
          onClick={SendMaintenanceRequest}
          disabled={!keyWord || !formData.task}
        >
          確認
        </button>
      </div>
    </div>
  );
};

export default AddRepairRequest;
