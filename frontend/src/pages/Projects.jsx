import ProjectItem from "../components/common/ProjectItem"

function Projects(){

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