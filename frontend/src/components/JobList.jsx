import { useState } from "react";
import JobItem from "./common/JobItem";
import './css/JobList.css';

function JobList() {
  const [hoverIndex, setHoverIndex] = useState(null);

  const jobs = [
    {
      time: "2024 - 現在",
      title: "前端工程師 - Mitac神耀科技",
      desc: "負責專案需求規劃、介面設計及前端開發工作，協助建置專案關鍵前端功能。與專案經理及設計團隊密切合作，推動網站易用性與無障礙最佳實務，打造高品質且貼近使用者需求的介面體驗。",
      logo: "/Mitac.png"
    },
    {
      time: "2022 - 2024",
      title: "專案助理 - 和盟電子商務",
      desc: "負責專案需求規劃、介面設計與協調，協助使用者測試與交付驗收。密切與專案經理及設計團隊合作，確保產品符合需求並提升使用體驗。",
      logo: "/Partner.png"
    }
  ];

  return (
    <div className="JobList">
      {jobs.map((job, index) => (
        <JobItem
          key={index}
          {...job}
          isHovered={hoverIndex === index}
          isDimmed={hoverIndex !== null && hoverIndex !== index}
          onMouseEnter={() => setHoverIndex(index)}
          onMouseLeave={() => setHoverIndex(null)}
        />
      ))}
    </div>
  );
}

export default JobList;
