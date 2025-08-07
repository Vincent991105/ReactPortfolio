import { AiFillFileUnknown } from "react-icons/ai";

function UnknownData({text}){
    return(
        <div className="UnknownData">
            <AiFillFileUnknown fontSize={100} />
            <h2>{text}</h2>
        </div>
    )
}

export default UnknownData