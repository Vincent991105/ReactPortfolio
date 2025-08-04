import './css/HistoryProject.css'
import Html from '../assets/SVG/Html.svg?react'
import Js from '../assets/SVG/Js.svg?react'
import Css from '../assets/SVG/Css.svg?react'
import Figma from '../assets/SVG/Figma.svg?react'
import React from '../assets/SVG/React.svg?react'
import Vite from '../assets/SVG/Vite.svg?react'
import SkillItem from './common/SkillItem'
import ProjectItem from './common/ProjectItem'
import { useEffect, useRef, useState } from 'react'

function HistoryProject() {
    const [activeSkills, setActiveSkills] = useState([]);
    const [activeIndex, setActiveIndex] = useState(null); // <--- 加這行
    const itemRefs = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    const index = Number(entry.target.dataset.index);
                    if (entry.isIntersecting) {
                        setActiveSkills(projectData[index].catogary);
                        setActiveIndex(index); // <--- 更新 activeIndex
                    }
                });
            },
            {
                threshold: 1,
            }
        );

        itemRefs.current.forEach(ref => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, []);

    const projectData = [
        {
            year:2024,
            name: '橋樑監控網站開發',
            job: '前端工程師',
            desc: '負責網站前端功能開發與介面優化，配合設計團隊完成高易用性與無障礙標準，提升使用者體驗。',
            catogary: ['Figma', 'Css', 'React'],
        },
        {
            year:2024,
            name: '福記蛋煮制預測網站',
            job: '前端工程師',
            desc: '負責後台功能開發，實作資料登打及預測結果顯示，確保使用者能方便輸入數據並即時查看預測分析。',
            catogary: ['Html', 'Css', 'Js'],
        },
        {
            year:2022,
            name: 'IopenMall網站開發',
            job: '專案助理',
            desc: '負責專案需求規劃、介面設計協調與使用者測試，協助推動產品順利交付及優化使用者體驗。',
            catogary: ['Figma'],
        }
    ];

    const skill = [
        { name: 'Html', item: <Html /> },
        { name: 'Js', item: <Js /> },
        { name: 'Css', item: <Css /> },
        { name: 'Figma', item: <Figma /> },
        { name: 'React', item: <React /> },
        // { name: 'Vite', item: <Vite /> },
    ];

    return (
        <div className="HistoryProject">
            <div className="List">
                {projectData.map((proj, idx) => (
                    <div
                        key={idx}
                        ref={el => (itemRefs.current[idx] = el)}
                        data-index={idx}
                        className={`ProjectItem ${activeIndex === idx ? 'active' : ''}`}
                    >
                        <ProjectItem data={proj} reverse={idx % 2 === 1} />
                    </div>
                ))}
            </div>
            <div className="Skill">
                {skill.map((skill, idx) => (
                    <SkillItem
                        key={idx}
                        item={skill.item}
                        active={activeSkills.includes(skill.name)}
                    />
                ))}
            </div>
        </div>
    );
}

export default HistoryProject