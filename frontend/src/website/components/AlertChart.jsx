import { useContext } from "react"
import { PopupContext } from "../context/PopupContext"

function AlertChart({data}){

    const{ setselectError } = useContext(PopupContext)

    return <div className="AlertChart">
        <div className="ModalContent">
            <div className="title">
                <h2>{data.detailedLocation}</h2>
                <button className="close-button" onClick={() => setselectError('')}>×</button>
            </div>
            <div className="ImgBox">
                <img src={`/image/bridge/${data.photoName}?version=${Math.floor(Math.random() * 100000)}`} alt={`橋梁 ${data.name}`} />
                <div
                    className="point"
                    style={{
                    left: `${Math.max(0, Math.min(100, data.imageCoordinate.x))}%`,
                    top: `${Math.max(0, Math.min(100, data.imageCoordinate.y + 6))}%`,
                    backgroundColor: 'red',
                    position: "absolute",
                    }}
                ></div>
            </div>
        </div>
    </div>

}

export default AlertChart