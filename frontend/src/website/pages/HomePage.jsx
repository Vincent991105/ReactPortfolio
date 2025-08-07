import { useEffect, useState } from "react";
import { AiFillHome } from "react-icons/ai";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import './css/HomePage.css'
import  CustomTooltip  from "../component/common/CustomTooltip";
import { IoMdRefreshCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { SelectBridge } from "../store/BridgeSlice";
import UnknownData from "../component/common/UnknownData";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { list } = useSelector((state) => state.ProjectBridgeData);

  const [searchName, setSearchName] = useState("");
  const [structureList, setStructureList] = useState(list);
  const [activeIcon, setActiveIcon] = useState({
    bridge: true,
    building: true,
    neighbor: true,
  });

  //Change active structure filter icon
  const activeStructure = (key) => {
    setActiveIcon((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  //Filter structre list using icon
  useEffect(() => {
    const iconFilterList = list?.filter((list) => {
      return (
        (activeIcon.bridge && list.type === "橋梁") ||
        (activeIcon.building && list.type === "建物") ||
        (activeIcon.neighbor && list.type === "鄰損")
      );
    });
    setStructureList(iconFilterList);
  }, [activeIcon]);

  // Filter structure  list using search name
  const handleSearch = (e) => {
    e.preventDefault();
    const name = e.target.value;
    setSearchName(name);
    const filterdList = list?.filter((list) => {
      return name === "" || list.name.includes(name);
    });
    setStructureList(filterdList);
  };

  // //change earthquake and typhoon table  column values color
  // const getColor = (value) => {
  //   if (value === 0 || null) return {bg:"var(--color-component-bg)",font:"var(--color-font)"};
  //   if (value >= 0.85) return {bg:"#9DCD7B",font:"black"};
  //   if (value >= 0.7) return {bg:"#FFD700",font:"black"};
  //   return "#FF6347";
  // };

  const select = (data) =>{
    dispatch(SelectBridge(data))
    navigate('/ProjectBridge/bridge-monitoring/sensor-list')
  }

  return (
    <div className="HomePage">
      <div className="TopBar">
        <div className="Title">
          <AiFillHome fontSize="1.5em" />
          <h2> 建案列表</h2>
        </div>
        <div className="Title">
          <span
            style={{ cursor: "pointer", display: "flex" }}
            onClick={() => fetchStructures()}
          >
            <IoMdRefreshCircle fontSize="1em" />
          </span>
          <p>更新時間：2025/08/04</p>
        </div>
      </div>
      <div className='SearchContainer'>
        <div className='Search'>
          <h4> 搜尋： </h4>
          <input type="text" value={searchName} onChange={handleSearch} />
        </div>
        <div className='StructureFilter'>
          {/* <h4> 建物類型:</h4> */}
          <div
            className={`FilterIcon ${
              activeIcon.bridge ? 'FilterIconActive' : ""
            }`}
            onClick={() => activeStructure("bridge")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="16"
              viewBox="0 0 25 20"
              fill="none"
            >
              <path d="M12.5314 0C8.73692 0 5.42596 2.24434 3.65892 5.58109H0.539062V10.7471H6.77878C6.95478 7.45567 9.45778 4.84334 12.5305 4.84334C15.6033 4.84334 18.1063 7.45567 18.2823 10.7471H24.522V5.58109H21.4021C19.636 2.24434 16.3241 0 12.5296 0H12.5314ZM0.539062 11.667V20H6.7859V11.667H0.539062ZM18.2769 11.667V20H24.5238V11.667H18.2769Z" />
            </svg>
            <h4>橋梁</h4>
          </div>
          <div
            className={`FilterIcon ${
              activeIcon.building ? 'FilterIconActive' : ""
            }`}
            onClick={() => activeStructure("building")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="16"
              viewBox="0 0 19 20"
              fill="none"
            >
              <path d="M16.7737 0H1.77368C1.08274 0 0.523682 0.559063 0.523682 1.25V18.75C0.523682 19.4409 1.08274 20 1.77368 20H8.02368V15H10.5237V20H16.7737C17.4646 20 18.0237 19.4409 18.0237 18.75V1.25C18.0237 0.559063 17.4646 0 16.7737 0ZM8.02368 12.5H5.52368V10H8.02368V12.5ZM8.02368 7.5H5.52368V5H8.02368V7.5ZM13.0237 12.5H10.5237V10H13.0237V12.5ZM13.0237 7.5H10.5237V5H13.0237V7.5Z" />
            </svg>
            <h4>建物</h4>
          </div>
          <div
            className={`FilterIcon ${
              activeIcon.neighbor ? 'FilterIconActive' : ""
            }`}
            onClick={() => activeStructure("neighbor")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 13 13"
              fill="none"
            >
              <path d="M12.7692 5.92556L7.07498 0.238063C6.91615 0.0794219 6.7079 0 6.49986 0C6.29181 0 6.08356 0.0794219 5.92473 0.238063L0.230461 5.92556C-0.0871976 6.24366 -0.071335 6.74131 0.246324 7.05859C0.564797 7.3775 1.0303 7.42442 1.34898 7.10613L1.62678 6.82845V12.1875C1.62678 12.6366 1.9906 13 2.44025 13H5.69412V9.75H7.32105V13H10.5749C11.0246 13 11.3884 12.6366 11.3884 12.1875V6.8443L11.6314 7.08703C11.9491 7.40431 12.4345 7.37588 12.7532 7.05839C13.071 6.74131 13.0877 6.24284 12.7692 5.92556Z" />
            </svg>
            <h4>鄰損</h4>
          </div>
        </div>
      </div>
      <div className='Table'>
        {structureList.length > 0 ? (
            <TableContainer className='TableClass'>
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
                        <h3>編號(ID)</h3>
                        </TableCell>
                        <TableCell align="center">
                        <h3>建物名稱</h3>
                        </TableCell>
                        <TableCell align="center">
                        <h3>建物類型</h3>
                        </TableCell>
                        <TableCell align="center">
                        <h3>觀測站</h3>
                        </TableCell>
                        <TableCell align="center">
                        <h3>異常感測器</h3>
                        </TableCell>
                        <TableCell align="center">
                        <h3>健康度</h3>
                        </TableCell>
                        {/* <TableCell align="center">
                        <h3>斜率直</h3>
                        </TableCell>
                        <TableCell align="center">
                        <h3>地震影響</h3>
                        </TableCell>
                        <TableCell align="center">
                        <h3>颱風影響</h3>
                        </TableCell> */}
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {structureList?.map((structure) => (
                        <TableRow
                            sx={{ cursor: "pointer" }}
                            hover={true}
                            key={structure.id}
                            onClick={() => {
                            select(structure.id);
                            }}
                        >
                            <TableCell
                            align="center"
                            >
                            <h4>{structure.id}</h4>
                            </TableCell>
                            <TableCell
                            align="center"
                            >
                            <h4>{structure.name}</h4>
                            </TableCell>
                            <TableCell
                            align="center"
                            >
                            <h4>{structure.type}</h4>
                            </TableCell>
                            <TableCell
                            align="center"
                            >
                            {/*Station  weather information*/}
                            { structure.weather ? (
                                <CustomTooltip
                                    title={
                                    <div>
                                        雨量: {structure.weather.latestPrecipitation} mm
                                        <br />
                                        溫度: {structure.weather.latestTemperature} °C
                                        <br />
                                        風速: {structure.weather.latestWindSpeed} m/s <br />
                                        風向: {structure.weather.latestWindDirection} °
                                    </div>
                                    }
                                >
                                    <h4>{structure.weather.stationName}</h4>
                                </CustomTooltip>
                                ):(
                                    <CustomTooltip
                                        title={
                                        <div>尚未更新最新資料</div>
                                        }
                                    >
                                        <h4>-</h4>
                                    </CustomTooltip>
                                )
                            }
                            </TableCell>
                            <TableCell
                            align="center"
                            >
                            <h4 style={{ color: "rgb(255, 59, 59)" }}>
                                {structure.sensorList.filter(sensor => sensor.status === 2).length} 顆
                            </h4>
                            </TableCell>
                            <TableCell
                            align="center"
                            >
                            <h4>
                                {structure.latestHealth === null
                                ? "-"
                                : `${structure.latestHealth}%`}
                            </h4>
                            </TableCell>
                            {/* <TableCell
                            align="center"
                            >
                            <h4>
                                <span>警戒:</span>
                                {structure.slope.daysUntilAlert == null
                                ? "無資料"
                                : `${structure.slope.daysUntilAlert}天後`}
                            </h4>
                            <h4>
                                <span>行動:</span>
                                {structure.slope.daysUntilMove == null
                                ? "無資料"
                                : `${structure.slope.daysUntilMove}天後`}
                            </h4>
                            </TableCell> */}
                            {/* <TableCell
                            sx={{
                                border: `1px solid ${getColor(Number(structure.earthquake.beforeAfter ?? 0)).bg}`,
                                background: getColor(Number(structure.earthquake.beforeAfter ?? 0)).bg,
                                textAlign: "center",
                            }}
                            >
                            <h4>
                                <span style={{color:getColor(Number(structure.earthquake.beforeAfter ?? 0)).font}}>事件前後:</span>
                                <span style={{color:getColor(Number(structure.earthquake.beforeAfter ?? 0)).font}}>
                                {structure.earthquake.beforeAfter === null
                                    ? "無資料"
                                    : Number(structure.earthquake.beforeAfter).toFixed(
                                        4
                                    )}{" "}
                                </span>
                            </h4>
                            <h4>
                                <span style={{color:getColor(Number(structure.earthquake.beforeAfter ?? 0)).font}}>過程最大:</span>
                                <span style={{color:getColor(Number(structure.earthquake.beforeAfter ?? 0)).font}}>
                                {structure.earthquake.maxDuring === null
                                    ? "無資料"
                                    : Number(structure.earthquake.maxDuring).toFixed(
                                        4
                                    )}{" "}
                                </span>
                            </h4>
                            </TableCell>
                            <TableCell
                            sx={{
                                border: `1px solid ${getColor(Number(structure.typhoon?.beforeAfter ?? 0)).bg}`,
                                background: getColor(Number(structure.typhoon?.beforeAfter ?? 0)).bg,
                                textAlign: "center",
                            }}
                            >
                            <h4>
                                <span style={{color:getColor(Number(structure.typhoon.beforeAfter ?? 0)).font}}>事件前後:</span>
                                <span style={{color:getColor(Number(structure.typhoon.beforeAfter ?? 0)).font}}>
                                {structure.typhoon.beforeAfter === null
                                    ? "無資料"
                                    : Number(structure.typhoon.beforeAfter).toFixed(
                                        4
                                    )}{" "}
                                </span>
                            </h4>
                            <h4>
                                <span style={{color:getColor(Number(structure.typhoon.beforeAfter ?? 0)).font}}>過程最大:</span>
                                <span style={{color:getColor(Number(structure.typhoon.beforeAfter ?? 0)).font}}>
                                {structure.typhoon.maxDuring === null
                                    ? "無資料"
                                    : Number(structure.typhoon.maxDuring).toFixed(4)}
                                </span>
                            </h4>
                            </TableCell> */}
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        ):(
            <UnknownData text='並未搜尋到對應資料'/>
        )}
        
      </div>
    </div>
  );
};

export default HomePage;
