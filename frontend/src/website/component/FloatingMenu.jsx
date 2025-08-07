import { useState, useRef, useEffect } from "react";
import { IoMenu } from "react-icons/io5";
import { MdOutlineAdminPanelSettings, MdSimCardDownload, MdAppSettingsAlt, MdBrightness1, MdBrightness2 } from "react-icons/md";
import { useSpring, animated } from "@react-spring/web";
import { useGesture } from "@use-gesture/react";
import { FaClipboardList } from "react-icons/fa";
import { AiFillAlert, AiFillHome  } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { GrHostMaintenance } from "react-icons/gr";
import { FaTools } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { changeColorMode } from "../store/BridgeSlice";
import './css/FloatingMenu.css'
import  CustomTooltip  from "./common/CustomTooltip";

//Custom tooltip
// export const CustomTooltip = styled(({ className, ...props }) => (
//   <Tooltip
//     {...props}
//     classes={{ popper: className }}
//     /*  PopperProps={{
//       modifiers: [
//         {
//           name: "offset",
//           options: {
//             offset: [0, 7],
//           },
//         },
//       ],
//     }}*/
//   />
// ))(({ theme }) => ({
//   [`& .${tooltipClasses.tooltip}`]: {
//     backgroundColor: "#36454F",
//     fontSize: "18px",
//   },
// }));

function FloatingMenu() {

  const authInfo = [
      {
        title: "建物列表",
        path: "/ProjectBridge/home",
        element: "AiFillHome"
      },
      {
        title: "監控儀錶板",
        path: "/ProjectBridge/bridge-monitoring/data-result",
        element: "MdAppSettingsAlt"
      },
      {
        title: "即時報表",
        path: "/ProjectBridge/sensor-monitoring/data-result",
        element: "FaClipboardList"
      },
      // {
      //   title: "異常監控平台",
      //   path: "/ProjectBridge/alert-platform",
      //   element: "AiFillAlert"
      // },
      // {
      //   title: "帳戶管理",
      //   path: "http://${window.location.hostname}:8000/admin/",
      //   element: "CustomTooltip"
      // },
      // {
      //   title: "報告生成與下載",
      //   path: "/ProjectBridge/download-report",
      //   element: "MdSimCardDownload"
      // },
      // {
      //   title: "橋檢紀錄查詢",
      //   path: "/ProjectBridge/maintance-list",
      //   element: "GrHostMaintenance"
      // },
      // {
      //   title: "維修紀錄查詢",
      //   path: "/ProjectBridge/repair-list",
      //   element: "FaTools"
      // }
  ]

  const dispatch = useDispatch();
  const { colormode } = useSelector((state) => state.ProjectBridgeData);

  const BrightnessIcon = colormode ? MdBrightness2 : MdBrightness1;

  const navigate = useNavigate();

  const iconMap = {
    MdAppSettingsAlt: MdAppSettingsAlt,
    FaClipboardList: FaClipboardList,
    AiFillAlert: AiFillAlert,
    MdSimCardDownload: MdSimCardDownload,
    MdOutlineAdminPanelSettings: MdOutlineAdminPanelSettings,
    AiFillHome: AiFillHome,
    GrHostMaintenance: GrHostMaintenance,
    FaTools: FaTools,
  };

  const [icon, setIcon] = useState([
    ...authInfo.map((link, index) => {
      const Icon = iconMap[link.element];

      if (!Icon) {
        // console.warn(`Icon "${link.element}" not found in iconMap`);
        return null; // Handle missing icons gracefully
      }
      return (
        <CustomTooltip title={link.title} placement="right">
          <span>
            <Icon
              onClick={() => navigate(`${link.path}`)}
              style={{ cursor: "pointer" }}
              key={index}
            />
          </span>
        </CustomTooltip>
      );
    })
  ]);
  
  const [isOpen, setIsOpen] = useState(false); // 初始状态设为关闭

  // 獲取螢幕的寬度和高度
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  // 創建 ref 来獲取 hoverButton 的高度
  const hoverButtonRef = useRef(null);
  const [hoverButtonHeight, setHoverButtonHeight] = useState(0);

  // 僅在组件第一次加载时獲取 hoverButton 的高度
  useEffect(() => {
    if (hoverButtonRef.current) {
      setHoverButtonHeight(hoverButtonRef.current.offsetHeight);
    }
  }, []); // 僅在组件加载时執行

  // 位置动画 (拖曳控制)
  const [{ x, y }, positionApi] = useSpring(() => ({ x: 27, y: 110 }));

  // 展开动画 (控制顯示与隱藏)
  const hoverSpring = useSpring({
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? "translateY(0)" : "translateY(10px)",
    config: { tension: 100, friction: 5 },
    immediate: !isOpen, // 当菜单关闭时，确保不触发动画
  });

  // 拖曳手势绑定
  const bindGestures = useGesture({
    onDrag: ({ offset: [ox, oy] }) => {
      const topBoundary = 110;
      const bottomBoundary =
        screenHeight - (hoverButtonHeight + 200 + icon.length * 30); // 使用计算得到的 hoverButton 高度
      const leftBoundary = 27;
      const rightBoundary = screenWidth - 90;

      const newX = Math.min(Math.max(ox, leftBoundary), rightBoundary);
      const newY = Math.min(Math.max(oy, topBoundary), bottomBoundary);

      // 更新拖曳位置
      positionApi.start({ x: newX, y: newY });
    },
  });

  // 處理滑鼠進入和離開事件来控制菜单的展開和收起
  const handleMouseEnter = () => {
    setIsOpen(true); // 滑鼠進入时展开菜單
  };

  const handleMouseLeave = () => {
    setIsOpen(false); // 滑鼠離開时收起菜單
  };

  return (
    <animated.div
      {...bindGestures()}
      className="FloatingMenu"
      style={{
        x,
        y,
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
      onMouseEnter={handleMouseEnter} // 鼠标进入时触发展开
      onMouseLeave={handleMouseLeave} // 滑鼠離開时触发收起
    >
      {/* 子菜单 */}
      {isOpen && (
        <animated.div
          ref={hoverButtonRef} // 为 hoverButton 添加 ref
          className="hoverButton"
          style={hoverSpring}
        >
          {icon.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
          <div>
            <CustomTooltip title="切換模式" placement="right">
              <span>
                <BrightnessIcon
                  onClick={() => dispatch(changeColorMode())}
                  style={{ cursor: "pointer" }}
                />
              </span>
            </CustomTooltip>
          </div>
        </animated.div>
      )}
      {/* 主按鈕 */}
      <div className="mainButton">
        <IoMenu />
      </div>
    </animated.div>
  );
}

export default FloatingMenu;
