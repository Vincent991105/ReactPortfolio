import { MdAppSettingsAlt } from "react-icons/md";
import ImageUpload from "./ImageUpload";
import { useNavigate } from "react-router-dom";
import { RecordContext } from "../context/RecordContext";
import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import dayjs from "dayjs";
import { GrHostMaintenance } from "react-icons/gr";
import { PopupContext } from "../context/PopupContext";

function CheckRequest() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { UpdateRepairData, repairData } = useContext(RecordContext);
  const { changeEdit } = useContext(PopupContext);

  const filterData = repairData.filter((item) => item.id === Number(id));

  // 初始化資料表
  const [formData, setFormData] = useState({
    time: "",
    result: "",
    link: "",
    image: "",
  });
  const [saveImage, setSaveImage] = useState(null);

  // 填寫資料時更動送出表單的資料
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const checkReport = (e, id) => {
    e.preventDefault();
    changeEdit("maintenance", "", id);
  };

  const handleSubmit = () => {
    const data = {
      id: Number(id),
      bridgeName: filterData[0].bridgeName,
      urgent: filterData[0].urgent,
      createTime: filterData[0].createTime,
      task: filterData[0].task,
      time: dayjs(formData.time).format("YYYY-MM-DD HH:mm"),
      result: formData.result,
      link: formData.link,
      image: saveImage,
    };

    if (data.time && data.result) {
      UpdateRepairData(data);
      navigate(-1);
    } else {
      alert("沒有完成表單無法送出內容");
    }
  };

  if (filterData) {
    return (
      <div className="CheckMaintenance">
        <div className="TopBar">
          <div className="Title">
            <GrHostMaintenance fontSize="1.5em" />
            <h2>更新維修紀錄</h2>
          </div>
        </div>
        <form className="NewForm">
          <div className="information">
            <h3>建物名稱：{filterData[0].bridgeName}</h3>
          </div>
          <div className="information">
            <h3>維修項目：{filterData[0].task}</h3>
            {filterData[0].maintenanceId && (
              <button onClick={(e) => checkReport(e, filterData[0].maintenanceId)}>
                來源: 橋檢紀錄 - {filterData[0].maintenanceId}
              </button>
            )}
          </div>
          <div className="InputBlock">
            <h4>維修時間：{!formData.time && <span>此欄位不可空置.</span>}</h4>
            <input
              type="datetime-local"
              id="time"
              name="time"
              onChange={handleInputChange}
              value={formData.time}
            />
          </div>
          <div className="InputBlock">
            <h4>
              維修結果：{!formData.result && <span>此欄位不可空置.</span>}
            </h4>
            <input
              type="text"
              id="result"
              name="result"
              placeholder="請輸入檢修完成說明"
              onChange={handleInputChange}
              value={formData.result}
              autoComplete="off"
            />
          </div>
          <div className="InputBlock">
            <h4>檢修報告連結：</h4>
            <input
              type="text"
              id="link"
              name="link"
              placeholder="請輸入檢修報告連結"
              onChange={handleInputChange}
              value={formData.link}
              autoComplete="off"
            />
          </div>
          <ImageUpload
            type="new"
            setSaveImage={setSaveImage}
            saveImage={saveImage}
          />
        </form>
        <div className="ButtonSet">
          <button
            className="close"
            onClick={() => navigate(-1)}
          >
            取消
          </button>
          <button
            onClick={handleSubmit}
            disabled={!formData.time || !formData.result}
          >
            確認
          </button>
        </div>
      </div>
    );
  }
}

export default CheckRequest;
