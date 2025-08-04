import { createContext, useEffect, useState } from "react";

export const PopupContext = createContext();

export const PopupProvider = ({children}) => {

    //開啟橋梁視窗
    const [isOpen, setisOpen] = useState({type:'',mode:'',id:''});
    const changeEdit = (type, mode, data) => {
        setisOpen({type, mode, data});
    }

    const [selectError, setselectError] = useState();

    const value = {
        isOpen,
        changeEdit,
        selectError,
        setselectError
    }

    return <PopupContext.Provider value={value}>{children}</PopupContext.Provider>

}