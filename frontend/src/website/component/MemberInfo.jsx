import SecretLog from "./common/SecretLog";
import CustomReport from "./CustomReport";
import Shortcut from "./Shortcut";
import { useMediaQuery } from "react-responsive";

function MemberInfo() {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  return (
    <div className="MemberInfo">
      {!isMobile && (
        <div className="Title">
          <h3>個人資訊</h3>
        </div>
      )}
      <div className="MI_Content">
        <div className="AccountData">
          <div className="SubTitle">
            <h3>
              歡迎，<span id="name">陳添榮</span> <span>先生</span>
            </h3>
            {/* <p>2025/07/19 14:23</p> */}
          </div>
          <SecretLog title="國內" unit="NT$" data="100" />
          <SecretLog title="國外" unit="US$" data="200" />
        </div>
        <Shortcut />
        {!isMobile && <CustomReport />}
      </div>
    </div>
  );
}

export default MemberInfo;
