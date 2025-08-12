import BannerItem from "../component/BannerItem";
import ButtonList from "../component/ButtonList";
import ExchangeRate from "../component/ExchangeRate";
import MemberInfo from "../component/MemberInfo";
import NewList from "../component/NewList";
import { useMediaQuery } from "react-responsive";

function BankHome() {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <div className="BankHome">
      <div className="HP_Content">
        <BannerItem />
        {!isMobile && <ButtonList />}
        <NewList />
        <ExchangeRate />
      </div>
      <MemberInfo />
    </div>
  );
}

export default BankHome;
