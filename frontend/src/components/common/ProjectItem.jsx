import '../css/ProjectItem.css'

function ProjectItem({data , reverse}){
    return(
        <div className={`ProjectItem ${reverse ? 'reverse' : ''}`}>
            <img src="/login.jpg" alt="demo" />
            <div className="Context">
                <h3>{data.year} - {data.name}</h3>
                <h4>{data.job}</h4>
                <p>{data.desc}</p>
                {/* <div className="ButtonSet">
                    <h3>介面設計圖</h3>
                    <h3>介面設計圖</h3>
                </div> */}
            </div>
        </div>
    )
}

export default ProjectItem