import { useSpring, animated } from "@react-spring/web";
import { GiEarthCrack } from "react-icons/gi";
import { IoBarChartSharp } from "react-icons/io5";
import './css/DisasterComponents.css'

function DisasterComponents({
  type,
  isData,
  isSelected,
  onToggle,
  chooseDisaster,
  healthlimit,
  sData
}) {
  // 動畫效果
  const { x } = useSpring({
    x: isSelected ? 0 : 1,
    config: { duration: 1000 },
  });

  if (!isData) {
    return null;
  }

  return (
    <div className="DisasterComponents">
      <div className="Info">
        <div className="DisasterRank">
          {type === "earthquake" && (
            <>
              <p>芮氏規模</p>
              <h4>{isData.magnitudeValue}</h4>
            </>
          )}
          {type === "typhoon" && (
            <>
              <p>颱風規模</p>
              <h4>{isData.maxIntensity}</h4>
            </>
          )}
        </div>
        <div className="data">
          <h4 onClick={() => chooseDisaster(isData)}>
            {chooseDisaster && (
              <IoBarChartSharp
                style={{ fontSize: "20px", lineHeight: "20px" }}
              />
            )}
            {type === "earthquake" && `地震：${isData.id}`}
            {type === "typhoon" && `颱風：${isData.chtName}`}
          </h4>
          {type === "earthquake" && (
            <p>
              {isData.originTime} ~ {isData.endTime}
            </p>
          )}
          {type === "earthquake" && isData.latitude && isData.longitude && (
            <div onClick={() => onToggle(isData)}>
              <animated.div
                className="earthBTN"
                style={{
                  color: "white",
                  opacity: x.to({ range: [0, 1], output: [0.3, 1] }),
                  scale: x.to({
                    range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
                    output: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1],
                  }),
                }}
              >
                <GiEarthCrack style={{ lineHeight: 1.1 }} />
                震央
              </animated.div>
            </div>
          )}
          {type === "typhoon" && (
            <p>
              {isData.seaStartDatetime} ~ {isData.seaEndDatetime}
            </p>
          )}
        </div>
      </div>
      <div
        className="result"
        style={{
          backgroundColor:
            isData.postEventHealth >= (healthlimit?.alert ?? 80)
              ? "#9DCD7B"
              : isData.postEventHealth >= (healthlimit?.move ?? 60)
              ? "#FFD700"
              : "#FF6347",
        }}
      >
        <p>健康度</p>
        <span>{isData.postEventHealth}%</span>
      </div>
    </div>
  );
}

export default DisasterComponents;
