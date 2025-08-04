import { useContext, useEffect, useState } from "react";
import { MdAppSettingsAlt } from "react-icons/md"
import { useNavigate } from "react-router-dom";
import { RecordContext } from "../context/RecordContext";
import dayjs from 'dayjs';
import { GrHostMaintenance } from "react-icons/gr";

function AddMaintenance(){

    const { addMaintenanceData, keyWord, searchBridge } = useContext(RecordContext);

    const navigate = useNavigate();

    // 初始化資料表
    const [formData, setFormData] = useState({
        bridgeName:'',
        task: '',
    });

    const [type, setType] = useState('一般橋檢');

    // 填寫資料時更動送出表單的資料
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        const data = {
            bridgeName:keyWord,
            urgent: 0,
            type:type,
            createTime: dayjs().format('YYYY-MM-DD HH:mm'),
            task: formData.task,
            time:null,
            result:null,
            link:null,
            image:null, 
        }

        if(data.bridgeName && data.task){
            console.log(data)
            addMaintenanceData(data)
            navigate(-1)
        }else{
            alert('沒有完成表單無法送出內容')
        }
    }

    // useEffect 改为确保是正确的名字和值传递
    useEffect(() => {
        handleInputChange({ target: { name: 'bridgeName', value: keyWord } });
    }, [keyWord]);

    useEffect(() => {searchBridge('')},[])

    return(
        <div className="AddMaintenance">
            <div className="TopBar">
                <div className="Title">
                    <GrHostMaintenance fontSize="1.5em" />
                    <h2>新增橋檢紀錄</h2>
                </div>
            </div>
            <form className="NewForm">
                <div className="TabSet" style={{maxWidth:'unset', flex:'unset'}}>
                    <h4 className={type === '一般橋檢' ? "specialActive" : "specialInactive"} onClick={() => setType("一般橋檢")}> 一般橋檢 </h4>
                    <h4 className={type === '特殊橋檢' ? "specialActive" : "specialInactive"} onClick={() => setType("特殊橋檢")}> 特殊橋檢 </h4>
                </div>
                <div className="information">
                    <h3>建物名稱：{keyWord ? keyWord : '*請至左側地圖選擇對應建物*'}</h3>
                </div>
                <div className="InputBlock">
                    <h4>橋檢備註：{!formData.task && (<span>此欄位不可空置.</span>)}</h4>
                    <input type="text" id="task" name="task" onChange={handleInputChange} value={formData.task} placeholder="請輸入橋檢項目內容" autocomplete="off" />
                </div>
            </form>
            <div className="ButtonSet">
                <button className="close" onClick={() => navigate(-1)}>取消</button>
                <button onClick={handleSubmit} disabled={!keyWord || !formData.task}>確認</button>
            </div>
        </div>
    )
}

export default AddMaintenance