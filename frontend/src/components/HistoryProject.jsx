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
        // {
        //     year:2025,
        //     name: '台創特殊橋樑管理網站開發',
        //     job: '前端工程師',
        //     desc: '負責網站前端功能規劃與開發，提供團隊前端規劃協助及資料庫支援。',
        //     img:'/ProjectImage/kaohxiong.png',
        //     catogary: ['Figma', 'Css', 'React'],
        // },
        {
            year:2024,
            name: '橋樑監控網站開發',
            job: '前端工程師',
            desc: '負責網站前端功能開發與介面優化，配合設計團隊完成高易用性與無障礙標準，提升使用者體驗。',
            img:'/ProjectImage/taoyuan.png',
            catogary: ['Figma', 'Css', 'React'],
            url:'/ProjectBridge/',
        },
        // {
        //     year:2024,
        //     name: '福記蛋煮制預測網站',
        //     job: '前端工程師',
        //     desc: '負責後台功能開發，實作資料登打及預測結果顯示，確保使用者能方便輸入數據並即時查看預測分析。',
        //     img:'/ProjectImage/Fuji.png',
        //     catogary: ['Html', 'Css', 'Js'],
        // },
        {
            year:2024,
            name: '桃園好農遊網站開發',
            job: '專案助理',
            desc: '負責功能規劃，需求設計，使用者流程處理。',
            img:'/ProjectImage/TYfarm.png',
            catogary: ['Figma'],
            url:'https://tyfarm.tycg.gov.tw/tyfarm/',
        },
        {
            year:2023,
            name: '未來科技館網站重製',
            job: '專案助理',
            desc: '負責需求對接，元件規劃，溝通協調；從而達成專案準時且高品質交付。',
            img:'/ProjectImage/FutureTech.png',
            catogary: ['Figma'],
            url:'https://www.futuretech.org.tw/futuretech/index.php',
        },
        {
            year:2022,
            name: 'IopenMall網站開發',
            job: '專案助理',
            desc: '負責專案需求規劃、介面設計協調與使用者測試，協助推動產品順利交付及優化使用者體驗。',
            img:'/ProjectImage/IopenMall.png',
            catogary: ['Figma'],
            url:'https://mall.iopenmall.tw/iopen/',
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