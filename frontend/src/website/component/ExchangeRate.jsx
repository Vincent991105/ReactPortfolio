import { useState } from "react";
import ExchangeReport from "./ExchangeReport";
import { useMediaQuery } from "react-responsive";

function ExchangeRate() {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const data = [
    { unit: "美金 USD", buy: 31.42, sell: 31.92 },
    { unit: "歐元 EUR", buy: 34.25, sell: 34.85 },
    { unit: "日圓 JPY", buy: 0.21, sell: 0.23 },
    { unit: "英鎊 GBP", buy: 39.1, sell: 39.7 },
    { unit: "港幣 HKD", buy: 4.0, sell: 4.12 },
    { unit: "澳幣 AUD", buy: 20.5, sell: 21.1 },
    { unit: "加幣 CAD", buy: 22.3, sell: 22.9 },
    { unit: "新加坡幣 SGD", buy: 23.7, sell: 24.2 },
  ];

  const [select, setSelect] = useState("美金 USD");

  return (
    <div className="ExchangeRate">
      <div className="Table" style={{ width: isMobile ? "" : "40%" }}>
        <div className="TableHeader">
          <h3>錢幣</h3>
          <h3>買入</h3>
          <h3>賣出</h3>
        </div>
        <div className="TableBody">
          {data.map((item, index) => (
            <div
              className={`RowItem Hover ${
                select === item.unit ? "Active" : ""
              }`}
              key={index}
              onClick={() => setSelect(item.unit)}
            >
              <h4>{item.unit}</h4>
              <h4>{item.buy}</h4>
              <h4>{item.sell}</h4>
            </div>
          ))}
        </div>
      </div>
      <ExchangeReport title={select} />
    </div>
  );
}

export default ExchangeRate;
