import { MdAppSettingsAlt } from "react-icons/md"
import ImageUpload from "./ImageUpload"
import { useNavigate } from "react-router-dom";
import { RecordContext } from "../context/RecordContext";
import { useParams } from 'react-router-dom';
import { useContext, useState } from "react";
import dayjs from 'dayjs';
import { GrHostMaintenance } from "react-icons/gr";

function CheckMaintenance(){

    const { id } = useParams();
    const navigate = useNavigate();

    const { maintenanceData, changeMaintenanceData, autoRepairData } = useContext(RecordContext);

    const filterData = maintenanceData.filter(item => item.id === Number(id))

    const urgentMap = {
        0: {text:'急', color:'rgb(112 171 67)'},
        1: {text:'緊急', color:'orange'},
        2: {text:'非常緊急', color:'rgb(255, 59, 59)'},
    };

    // 初始化資料表
    const [formData, setFormData] = useState({
        time:"",
        result:"",
        link:"",
        image:"", 
        agree:false,
    });
    const [saveImage, setSaveImage] = useState(null);

    // 填寫資料時更動送出表單的資料
    const handleInputChange = (e) => {
        const { name, type, value, checked } = e.target;
    
        // 如果是 checkbox，則使用 checked 來更新 state
        if (type === "checkbox") {
            console.log('確認一下')
            setFormData({ ...formData, [name]: checked });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = () => {

        const data = {
            id:Number(id),
            bridgeName: filterData[0].bridgeName,
            urgent: filterData[0].urgent,
            createTime: filterData[0].createTime,
            task: filterData[0].task,
            time: dayjs(formData.time).format('YYYY-MM-DD HH:mm'),
            result: formData.result,
            link: formData.link,
            image: saveImage, 
        }

        if(data.time && data.result){
            changeMaintenanceData(data)
            if(formData.agree){
                const repairData = {
                    bridgeName:filterData[0].bridgeName,
                    task:formData.result,
                    maintenanceId:Number(id),
                    time:null,
                    result:null,
                    image:null,
                    link:null,
                }
                autoRepairData(repairData);
            }
            navigate(-1)
        }else{
            alert('沒有完成表單無法送出內容')
        }
    }

    if (filterData){
        return(
            <div className="CheckMaintenance">
                <div className="TopBar">
                    <div className="Title">
                        <GrHostMaintenance fontSize="1.5em" />
                        <h2>更新橋檢紀錄</h2>
                    </div>
                </div>
                <form className="NewForm">
                    <div className="information">
                        <h3>建物名稱：{filterData[0].bridgeName}</h3>
                        <h4>緊急程度：<span style={{color:urgentMap[filterData[0].urgent].color}}>{urgentMap[filterData[0].urgent].text}</span></h4>
                    </div>
                    <div className="information">
                        <h3>橋檢備註：{filterData[0].task}</h3>
                        <h4>橋檢類型：{filterData[0].type}</h4>
                    </div>
                    <div className="InputBlock">
                        <h4>橋檢時間：{!formData.time && (<span>此欄位不可空置.</span>)}</h4>
                        <input type="datetime-local" id="time" name="time" onChange={handleInputChange} value={formData.time}/>
                    </div>
                    <div className="InputBlock">
                        <h4>橋檢完成說明：{!formData.result && (<span>此欄位不可空置.</span>)}</h4>
                        <input type="text" id="result" name="result" placeholder="請輸入檢修完成說明" onChange={handleInputChange} value={formData.result} autocomplete="off" />
                        <div className="InputCheck">
                            <input type="checkbox" id="agree" name="agree" class="checkbox-input" onChange={handleInputChange}/>
                            檢測確認需要進行維修；新增相關維修任務。
                        </div>
                    </div>
                    <div className="InputBlock">
                        <h4>橋檢報告連結：</h4>
                        <input type="text" id="link" name="link" placeholder="請輸入檢修報告連結" onChange={handleInputChange} value={formData.link} autocomplete="off" />
                    </div>
                    <ImageUpload type='new' setSaveImage={setSaveImage} saveImage={saveImage}/>
                </form>
                <div className="ButtonSet">
                    <button className="close" onClick={() => navigate(-1)}>取消</button>
                    <button onClick={handleSubmit} disabled={!formData.time || !formData.result}>確認</button>
                </div>
    
            </div>
        )
    }
    
}

export default CheckMaintenance