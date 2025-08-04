import Banner from "../components/Banner"
import HistoryProject from "../components/HistoryProject"
import JobList from "../components/JobList"
import SpecialText from "../components/SpecialText"

function Home(){
    return(
        <div className="Home">
            {/* <div className="Header">
                <h1>Hi I Am <span>Vincent</span></h1>
                <div className="SideTitle">
                    <h2>FrontEnd-Developer</h2>
                    <h2>創造一個屬於我的【領域】</h2>
                </div>
            </div> */}
            <Banner />
            {/* <img src="demo.jpg" alt="demo"  style={{height:'500px',opacity:'1',objectFit:'cover'}}/> */}
            <div className="Context">
                <SpecialText>
                    <p>嗨，我是一名前端工程師，熱愛打造兼具設計感與易用性的網頁介面。</p>
                    <p>我擅長使用 React.js、Vue 和 Redux，專注在讓使用者操作順暢、界面清晰的開發細節上。對我而言，「易用性」不只是設計目標，更是產品成功的關鍵。</p>
                    <p>目前在神耀科技擔任 AI 網站專案的前端工程師，負責功能與介面規劃、前端開發及 API 串接。過去我也曾擔任 PM，負責統一集團 B2B2C 平台的行銷模組與前後台規劃，具備跨角色的產品思維。</p>
                    <p>最讓我自豪的，是曾成功讓一個停擺中的橋梁維護專案重啟。我從 0 開始重新規劃前端，開發了地圖橋梁標註、圖表即時顯示、報表生成等功能，最後順利交付並重新獲得客戶信任。</p>
                    <p>工作之外，我喜歡唱歌、玩策略桌遊，也享受吹著海風、品嘗一口剛出爐的舒芙蕾的悠閒時光。這些生活的片刻，給我靈感，也讓我更在意每一個使用者互動的細節。</p>
                </SpecialText>
                <SpecialText>
                    <p>Hi, I’m a front-end developer who loves building user interfaces that strike a balance between thoughtful design and intuitive usability.</p>
                    <p>I specialize in React.js, Vue, and Redux, with a strong focus on crafting smooth user experiences and clean, maintainable code. To me, usability isn’t just a goal — it’s a core principle of building great products.</p>
                    <p>Currently, I’m a front-end engineer at Shenyao Tech, working on AI-related web projects. I’m responsible for interface planning, front-end development, and API integration. Previously, I also worked as a project manager, leading the design of marketing features and back-office systems for a B2B2C platform at Uni-President Group.</p>
                    <p>One of my proudest accomplishments was reviving a stalled bridge maintenance platform project. I redesigned and rebuilt the front end from the ground up, developing features like map-based bridge tagging, real-time charting, and report generation — ultimately regaining client trust and delivering a successful relaunch.</p>
                    <p>Outside of work, I enjoy singing, playing strategy board games, and spending slow moments by the ocean breeze with a warm, fluffy soufflé in hand. These little joys inspire me and remind me why the details of every user interaction matter so much.</p>
                </SpecialText>
            </div>
            <JobList />
            <HistoryProject />
        </div>
    )
}

export default Home