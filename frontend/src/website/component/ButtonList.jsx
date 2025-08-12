import TextButton from "./common/TextButton";
import { FaMoneyBillTransfer } from "react-icons/fa6";

function ButtonList() {
  return (
    <div className="ButtonList">
      <TextButton
        icon={<FaMoneyBillTransfer />}
        title="金錢自由"
        color="#7294C1"
        hover="#009043"
      />
      <TextButton
        icon={<FaMoneyBillTransfer />}
        title="金錢自由"
        color="#7294C1"
        hover="#009043"
      />
      <TextButton
        icon={<FaMoneyBillTransfer />}
        title="金錢自由"
        color="#7294C1"
        hover="#009043"
      />
      <TextButton
        icon={<FaMoneyBillTransfer />}
        title="金錢自由"
        color="#7294C1"
        hover="#009043"
      />
    </div>
  );
}

export default ButtonList;
