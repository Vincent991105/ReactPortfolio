import { FaChartLine, FaChartBar } from "react-icons/fa";
import IconButton from "./common/IconButton";

function SelectReport({ select, setSelect, setOpen }) {
  const data = [
    {
      icon: <FaChartLine />,
      title: "折線圖",
      catogary: "linechart",
      backgroundColor: "#9C72C1",
    },
    {
      icon: <FaChartBar />,
      title: "長條圖",
      catogary: "barchart",
      backgroundColor: "#72C1A4",
    },
  ];

  return (
    <div className="SelectReport">
      <div className="SubTitle">
        <h3>選擇報表</h3>
        <p onClick={() => setOpen(false)}>X</p>
      </div>
      <div className="SS_List">
        {data.map((item, index) => (
          <IconButton
            key={index}
            icon={item.icon}
            title={item.title}
            backgroundColor={item.backgroundColor}
            select={select?.title === item.title}
            onClick={() => setSelect(item)}
          />
        ))}
      </div>
    </div>
  );
}

export default SelectReport;
