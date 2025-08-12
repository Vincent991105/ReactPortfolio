import IconButton from "./common/IconButton";
import {
  FaMoneyBillAlt,
  FaExchangeAlt,
  FaPiggyBank,
  FaCreditCard,
} from "react-icons/fa";

function SelectShortcut({ select, setSelect, setOpen }) {
  const data = [
    {
      icon: <FaMoneyBillAlt />,
      title: "即時轉帳",
      backgroundColor: "#9C72C1",
    },
    { icon: <FaExchangeAlt />, title: "貨幣兌換", backgroundColor: "#72C1A4" },
    { icon: <FaPiggyBank />, title: "儲蓄管理", backgroundColor: "#C17272" },
    { icon: <FaCreditCard />, title: "信用卡繳費", backgroundColor: "#7288C1" },
  ];

  // 切換選擇狀態
  const toggleSelect = (item) => {
    setSelect((prev) => {
      const exists = prev.find((s) => s.title === item.title);
      if (exists) {
        return prev.filter((s) => s.title !== item.title);
      } else {
        return [...prev, item];
      }
    });
  };

  return (
    <div className="SelectShortcut">
      <div className="SubTitle">
        <h3>選擇快捷按鈕</h3>
        <p onClick={() => setOpen(false)}>X</p>
      </div>
      <div className="SS_List">
        {data.map((item, index) => (
          <IconButton
            key={index}
            icon={item.icon}
            title={item.title}
            backgroundColor={item.backgroundColor}
            select={!!select?.find((s) => s.title === item.title)}
            onClick={() => toggleSelect(item)}
          />
        ))}
      </div>
    </div>
  );
}

export default SelectShortcut;
