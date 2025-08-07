import ProjectItem from "../components/common/ProjectItem"

function Projects(){

    const projectData = [
        {
            year:2025,
            name: '台創特殊橋樑管理網站開發',
            job: '前端工程師',
            desc: '負責網站前端功能規劃與開發，提供團隊前端規劃協助及資料庫支援。',
            img:'/ProjectImage/kaohxiong.png',
            catogary: ['Figma', 'Css', 'React'],
        },
        {
            year:2024,
            name: '橋樑監控網站開發',
            job: '前端工程師',
            desc: '負責網站前端功能開發與介面優化，配合設計團隊完成高易用性與無障礙標準，提升使用者體驗。',
            img:'/ProjectImage/taoyuan.png',
            catogary: ['Figma', 'Css', 'React'],
            url:'/ProjectBridge/',
        },
        {
            year:2024,
            name: '福記蛋煮制預測網站',
            job: '前端工程師',
            desc: '負責後台功能開發，實作資料登打及預測結果顯示，確保使用者能方便輸入數據並即時查看預測分析。',
            img:'/ProjectImage/Fuji.png',
            catogary: ['Html', 'Css', 'Js'],
        },
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

    return(
        <div className="Projects">
            <div className="SearchBar">
                <input type="text" placeholder="請協助輸入搜尋內容(Ex.主題)"/>
                <div className="FilterBar">
                    <select name="year" id="year">
                        <option value="2025">2025</option>
                    </select>
                    <select name="job" id="job">
                        <option value="前端工程師">前端工程師</option>
                    </select>
                </div>
            </div>
            <div className="List">
                {projectData.map((proj,index) => {
                    return(
                        <ProjectItem data={proj} key={index}/>
                    )
                })}
            </div>
        </div>
    )
}

export default Projects