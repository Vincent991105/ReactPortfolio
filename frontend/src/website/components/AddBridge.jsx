import { useContext } from 'react';
import { PopupContext } from '../context/PopupContext'

function AddBridge(){

    const{changeEdit} = useContext(PopupContext)

    return <button className="AddBridge" onClick={() => changeEdit('bridge','add')}>
        新增橋梁
    </button>
}

export default AddBridge;