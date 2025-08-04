import React, { useState, useEffect, useContext } from "react";
import ImageUpload from '../components/ImageUpload';
import axios from "../../config/aioxsConfig";
import { BridgeContext } from "../context/BridgeContext";
import { PopupContext } from '../context/PopupContext'

function EditBridge({bridgeData}){
    const{fetchBridges} = useContext(BridgeContext)
    const{isOpen, changeEdit} = useContext(PopupContext)


    const [previewData, setpreviewData] = useState({});
    const [searchFailed, setSearchFailed] = useState(false); // 狀態控制搜尋失敗提示
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [saveImage, setSaveImage] = useState(null);

    // 初始化資料表
    const [formData, setFormData] = useState({
        bno:'test',
        name: '',
        latitude: '',
        longitude: '',
        city: '桃園市',
        district: '中壢區',
    });

    // 設定錯誤提示
    const [errors, setErrors] = useState({}); // 儲存欄位錯誤資訊

    useEffect(() => {console.log(errors)},[errors])

    // 當表單欄位變更時動態更新錯誤
    useEffect(() => {
        const newErrors = {};
        
        // 遍历表单字段并验证
        Object.keys(formData).forEach((key) => {
            const value = formData[key];
            if (typeof value === 'string' && !value.trim()) {
                newErrors[key] = true; // 标记錯誤並添加提示
            } else if (value === null || value === undefined) {
                newErrors[key] = true;
            }
        });

        // 验证图像是否存在
        if (!saveImage) {
            newErrors["image"] = true; // 标记圖像欄位錯誤
        }

        // 更新错误状态（如果没有错误则清空）
        setErrors(Object.keys(newErrors).length ? newErrors : {});
    }, [formData, saveImage]); // 包含 formData 和 saveImage

    // 如果是編輯狀態，載入現有的橋梁資料
    useEffect(() => {
        if (isOpen.mode === 'edit' && bridgeData) {
            setFormData((prev) => ({
                ...prev,
                name: bridgeData.name || prev.name,
                latitude: bridgeData.latitude || prev.latitude,
                longitude: bridgeData.longitude || prev.longitude,
                city: bridgeData.city || prev.city,
                district: bridgeData.district || prev.district,
            }));
            setQuery(bridgeData.name)
            setSaveImage(bridgeData.photoName)
        }
    }, [isOpen, bridgeData]);

    // 填寫資料時更動送出表單的資料
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // 裁切圖檔儲存
    useEffect(() => {
        if(saveImage && saveImage.file){
            setFormData((prevData) => ({
                ...prevData,
                photo:saveImage.file
            }))
        }
    },[saveImage])

    // API呼叫與回傳資料
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (Object.keys(errors).length > 0) {
            return;
        }

        if(isOpen.mode === 'add'){
            try {
                const response = await axios.post(`http://${window.location.hostname}:8000/api/bridges/`, formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data', // axios 會自動設定，但你可以手動指定
                        },
                    }
                );
                alert('成功')
                changeEdit('', '', '');
                fetchBridges()
            } catch (error) {
                console.log(formData)
                alert('失敗')
                console.error('Error uploading form data:', error);
            }
        } else if (isOpen.mode === 'edit'){
            try {
                const response = await axios.put(`http://${window.location.hostname}:8000/api/bridges/${bridgeData.id}/`, formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data', // axios 會自動設定，但你可以手動指定
                        },
                    }
                );
                alert('成功')
                changeEdit('', '', '');
                fetchBridges()
            } catch (error) {
                console.log(formData)
                alert('失敗')
                console.error('Error uploading form data:', error);
            }
        }

        
    };

    // 搜尋橋樑當 previewData 更新時，自動同步到 formData
    useEffect(() => {
        if (previewData && Object.keys(previewData).length > 0) {
            setFormData((prevData) => ({
                ...prevData,
                ...previewData, // 將 previewData 的數據合併到 formData
            }));
        }
    }, [previewData]);

    const [checkInput, setcheckInput] = useState(null);

    const checkInputBox = (e) => {
        const newId = e.target.id;
        setSearchFailed(false);
        setcheckInput((prev) => (prev === newId ? prev : newId)); // 避免重複更新相同的值
    };


    //下列資料為進階功能

    // 模拟数据，可以根据实际需求改为从 API 获取数据
    const data = [];
    const database = [
        {
            name:'Apple',
            latitude:23.123,
            longitude:124.13121
        },
        {
            name:'Orange',
            latitude:23.123,
            longitude:124.13121
        },
    ];

    const handleInputChange2 = (e) => {
        const value = e.target.value;
        setQuery(value);
        setFormData({ ...formData, name: value });
        
        if (value) {
            const filteredResults = data.filter(item =>
            item.toLowerCase().includes(value.toLowerCase())
            );
            setResults(filteredResults);
        } else {
            setResults([]);
        }
    };

    // 选择某一项
    const handleSelect = (item) => {
        setQuery(item);
        setResults([]); // 清空结果

        const filteredData = database.filter(i => i.name === item);
        
        if (filteredData.length > 0) {
            const selectedItem = filteredData[0]; // 选择的对象
            setFormData({
                ...formData, 
                name: selectedItem.name, 
                latitude: selectedItem.latitude, 
                longitude: selectedItem.longitude
            });
        }
    };

    return (
    <div className="EditData">
        <div className="ModalContent">
            <div className="title">
                <h2>{isOpen.mode === "add" ? "新增資料" : "編輯資料"}</h2>
                <button className="close-button" onClick={() => changeEdit('','','')}>×</button>
            </div>
            <div className="EditForm">
                <form id="bridgeForm" className="Form" onSubmit={handleSubmit}>
                    <div className="InputRow">
                        <div className="Input">
                            <label>橋梁名稱</label>
                            <div className="BridgeInput">
                                <input type="text" id="BridgeName" name='name' placeholder='請輸入橋梁名稱(ex:南門橋)' onChange={handleInputChange2} onClick={checkInputBox} value={query} autocomplete="off"/>
                                {/* <button type='button' onClick={handleSearchBridge}>搜尋橋梁</button> */}
                                {results.length > 0 && (
                                <ul className="bridgeFinder">
                                    {results.map((result, index) => (
                                    <li
                                        key={index}
                                        onClick={() => handleSelect(result)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {result} {/* 显示你想要的字段 */}
                                    </li>
                                    ))}
                                </ul>)
                                }
                            </div>
                        </div>
                    </div>
                    <div className="InputRow">
                        <div className="Input">
                            <label>經度</label>
                            <input type="text" id="latitude" name='latitude' placeholder='請輸入經度(ex:23.41521)' onChange={handleInputChange} onClick={checkInputBox} value={formData.latitude}/>
                        </div>
                        <div className="Input">
                            <label>緯度</label>
                            <input type="text" id="longitude" name='longitude' placeholder='請輸入緯度(ex:124.13521)' onChange={handleInputChange} onClick={checkInputBox} value={formData.longitude}/>
                        </div>
                    </div>
                    <div className="InputRow">
                        <div className="Input">
                            <label>縣市</label>
                            <select name="city" id="City" value={formData.city} onChange={handleInputChange}>
                                <option value="桃園市">桃園市</option>
                            </select>
                            {/* <input type="text" id="City" name='city'  onChange={handleInputChange} onClick={checkInputBox} value={formData.city}/> */}
                        </div>
                        <div className="Input">
                            <label>區域</label>
                            <select name="district" id="district" value={formData.district} onChange={handleInputChange}>
                                <option value="中壢區">中壢區</option>
                                <option value="平鎮區">平鎮區</option>
                                <option value="八德區">八德區</option>
                                <option value="楊梅區">楊梅區</option>
                                <option value="蘆竹區">蘆竹區</option>
                                <option value="龜山區">龜山區</option>
                                <option value="桃園區">桃園區</option>
                                <option value="大溪區">大溪區</option>
                                <option value="龍潭區">龍潭區</option>
                                <option value="大園區">大園區</option>
                                <option value="觀音區">觀音區</option>
                                <option value="新屋區">新屋區</option>
                                <option value="復興區">復興區</option>
                            </select>
                            {/* <input type="text" id="Area" name='area' onChange={handleInputChange} onClick={checkInputBox} value={formData.area}/> */}
                        </div>
                    </div>
                    {/* <div className="InputRow">
                        <div className="Input">
                            <label>管轄單位</label>
                            <input type="text" id="competent" name='competent' placeholder='請輸入管轄單位'/>
                        </div>
                    </div>
                    <div className="InputRow">
                        <div className="Input">
                            <label>雨量預警值(小時)</label>
                            <input type="number" id="rainWarning" name='rainWarning' placeholder="請輸入雨量預警值" max={100}/>
                        </div>
                        <div className="Input">
                            <label>雨量警戒值(小時)</label>
                            <input type="number" id="rainAlert" name='rainAlert' placeholder="請輸入雨量警戒值" max={100}/>
                        </div>
                        <div className="Input">
                            <label>雨量行動值(小時)</label>
                            <input type="number" id="rainMoving" name='rainMoving' placeholder="請輸入雨量行動值" max={100}/>
                        </div>
                    </div>
                    <div className="InputRow">
                        <div className="Input">
                            <label>雨量預警值(天)</label>
                            <input type="number" id="dailyrainWarning" name='dailyrainWarning' placeholder="請輸入雨量預警值" max={100}/>
                        </div>
                        <div className="Input">
                            <label>雨量警戒值(天)</label>
                            <input type="number" id="dailyrainAlert" name='dailyrainAlert' placeholder="請輸入雨量警戒值" max={100}/>
                        </div>
                        <div className="Input">
                            <label>雨量行動值(天)</label>
                            <input type="number" id="dailyrainMoving" name='dailyrainMoving' placeholder="請輸入雨量行動值" max={100}/>
                        </div>
                    </div> */}
                    <ImageUpload setSaveImage={setSaveImage} saveImage={saveImage}/>
                </form>
                <div className="SaveBar">
                    <div className="NoteList">
                        <div className="Note" style={{ display: checkInput === "BridgeName" ? "block" : "none" }}>
                            <h3>搜尋橋梁</h3>
                            <p>輸入橋梁完整名稱後,點選搜尋橋梁；若橋梁名稱與政府管理庫符合將自動帶入對應資料。</p>
                        </div>
                        {/* 搜尋失敗提示 */}
                        {searchFailed && (
                            <div
                                className="Note"
                                style={{ display: 'block', color: 'red'}}
                            >
                                <h3>搜尋失敗</h3>
                                <p>請協助重新輸入並進行搜尋或手動填寫下列資料。</p>
                            </div>
                        )}
                        <div className="Note">
                            <h3>重新上傳圖檔</h3>
                            <p>不建議重新上傳圖檔；因為可能導致原先設定的感測器位置出現位移。</p>
                        </div>
                        {/* 填寫資料提示 */}
                        {Object.keys(errors).length > 0 && (
                            <div className="error" id="error">
                                <h3>提醒</h3>
                                <p>請將欄位填寫完畢再進行送出!</p>
                            </div>
                        )}
                    </div>
                    <button form="bridgeForm" type="submit" disabled={Object.keys(errors).length > 0}>{isOpen.mode === "add" ? "新增" : "更新"}</button>
                </div>
            </div>
        </div>
    </div>
    )
}

export default EditBridge;