import { useState, useRef } from 'react';
import { Cropper } from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { AiFillFileUnknown } from "react-icons/ai";

function ImageUpload({saveImage, setSaveImage}) {
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

        // 取得裁剪後的 Base64
        const croppedImageDataURL = cropperRef.current.cropper
            .getCroppedCanvas()
            .toDataURL('image/png');

        // 保存 Base64 到父組件
        setSaveImage(croppedImageDataURL);

        // 清空預覽
        setPreview(null);

        alert('圖片已裁剪並保存為 Base64！');
    };

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
                    {saveImage && (<img src={saveImage ? saveImage : `/image/bridge/${saveImage}`} alt="橋梁圖片" />)}
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
}

export default ImageUpload;