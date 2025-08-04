import { MapContainer, TileLayer, Marker, Circle, useMap, useMapEvents } from "react-leaflet";
import { useEffect, useState } from "react";
import { BridgeContext } from "../context/BridgeContext";
import { DisasterContext } from "../context/DisasterContext";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useContext } from "react";
import { BasicContext } from "../context/BasicContext";
import { useLocation } from 'react-router-dom';
import { RecordContext } from "../context/RecordContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { FaHandPointDown } from "react-icons/fa";
import ReactDOMServer from 'react-dom/server';

function BridgeMap() {

  const location = useLocation(); // 获取当前的路径信息
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { colormode, isMobile } = useContext(BasicContext);
  const { bridgePoint, selectBridge, select, alertPoint, setSearchTerm } = useContext(BridgeContext);
  const [position, setPosition] = useState(null);
  const { earthPoint } = useContext(DisasterContext);
  const { searchBridge, keyWord } = useContext(RecordContext);

  const lightTileLayer = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const darkTileLayer =
    "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";

  const createCustomIcon = (id, type, name) => {

    let fillColor = "#373F74";

    // 如果路径是 "/MaintenanceRecord"，则设置 fillColor
    if (location.pathname.includes("/maintenance")) {
      if(keyWord === name){
        fillColor = "#e95098"
      }
    } else if (location.pathname === ("/add-bridge")){

    }else {
      if (id === select.bridge) {
        fillColor = "#e95098";  // 根据 id 和 select.bridge 的值改变颜色
      }
    }

    if (type === "bridge") {
      return L.divIcon({
        className: "leafletMark", // 自定义样式类名
        html: `
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" viewBox="0 0 25 20" fill="none">
            <path d="M12.5314 0C8.73692 0 5.42596 2.24434 3.65892 5.58109H0.539062V10.7471H6.77878C6.95478 7.45567 9.45778 4.84334 12.5305 4.84334C15.6033 4.84334 18.1063 7.45567 18.2823 10.7471H24.522V5.58109H21.4021C19.636 2.24434 16.3241 0 12.5296 0H12.5314ZM0.539062 11.667V20H6.7859V11.667H0.539062ZM18.2769 11.667V20H24.5238V11.667H18.2769Z" fill="${fillColor}"/>
          </svg>
        `,
        iconSize: [32, 32], // 图标大小
        iconAnchor: [14, 14], // 图标锚点
        popupAnchor: [0, -32], // 弹窗相对图标的位置
      });
    } else if (type === "building") {
      return L.divIcon({
        className: "leafletMark", // 自定义样式类名
        html: `
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 19 20" fill="none">
            <path d="M16.7737 0H1.77368C1.08274 0 0.523682 0.559063 0.523682 1.25V18.75C0.523682 19.4409 1.08274 20 1.77368 20H8.02368V15H10.5237V20H16.7737C17.4646 20 18.0237 19.4409 18.0237 18.75V1.25C18.0237 0.559063 17.4646 0 16.7737 0ZM8.02368 12.5H5.52368V10H8.02368V12.5ZM8.02368 7.5H5.52368V5H8.02368V7.5ZM13.0237 12.5H10.5237V10H13.0237V12.5ZM13.0237 7.5H10.5237V5H13.0237V7.5Z" fill="${fillColor}"/>
          </svg>
        `,
        iconSize: [32, 32], // 图标大小
        iconAnchor: [14, 14], // 图标锚点
        popupAnchor: [0, -32], // 弹窗相对图标的位置
      });
    } else {
      return L.divIcon({
        className: "leafletMark", // 自定义样式类名
        html: `
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 13 13" fill="none">
            <path d="M12.7692 5.92556L7.07498 0.238063C6.91615 0.0794219 6.7079 0 6.49986 0C6.29181 0 6.08356 0.0794219 5.92473 0.238063L0.230461 5.92556C-0.0871976 6.24366 -0.071335 6.74131 0.246324 7.05859C0.564797 7.3775 1.0303 7.42442 1.34898 7.10613L1.62678 6.82845V12.1875C1.62678 12.6366 1.9906 13 2.44025 13H5.69412V9.75H7.32105V13H10.5749C11.0246 13 11.3884 12.6366 11.3884 12.1875V6.8443L11.6314 7.08703C11.9491 7.40431 12.4345 7.37588 12.7532 7.05839C13.071 6.74131 13.0877 6.24284 12.7692 5.92556Z" fill="${fillColor}"/>
          </svg>
        `,
        iconSize: [32, 32], // 图标大小
        iconAnchor: [14, 14], // 图标锚点
        popupAnchor: [0, -32], // 弹窗相对图标的位置
      });
    }
  };

  const EarthquakeIcon = () => {
    const fillColor = "white";

    return L.divIcon({
      className: "leafletMark", // 自定义样式类名
      html: `
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 408 498" fill="none">
          <path d="M204 0.757568C91.7479 0.757568 0.363647 92.1418 0.363647 204.472C0.363647 285.616 47.9176 358.227 121.847 390.808L191.433 490.649C194.303 494.76 199.035 497.242 204 497.242C204 497.242 204 497.242 204.078 497.242C209.042 497.242 213.775 494.76 216.645 490.649L286.153 390.808C360.082 358.227 407.636 285.616 407.636 204.472C407.636 92.1418 316.33 0.757568 204 0.757568ZM204 315.405C142.715 315.405 93.0667 265.679 93.0667 204.472C93.0667 143.187 142.715 93.5382 204 93.5382C265.285 93.5382 314.933 143.187 314.933 204.472C314.933 265.679 265.285 315.405 204 315.405Z" fill="${fillColor}"/>
        </svg>
      `,
      iconSize: [32, 32], // 图标大小
      iconAnchor: [14, 14], // 图标锚点
      popupAnchor: [0, -32], // 弹窗相对图标的位置
    });
  };

  const alertCustomIcon = (id, healthErrors, connectionErrors) => {
    const totalErrors = healthErrors + connectionErrors;
    const fillColor = id === select.bridge ? "#e95098" : "#ff69b4"; // 选中时深粉色，默认浅粉色

    return L.divIcon({
      className: "leafletMark", // 自定义样式类名
      html: `
        <div style="
          width: 32px;
          height: 32px;
          background-color: ${fillColor};
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 14px;
          font-weight: bold;
          text-align: center;
        ">
          ${totalErrors}
        </div>
      `,
      iconSize: [32, 32], // 图标大小
      iconAnchor: [16, 16], // 图标锚点
      popupAnchor: [0, -16], // 弹窗相对图标的位置
    });
  };

  const handIcon = new L.DivIcon({
    html: ReactDOMServer.renderToString(<FaHandPointDown size={30} color="red" />),
    className: '', // 清掉預設樣式
    iconAnchor: [15, 15], // 圖示的 anchor 點，可調整位置
  });

  useEffect(() => {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "0");
    svg.setAttribute("height", "0");
    svg.innerHTML = `
      <defs>
        <radialGradient id="earthquake-gradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style="stopColor: red; stopOpacity: 1" />
          <stop offset="50%" style="stopColor: red; stopOpacity: 0.4" />
          <stop offset="100%" style="stopColor: red; stopOpacity: 0.2" />
        </radialGradient>
      </defs>
    `;
    document.body.appendChild(svg);
  }, []);

  //Handle map click events (open add bridge)
  const ClickHandler = () => {
    useMapEvents({
      click: (e) => {
        setPosition([e.latlng.lat, e.latlng.lng]);
        // 使用 Nominatim API 做反向地理編碼
        axios.get('https://nominatim.openstreetmap.org/reverse', {
          params: {
            lat: e.latlng.lat,
            lon: e.latlng.lng,
            format: 'json',
            'accept-language': 'zh-TW',
          },
          withCredentials: false, // 這行關鍵！
        })
        .then((res) => {
          const address = res.data.address;
          const city =  address.city || address.county ;
          const district = address.town || address.suburb || address.city_district || address.village || address.hamlet;
          navigate(`add-bridge?lat=${e.latlng.lat}&lng=${e.latlng.lng}&city=${city || '未知縣市'}&district=${district || ''}`);
        })
        .catch((err) => {
          console.error(err);
        });
      },
    });
    return null;
  };

  return (
    <div className="BridgeMap">
      <MapContainer
        key={location.pathname}
        center={[23.69781, 120.960515]}
        zoom={isMobile ? 7 : 8}
        className="Map"
      >
        {/* 基本地圖圖層 */}
        {/* <FixMapLoad /> */}
        <TileLayer
          url={!colormode ? darkTileLayer : lightTileLayer}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <ClickHandler />
        {searchParams.get("lat") && searchParams.get("lng") && (
          <Marker position={[searchParams.get("lat"),searchParams.get("lng")]} icon={handIcon} />
        )}

        {/* 地震擴散範圍 */}
        {earthPoint && (
          <>
            <Circle
              center={earthPoint.place}
              radius={earthPoint.impactRadius * 1000} // 擴散範圍，假設每個震級對應 1000 公里
              color="hidden"
              fillColor="red"
              fillOpacity={0.4}
            ></Circle>
            <Marker position={earthPoint.place} icon={EarthquakeIcon()} />
          </>
        )}

        {/* 動態添加橋梁標記 */}
        {(location.pathname === "/alert-platform" ? alertPoint : bridgePoint)
          .filter((point) => point.latitude && point.longitude) // 過濾掉沒有座標的數據
          .map((point, index) => (
            <Marker
              position={[
                parseFloat(point.latitude),
                parseFloat(point.longitude),
              ]}
              eventHandlers={{
                click: () => {
                  if (location.pathname === "/alert-platform") {
                    setSearchTerm(point.name);
                  }else if(location.pathname.includes("maintenance")){
                    searchBridge(point.name);
                  }else {
                    selectBridge(point.id); // 點擊 bridgePoint 時的行為
                  }
                },
              }}
              icon={
                location.pathname === "/alert-platform"
                  ? alertCustomIcon(
                    point.id,
                    point.healthErrors,
                    point.connectionErrors
                  )
                  : createCustomIcon(point.id, point.type, point.name)
              }
              id={point.id}
              key={index}
            />
          ))}
      </MapContainer>
    </div>
  );
}

export default BridgeMap;
