import { useState } from "react";
import DataChart from "./common/DataChart";
import UnknownData from "./common/UnknownData";
import SelectReport from "./SelectReport";

function CustomReport() {
  const [select, setSelect] = useState(null);
  const [open, setOpen] = useState(false);
  return (
    <div className="CustomReport">
      <div className="SubTitle">
        <h3>自訂報表</h3>
        <p onClick={() => setOpen(true)}>設定報表</p>
      </div>
      {select ? (
        <DataChart type={select.catogary} />
      ) : (
        <UnknownData message="尚未設定報表" />
      )}
      {open && (
        <div className="PopUp">
          <SelectReport
            select={select}
            setSelect={setSelect}
            setOpen={setOpen}
          />
        </div>
      )}
    </div>
  );
}

export default CustomReport;
