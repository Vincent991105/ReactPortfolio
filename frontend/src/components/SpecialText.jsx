import { useRef } from 'react';
import './css/SpecialText.css';

function SpecialText({ children }) {
    const wrapperRef = useRef(null);

    const handleMouseMove = (e) => {
        // 這部分的邏輯完全正確，無需改動
        if (!wrapperRef.current) return;
        const rect = wrapperRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        wrapperRef.current.style.setProperty('--x', `${x}%`);
        wrapperRef.current.style.setProperty('--y', `${y}%`);
    };

    return (
        <div 
            ref={wrapperRef} 
            className="text-hover-wrapper" 
            onMouseMove={handleMouseMove}
        >
            {/* 底層文字 (預設顏色) */}
            <div className="text-base">
                {children}
            </div>

            {/* 上層文字 (滑鼠滑過時的顏色)
              這裡也渲染完全相同的 children，確保結構一致
            */}
            <div className="text-overlay" aria-hidden="true">
                {children}
            </div>
        </div>
    );
}

export default SpecialText;