import { useContext, useEffect, useState } from "react";
import { MdAppSettingsAlt } from "react-icons/md"
import { RecordContext } from "../context/RecordContext";
import { AiFillFileUnknown } from "react-icons/ai";
import {
    Table,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PopupContext } from "../context/PopupContext";
import { GrHostMaintenance } from "react-icons/gr";

function MaintenanceList(){

    const { maintenanceData, searchBridge, keyWord } = useContext(RecordContext);
    const { changeEdit } = useContext(PopupContext);

    useEffect(() => {searchBridge('')},[])

    const navigate = useNavigate();

    const colorMap = {
        0: 'rgb(112 171 67)',
        1: 'orange',
        2: 'rgb(255, 59, 59)',
    };

    const [searchTerm, setSearchTerm] = useState(""); // 搜尋文字
    const [activeIcon, setActiveIcon] = useState({completed:true, incomplete:true})
    const [filteredData, setFilteredData] = useState(maintenanceData); // 過濾後的資料

    //Change active structure filter icon
    const activeStructure = (key) => {
        setActiveIcon((prev) => ({
        ...prev,
        [key]: !prev[key],
        }));
    };

    useEffect(() => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
      
        setFilteredData(
          maintenanceData.filter((item) => {
            // 完成/未完成邏輯
            const isCompleted = item.result !== null;
            const showCompleted = activeIcon.completed && isCompleted;
            const showIncomplete = activeIcon.incomplete && !isCompleted;
            const statusMatched = showCompleted || showIncomplete;
      
            // 搜尋邏輯
            const matchesSearch = Object.values(item).some((value) =>
              String(value).toLowerCase().includes(lowerCaseSearchTerm)
            );
      
            return statusMatched && matchesSearch;
          })
        );

    }, [activeIcon, searchTerm, maintenanceData]);

    useEffect(() => {setSearchTerm(keyWord)},[keyWord])



    return(
        <div className="MaintenanceList">
            <div className="TopBar">
                <div className="Title">
                    <GrHostMaintenance fontSize="1.5em" />
                    <h2>橋檢紀錄查詢</h2>
                    <button onClick={() => navigate("/ProjectBridge/maintance-add")}>新增橋檢紀錄</button>
                </div>
            </div>
            <div className="searchBar">
                <h4>搜尋：</h4>
                <input type="text" id="search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="輸入搜尋關鍵字" />
                <div className="TabSet">
                    <h4 className={activeIcon.incomplete ? "specialActive" : "specialInactive"} onClick={() => activeStructure("incomplete")}> 尚未處理 </h4>
                    <h4 className={activeIcon.completed ? "specialActive" : "specialInactive"} onClick={() => activeStructure("completed")}> 處理完畢 </h4>
                </div>
            </div>
            <div className='Table'>
                <TableContainer
                className='TableClass'
                >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead
                    sx={{
                        backgroundColor: "var(--color-primary)",
                        position: "sticky",
                        top: 0,
                        zIndex: 1,
                    }}
                    >
                        <TableRow className='TableHeader'>
                            <TableCell align="center">
                                <h3>系統編號</h3>
                            </TableCell>
                            <TableCell align="center">
                                <h3>建物名稱</h3>
                            </TableCell>
                            <TableCell align="center">
                                <h3>緊急程度</h3>
                            </TableCell>
                            <TableCell align="center">
                                <h3>橋檢類型</h3>
                            </TableCell>
                            <TableCell align="center">
                                <h3>檢修時間</h3>
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
                    {filteredData?.length > 0 ? (
                        filteredData?.map((structure) => (
                        <TableRow key={structure.id}>
                            <TableCell sx={{ width: '10%' }} align="center">
                                <h4>{structure.id}</h4>
                            </TableCell>
                            <TableCell align="center">
                                <h4>{structure.bridgeName}</h4>
                            </TableCell>
                            <TableCell align="center">
                                <h4 style={{ color: colorMap[structure.urgent] }}>{structure.urgent === 0 ? '急' : structure.urgent === 1 ? '緊急' : '非常緊急'}</h4>
                            </TableCell>
                            <TableCell align="center">
                                <h4>{structure.type}</h4>
                            </TableCell>
                            <TableCell align="center">
                                <h4>{structure.time ? structure.time : '-'}</h4>
                            </TableCell>
                            <TableCell align="center">
                                <h4>{structure.task ? structure.task : '-'}</h4>
                            </TableCell>
                            <TableCell align="center">
                                <h4 style={{color : structure.result ? 'rgb(112 171 67)' : 'rgb(255, 59, 59)' , cursor:'pointer'}} onClick={structure.result ? () => changeEdit('maintenance','',structure.id) : () => navigate(`/ProjectBridge/maintance-check/${structure.id}`)}>{structure.result ? '處理完畢' : '尚未處理'}</h4>
                            </TableCell>
                        </TableRow>
                        ))
                    ) : (
                        <TableRow>
                        <TableCell colSpan={9} align="center">
                            <div className='emptyTable'>
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
    )

}

export default MaintenanceList