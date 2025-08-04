import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTools } from "react-icons/fa";
import { BridgeContext } from "../context/BridgeContext";
import { RecordContext } from "../context/RecordContext";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { AiFillFileUnknown } from "react-icons/ai";
import { PopupContext } from "../context/PopupContext";

const RepairTable = () => {
  const { dataTime } = useContext(BridgeContext);
  const { repairData, searchBridge, keyWord } = useContext(RecordContext);
  const { changeEdit } = useContext(PopupContext);

  const navigate = useNavigate();

  useEffect(() => {
    searchBridge("");
  }, []);

  const [activeFeature, setActiveFeature] = useState({
    solved: true,
    unsolved: true,
  });

  const [repairList, setRepairList] = useState([]);
  const [searchItem, setSearchItem] = useState("");

  useEffect(() => {
    setSearchItem(keyWord);
  }, [keyWord]);

  //Change active feature filter icon
  const activeFilter = (key) => {
    setActiveFeature((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  //Reset Repair List data
  useEffect(() => {
    setRepairList(repairData);
  }, [repairData, searchItem]);

  //Filter Data using search term
  useEffect(() => {
    const lowerCaseSearchTerm = searchItem.toLowerCase();

    setRepairList(
      repairData.filter((item) => {
        console.log(item)
        // 完成/未完成邏輯
        const isCompleted = item.result !== null;
        const showCompleted = activeFeature.solved && isCompleted;
        const showIncomplete = activeFeature.unsolved && !isCompleted;
        const statusMatched = showCompleted || showIncomplete;

        // 搜尋邏輯
        const matchesSearch = Object.values(item).some((value) =>
          String(value).toLowerCase().includes(lowerCaseSearchTerm)
        );

        return statusMatched && matchesSearch;
      })
    );

  }, [activeFeature, searchItem, repairData]);

  return (
    <div className="MachineList">
      <div className="TopBar">
        <div className="Title">
          <FaTools fontSize="1.7em" />
          <h2>修理紀錄查詢</h2>
          <button onClick={() => navigate("/ProjectBridge/repair-add")}>新增修理紀錄</button>
        </div>
      </div>
      <div className="searchBar">
        <h4>搜尋：</h4>
        <input
          type="text"
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
          placeholder="輸入搜尋關鍵字"
        />
        <div className="TabSet">
            <h4 className={activeFeature.unsolved ? "specialActive" : "specialInactive"} onClick={() => activeFilter("unsolved")}> 尚未處理 </h4>
            <h4 className={activeFeature.solved ? "specialActive" : "specialInactive"} onClick={() => activeFilter("solved")}> 處理完畢 </h4>
        </div>
      </div>
      <div className="Table">
        <TableContainer className="TableClass">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead
              sx={{
                backgroundColor: "var(--color-primary)",
                position: "sticky",
                top: 0,
                zIndex: 1,
              }}
            >
              <TableRow className="TableHeader">
                <TableCell align="center">
                  <h3>系統編號</h3>
                </TableCell>
                <TableCell align="center">
                  <h3>建物名稱</h3>
                </TableCell>
                <TableCell align="center">
                  <h3>維修時間</h3>
                </TableCell>
                <TableCell align="center">
                  <h3>檢修項目</h3>
                </TableCell>
                <TableCell align="center">
                  <h3>狀態</h3>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {repairList?.length > 0 ? (
                repairList?.map((structure) => (
                  <TableRow key={structure.id}>
                    <TableCell sx={{ width: "10%" }} align="center">
                      <h4>{structure.id}</h4>
                    </TableCell>
                    <TableCell align="center">
                      <h4>{structure.bridgeName}</h4>
                    </TableCell>
                    <TableCell align="center">
                      <h4>{structure.time ? structure.time : "-"}</h4>
                    </TableCell>
                    <TableCell align="center">
                      <h4>{structure.task ? structure.task : "-"}</h4>
                    </TableCell>
                    <TableCell align="center">
                      {structure.result ? (
                        <>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              cursor: "pointer",
                            }}
                            onClick={() =>
                              changeEdit("report", "", structure.id)
                            }
                          >
                            <h4 style={{ color: "rgb(112 171 67)" }}>處理完畢</h4>
                          </div>
                        </>
                      ) : (
                        <>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              cursor: "pointer",
                            }}
                            onClick={() =>
                              navigate(`/ProjectBridge/repair-check/${structure.id}`)
                            }
                          >
                            <h4 style={{ color: "rgb(255, 59, 59)" }}>尚未處理</h4>
                          </div>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} align="center">
                    <div className="emptyTable">
                      <AiFillFileUnknown fontSize={80} />
                      <h2>未發現任何資料</h2>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};
export default RepairTable;
