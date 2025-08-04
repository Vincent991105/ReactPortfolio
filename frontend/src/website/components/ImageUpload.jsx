import React, { useState, useRef, useEffect } from 'react';
import { Cropper } from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { AiFillFileUnknown } from "react-icons/ai";

function ImageUpload({type, saveImage, setSaveImage}) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const cropperRef = useRef(null); // 引用 Cropper 實例

    // 處理文件選擇
    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setSaveImage(null);
            setSelectedFile(file);
            const filePreview = URL.createObjectURL(file);
            setPreview(filePreview);
        }
    };

    // 處理裁剪
    const handleCrop = () => {
        if (!cropperRef.current) {
            alert('無法進行裁剪！');
            return;
        }
        const croppedImageDataURL = cropperRef.current.cropper.getCroppedCanvas().toDataURL();
        setPreview(croppedImageDataURL); // 更新預覽為裁剪後的圖片
        alert('裁剪完成！');
    };

    const SavePicture = () => {
        if (!cropperRef.current) {
            alert('無法進行裁剪！');
            return;
        }

        // 取得裁剪後的圖片資料
        const croppedImageDataURL = cropperRef.current.cropper.getCroppedCanvas().toDataURL();
    
        // 取得裁剪後的圖片資料
        cropperRef.current.cropper.getCroppedCanvas().toBlob((blob) => {
            if (!blob) {
                alert('裁剪失敗，無法生成檔案！');
                return;
            }
    
            // 將 Blob 轉換為 File
            const fileName = `cropped-image-${Date.now()}.png`; // 可自定義檔名
            const file = new File([blob], fileName, { type: blob.type });
    
            // 保存檔案
            setSaveImage({base64:croppedImageDataURL,file:file});
    
            // 清空預覽（可選）
            setPreview(null);
    
            alert('圖片已裁剪並保存為文件！');
        }, 'image/png'); // 第二個參數可選，指定圖片格式
    };

    if(type='new'){
        return (
            <div className="InputBlock">
                <div className="title">
                    <h4>橋梁圖片:</h4>
                    <button type="button" onClick={() => document.getElementById('fileInput').click()}>
                        選擇圖片
                    </button>
                    <input
                        id="fileInput"
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                </div>
                <div className="ImageBox">
                    {!preview && !saveImage &&  (<> <AiFillFileUnknown fontSize={80} /><h4>尚未上傳圖檔</h4> </>)}
                    {preview && (
                        <Cropper
                            src={preview}
                            aspectRatio={3.23 / 1} // 裁剪比例
                            guides={false} // 隱藏裁剪框內的輔助線
                            viewMode={1}
                            autoCropArea={1}
                            zoomable={false} // 禁用縮放功能
                            ref={cropperRef}
                        />
                    )}
                    {saveImage && (<img src={saveImage.base64 ? saveImage.base64 : `/image/bridge/${saveImage}`} alt="橋梁圖片" />)}
                    {preview && (
                        <div className='CropButton'>
                            <button type="button" onClick={handleCrop}>
                                裁剪圖片
                            </button>
                            <button type="button" onClick={() => SavePicture()}>
                                上傳圖片
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    }else{
        return (
            <div className="InputRow">
                <div className="Input">
                    <div className="ImageUpdate">
                        <label>橋梁圖片</label>
                        <button type="button" onClick={() => document.getElementById('fileInput').click()}>
                            選擇圖片
                        </button>
                        <input
                            id="fileInput"
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                    </div>
                    <div className="ImageBox">
                        {!preview && !saveImage &&  (<> <AiFillFileUnknown fontSize={80} /><h4>尚未上傳圖檔</h4> </>)}
                        {preview && (
                            <Cropper
                                src={preview}
                                aspectRatio={3.23 / 1} // 裁剪比例
                                guides={false} // 隱藏裁剪框內的輔助線
                                viewMode={1}
                                autoCropArea={1}
                                zoomable={false} // 禁用縮放功能
                                ref={cropperRef}
                            />
                        )}
                        {saveImage && (<img src={saveImage.base64 ? saveImage.base64 : `/image/bridge/${saveImage}`} alt="橋梁圖片" />)}
                        {preview && (
                            <div className='CropButton'>
                                <button type="button" onClick={handleCrop}>
                                    裁剪圖片
                                </button>
                                <button type="button" onClick={() => SavePicture()}>
                                    上傳圖片
                                </button>
                            </div>
                        )}
                    </div>
                    
                </div>
            </div>
        );
    }
    
}

export default ImageUpload;