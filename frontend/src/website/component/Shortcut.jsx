import { useState } from "react";
import IconButton from "./common/IconButton";
import SelectShortcut from "./SelectShortcut";
import {
  FaMoneyBillAlt,
  FaExchangeAlt,
  FaPiggyBank,
  FaCreditCard,
} from "react-icons/fa";
import UnknownData from "./common/UnknownData";

function Shortcut() {
  const [select, setSelect] = useState([]);

  const [open, setOpen] = useState(false);

  return (
    <div className="Shortcut">
      <div className="SubTitle">
        <h3>快捷功能</h3>
        <p onClick={() => setOpen(true)}>新增快捷</p>
      </div>
      {select.length > 0 ? (
        <div className="List">
          {select.map((item, index) => (
            <IconButton
              key={index}
              icon={item.icon}
              title={item.title}
              backgroundColor={item.backgroundColor}
            />
          ))}
        </div>
      ) : (
        <UnknownData message="尚未設定快捷鍵" />
      )}
      {open && (
        <div className="PopUp">
          <SelectShortcut
            select={select}
            setSelect={setSelect}
            setOpen={setOpen}
          />
        </div>
      )}
    </div>
  );
}

export default Shortcut;
