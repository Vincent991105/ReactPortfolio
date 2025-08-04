import axios from "../../config/aioxsConfig";
import { useState, useEffect, useContext} from "react";
import { BridgeContext } from "../context/BridgeContext";
import { PopupContext } from '../context/PopupContext'

function EditSensor({bridgeData, sensorData}){

    const{fetchfilterItems} = useContext(BridgeContext)
    const{isOpen, changeEdit} = useContext(PopupContext)

    const [formData, setFormData] = useState({
        type:"accelerometer",
        bridgeid: bridgeData.id,
        bridgeName: bridgeData.name,
        detailedLocation: null,
        ip: null,
        sensorLocation: 'deck',
        elasticity: null,
        inertia: null,
        mass: null,
        cableLength: null,
        cableMassPerLength: null,
        healthAlertIndex: null,
        healthMoveIndex: null,
        eventAlertIndex: null,
        eventMoveIndex: null,
        resultLimit: 0,
        imageCoordinate: null, // 儲存點位資料
    });

    const [errors, setErrors] = useState({}); // 儲存欄位錯誤資訊

    const [errors2, setErrors2] = useState(null);

    const [errors3, setErrors3] = useState(null);

    // 當表單欄位變更時動態更新錯誤
    useEffect(() => {
        const newErrors = {};
        Object.keys(formData).forEach((key) => {
            const value = formData[key];
    
            // 檢查 sensorLocation，根據 sensorLocation 排除不同欄位的檢查
            if (
                (formData.sensorLocation === 'pier' && (key === 'cableLength' || key === 'cableMassPerLength')) || // 若是 'pier'，跳過 'cableLength' 和 'b'
                (formData.sensorLocation === 'cable' && (key === 'elasticity' || key === 'inertia' || key === 'mass')) || // 若是 'cable'，跳過 'elasticity', 'y', 'mass'
                (formData.sensorLocation === 'deck' && (key === 'cableLength' || key === 'cableMassPerLength' || key === 'elasticity' || key === 'inertia' || key === 'mass')) // 若是 'deck'，跳過 'a', 'b', 'elasticity', 'y', 'mass'
            ) {
                return; // 跳過此欄位的檢查
            }
    
            // 檢查是否為字串並執行 trim，否則直接檢查是否為空
            if (typeof value === 'string') {
                if (!value.trim()) {
                    newErrors[key] = true;
                }
            } else if (value === null || value === undefined || value === '') {
                newErrors[key] = true;
            }
        });
    
        setErrors(newErrors);
    }, [formData]);


    // 點擊圖片新增點
    const addPoint = (event) => {
        console.log(formData.imageCoordinate)
        const img = event.target;
        if (!img) return;

        // 計算相對位置
        const rect = img.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100; // 百分比
        const y = ((event.clientY - rect.top) / rect.height) * 100;

        const newPoint = { x, y };

        // 更新 formData 中的點位資料
        setFormData((prevData) => ({
            ...prevData,
            imageCoordinate: newPoint, // 修正為 `point`，而非 `points`
        }));
    };

    // 如果是編輯狀態，載入現有的橋梁資料
    useEffect(() => {
        if (isOpen.mode === 'edit' && sensorData) {
            setFormData((prev) => ({
                ...prev,
                bridgeid: sensorData.bridgeid || prev.bridgeid,
                bridgeName: sensorData.bridgeName || prev.bridgeName,
                detailedLocation: sensorData.detailedLocation || prev.detailedLocation,
                ip: sensorData.ip || prev.ip,
                sensorLocation: sensorData.sensorLocation || prev.sensorLocation,
                elasticity: sensorData.elasticity || prev.elasticity,
                inertia: sensorData.inertia || prev.inertia,
                mass: sensorData.mass || prev.mass,
                cableLength: sensorData.cableLength || prev.cableLength,
                cableMassPerLength: sensorData.cableMassPerLength || prev.cableMassPerLength,
                healthAlertIndex: sensorData.healthAlertIndex || prev.healthAlertIndex,
                healthMoveIndex: sensorData.healthMoveIndex || prev.healthMoveIndex,
                eventAlertIndex: sensorData.eventAlertIndex || prev.eventAlertIndex,
                eventMoveIndex: sensorData.eventMoveIndex || prev.eventMoveIndex,
                resultLimit: sensorData.resultLimit || prev.resultLimit,
                imageCoordinate: sensorData.imageCoordinate || prev.imageCoordinate
            }));
        }
    }, [isOpen, sensorData]);

    // 處理表單輸入框的變化
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // 檢查 sensorLocation 是否變更，如果是，則清空 ab, xyz 欄位
        if (name === 'sensorLocation') {
            // 清空 'a', 'b', 'x', 'y', 'z' 當 'sensorLocation' 變更時
            setFormData({
                ...formData,
                [name]: value,
                cableLength: null,
                cableMassPerLength: null,
                elasticity: null,
                inertia: null,
                mass: null,
            });
        } else {
            // 普通欄位更新
            setFormData({
                ...formData,
                [name]: value
            });
        }

        // 验证逻辑
        if (name === 'healthAlertIndex' || name === 'healthMoveIndex') {
            validateValues({ ...formData, [name]: value });
        }
        // 验证逻辑
        if (name === 'eventAlertIndex' || name === 'eventMoveIndex' || name === 'resultLimit') {
            validateValues2({ ...formData, [name]: value });
        }
    };

    // 判斷安全評估係數的間距
    const validateValues = (data) => {
        const { healthAlertIndex, healthMoveIndex} = data;
    
        // 验证逻辑
        if (Number(healthMoveIndex) >= Number(healthAlertIndex)) {
            setErrors2('安全評估係數警戒值必須大於行動值！');
        } else {
            setErrors2(null); // 清除错误信息
        }
    };

    // 判斷運算數據的間距
    const validateValues2 = (data) => {
        const { eventAlertIndex, eventMoveIndex, resultLimit } = data;
    
        // 验证逻辑
        if (Number(eventMoveIndex) >= Number(eventAlertIndex)) {
            setErrors3('警戒值必須大於行動值！');
        } else if (Number(resultLimit) >= Number(eventMoveIndex)) {
            setErrors3('臨界值必須小於警戒值！');
        } else {
            setErrors3(null); // 清除错误信息
        }
    };

    // 處理表單提交
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (Object.keys(errors).length > 0) {
            return;
        }

        if (isOpen.mode === 'add') {
            try {

                let url =  `http://${window.location.hostname}:8000/api/bridges/${bridgeData.id}/sensors/`;

                console.log(formData)

                const response = await axios.post(url, formData,);
                changeEdit('', '', '');
                fetchfilterItems(bridgeData.id);
                alert('成功')
            } catch (error) {
                alert('失敗')
                console.error('Error uploading form data:', error);
            }
        } else if (isOpen.mode === 'edit') {
            try {

                let url =  `http://${window.location.hostname}:8000/api/bridges/${bridgeData.id}/sensors/${sensorData.id}/`;

                const response = await axios.put(url, formData,);
                changeEdit('', '', '');
                fetchfilterItems(bridgeData.id);
                alert('成功')
            } catch (error) {
                alert('失敗')
                console.error('Error uploading form data:', error);
            }
        }
    };

    const [checkInput, setcheckInput] = useState(null);

    const checkInputBox = (e) => {
        const newId = e.target.id;
        setcheckInput((prev) => (prev === newId ? prev : newId)); // 避免重複更新相同的值
    };

    return (
    <div className="EditData" >
        <div className="ModalContent">
            <div className="title">
                <h2>{isOpen.mode === "add" ? "新增感測器" : "編輯感測器"}</h2>
                <button className="close-button" onClick={() => changeEdit('','')}>×</button>
            </div>
            <div className="EditForm">
                <form id="bridgeForm" className="Form" onSubmit={handleSubmit}>
                    <div className="InputRow">
                        <div className="Input">
                            <label>橋梁名稱</label>
                            <input type="text" id="bridgeName" name='bridgeName' onClick={checkInputBox} value={formData.bridgeName} disabled/>
                        </div>
                        <div className="Input">
                            <label>安裝位置</label>
                            <input type="text" id="detailedLocation" name='detailedLocation' placeholder='請輸入預計安裝位置' onChange={handleInputChange} onClick={checkInputBox} value={formData.detailedLocation}/>
                        </div>
                    </div>
                    <div className="InputRow">
                        <div className="Input">
                            <label>IP</label>
                            <input type="number" id="Ip" name='ip' placeholder='請輸入感測器IP' onChange={handleInputChange} onClick={checkInputBox} value={formData.ip}/>
                        </div>
                    </div>
                    <div className="InputRow">
                        <div className="Input">
                            <label>構件樣態</label>
                            <select id="sensorLocation" name='sensorLocation' value={formData.sensorLocation || ""} onChange={handleInputChange} disabled={isOpen.mode === 'edit'}>
                                <option value='deck'>Deck</option>
                                <option value='pier'>Pier</option>
                                <option value='cable'>Cable</option>
                            </select>
                        </div>
                    </div>
                    {/* Pier */}
                    {formData.sensorLocation === 'pier' && <div className="InputRow">
                        <div className="Input">
                            <label>楊氏模數</label>
                            <input type="number" id="elasticity" name='elasticity' placeholder='請輸入楊氏模數' onChange={handleInputChange} onClick={checkInputBox} value={formData.elasticity}/>
                        </div>
                        <div className="Input">
                            <label>斷面慣性距</label>
                            <input type="number" id="inertia" name='inertia' placeholder='請輸入斷面慣性距' onChange={handleInputChange} onClick={checkInputBox} value={formData.inertia}/>
                        </div>
                        <div className="Input">
                            <label>質量</label>
                            <input type="number" id="mass" name='mass' placeholder='請輸入質量' onChange={handleInputChange} onClick={checkInputBox} value={formData.mass}/>
                        </div>
                    </div>}
                    {/* cable */}
                    {formData.sensorLocation === 'cable' && <div className="InputRow">
                        <div className="Input">
                            <label>鋼索長度</label>
                            <input type="number" id="cableLength" name='cableLength' placeholder='請輸入鋼索長度' onChange={handleInputChange} onClick={checkInputBox} value={formData.cableLength}/>
                        </div>
                        <div className="Input">
                            <label>鋼索線性密度</label>
                            <input type="number" id="cableMassPerLength" name='cableMassPerLength' placeholder='請輸入鋼索線性密度' onChange={handleInputChange} onClick={checkInputBox} value={formData.cableMassPerLength}/>
                        </div>
                    </div>}
                    <div className="InputRow">
                        <div className="Input">
                            <label>安全評估係數警戒值</label>
                            <input type="number" id="healthAlertIndex" name='healthAlertIndex' placeholder='請輸入安全評估係數警戒值' onChange={handleInputChange} onClick={checkInputBox} value={formData.healthAlertIndex}/>
                        </div>
                        <div className="Input">
                            <label>安全評估係數行動值</label>
                            <input type="number" id="healthMoveIndex" name='healthMoveIndex' placeholder='請輸入安全評估係數行動值' onChange={handleInputChange} onClick={checkInputBox} value={formData.healthMoveIndex}/>
                        </div>
                    </div>
                    <div className="InputRow">
                        <div className="Input">
                            <label>{formData.sensorLocation === "pier" ? "有效長度" : formData.sensorLocation === "cable" ? "索力" :  "撓度"}警戒值</label>
                            <input type="number" id="eventAlertIndex" name='eventAlertIndex' placeholder={`輸入${formData.sensorLocation === "pier"? "有效長度" : formData.sensorLocation === "cable"? "索力": "撓度"}警戒值`} max={100} onChange={handleInputChange} onClick={checkInputBox} value={formData.eventAlertIndex}/>
                        </div>
                        <div className="Input">
                            <label>{formData.sensorLocation === "pier" ? "有效長度" : formData.sensorLocation === "cable" ? "索力" :  "撓度"}行動值</label>
                            <input type="number" id="eventMoveIndex" name='eventMoveIndex' placeholder={`輸入${formData.sensorLocation === "pier"? "有效長度" : formData.sensorLocation === "cable"? "索力": "撓度"}行動值`} onChange={handleInputChange} onClick={checkInputBox} value={formData.eventMoveIndex}/>
                        </div>
                        <div className="Input">
                            <label>{formData.sensorLocation === "pier" ? "有效長度" : formData.sensorLocation === "cable" ? "索力" :  "撓度"}臨界值</label>
                            <input type="number" id="resultLimit" name='resultLimit' placeholder={`輸入${formData.sensorLocation === "pier"? "有效長度" : formData.sensorLocation === "cable"? "索力": "撓度"}臨界值`} onChange={handleInputChange} onClick={checkInputBox} value={formData.resultLimit}/>
                        </div>
                    </div>
                    <div className="InputRow">
                        <div className="Input">
                            <div className='ImageUpdate'>
                                <label>設定點位</label>
                            </div>
                            <div className="ImageBox" onClick={addPoint}>
                                <img src={`/image/bridge/${bridgeData.photoName}`} alt="橋梁圖片"/>
                                {formData.imageCoordinate && (
                                    <div
                                        className="point"
                                        style={{
                                            left: `${formData.imageCoordinate.x}%`,
                                            top: `${formData.imageCoordinate.y}%`,
                                            backgroundColor: 'red', // 設置顏色
                                            position: 'absolute',
                                        }}
                                        onClick={(e) => {
                                            e.stopPropagation(); // 防止事件冒泡
                                        }}
                                    ></div>
                                )}
                            </div>
                        </div>
                    </div>
                </form>
                <div className="SaveBar">
                    <div className="NoteList">
                        <div className="Note" style={{ display: checkInput === "detailedLocation" ? "block" : "none" }}>
                            <h3>欄位說明</h3>
                            <p>此欄位限制僅能輸入數字及下劃底線；同時請確保並未輸入違法字眼，本產品維護單位可依法呈報未法內容。</p>
                        </div>
                        <div className="Note">
                            <h3>重新定位</h3>
                            <p>直接在圖上進行點擊將進行重新定位的動作。</p>
                        </div>
                        {/* 填寫資料提示 */}
                        {Object.keys(errors).length > 0 && (
                            <div className="error" id="error">
                                <h3>提醒</h3>
                                <p>請將欄位填寫完畢再進行送出!</p>
                            </div>
                        )}
                        {errors2 && (<div className="error" id="error2">
                            <h3>提醒</h3>
                            <p>{errors2}</p>
                        </div>)}
                        {errors3 && (<div className="error" id="error3">
                            <h3>提醒</h3>
                            <p>{formData.sensorLocation === "pier"? "有效長度" : formData.sensorLocation === "cable"? "索力": "撓度"}{errors3}</p>
                        </div>)}
                    </div>
                    <button form="bridgeForm" type="submit" disabled={Object.keys(errors).length > 0 || errors2 || errors3}>{isOpen.mode === "add" ? "新增" : "更新"}</button>
                </div>
            </div>
        </div>
    </div>
    )
}

export default EditSensor;