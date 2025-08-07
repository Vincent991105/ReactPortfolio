import { useState, useEffect } from "react";
import ImageUpload from "../component/common/ImageUpload";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MdAppSettingsAlt } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { addBridge, updateBridge } from "../store/BridgeSlice";

function AddBridge({ type }) {
    const { data } = useSelector((state) => state.ProjectBridgeData);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    //Get latitude and longitude from URL
    const [searchParams] = useSearchParams();

    // 初始化資料表
    const [formData, setFormData] = useState({
        name: type === 'edit' ? data.name : "",
        latitude: type === 'edit' ? data.latitude : searchParams.get("lat"),
        longitude: type === 'edit' ? data.longitude : searchParams.get("lng"),
        city: type === 'edit' ? data.city : searchParams.get("city"),
        district: type === 'edit' ? data.district : searchParams.get("district"),
        base64: type === 'edit' ? data.base64 : "",
        // station_id:'C0AI30',
    });

    useEffect(()=>{
        if(type === 'add'){
            setFormData((prev) => ({
            ...prev,
            latitude: searchParams.get("lat"),
            longitude: searchParams.get("lng"),
            city: searchParams.get("city"),
            district: searchParams.get("district"),
            }));
        }
    },[searchParams])

    // 設定錯誤提示
    const [errors, setErrors] = useState({}); // 儲存欄位錯誤資訊

    // 當表單欄位變更時動態更新錯誤
    useEffect(() => {
        const newErrors = {};

        // 遍历表单字段并验证
        Object.keys(formData).forEach((key) => {
        const value = formData[key];
        if (typeof value === "string" && !value.trim()) {
            newErrors[key] = true; // 标记錯誤並添加提示
        } else if (value === null || value === undefined) {
            newErrors[key] = true;
        }
        });

        // 更新错误状态（如果没有错误则清空）
        setErrors(Object.keys(newErrors).length ? newErrors : {});
    }, [formData]); // 包含 formData 和 saveImage

    // 填寫資料時更動送出表單的資料
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const setSaveImage = (data) => {
        setFormData((prevData) => ({
            ...prevData,
            base64: data,
        }));
    }

    // 回傳資料
    const handleSubmit = () => {
        if(type === 'add'){
            dispatch(addBridge(formData));      
        }else{
            dispatch(updateBridge(formData))
        }
        navigate('/ProjectBridge/bridge-monitoring/sensor-list')
    };

    return (
        <div /*className="EditData"*/ className="MachineList">
        <div className="TopBar">
            <div className="Title">
                <MdAppSettingsAlt fontSize="1.5em"/>
                <h2>{type === "add" ? "新增資料" : "編輯資料"}</h2>
            </div>
        </div>
        <div className="CatogaryBar">
            {/* <div className="CatogaryList">
            <div className="Catogary active">
                橋梁
            </div>
            <div className="Catogary">
                建物
            </div>
            <div className="Catogary">
                鄰損
            </div>
            </div> */}
            <div className="PositionDetail">
            <h4><span>縣市：</span>{formData?.city}</h4>
            <h4><span>區域：</span>{formData.district ? formData.district : ''}</h4>
            </div>
            <div className="PositionDetail">
            <h4><span>經度：</span>{formData?.latitude}</h4>
            <h4><span>緯度：</span>{formData?.longitude}</h4>
            </div>
        </div>
        <div className="InputBlock">
            <h4>建物名稱：{!formData.name && <span>輸入內容錯誤；協助確認是否符合資料.</span>}</h4>
            <input
            type="text"
            id="BridgeName"
            name="name"
            placeholder="請輸入橋梁名稱(ex:南門橋)"
            onChange={handleInputChange}
            value={formData.name}
            autocomplete="off"
            />
        </div>
        <ImageUpload setSaveImage={setSaveImage} saveImage={formData.base64} />
        <button style={{width:'100%', color:'white'}} onClick={(e) => {handleSubmit(e)}} disabled={Object.keys(errors).length > 0}>
            {type === "add" ? "新增" : "更新"}
        </button>
        </div>
    );
}

export default AddBridge;