import { createContext, useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";

export const BasicContext = createContext();

export const BasicProvider = ({children}) => {

    const [colormode, setcolormode] = useState(true);
    const [page, setPage] = useState("MachineList");

    const isMobile = useMediaQuery({ maxWidth: 768 });

    useEffect(() => {
        document.body.className = colormode ? "PinkTheme" : "DarkTheme";
    }, [colormode]);

    const changeColorMode = () => {
        setcolormode(prevMode => !prevMode);
    };

    const changePage = (data) => setPage(data);

    const value = {
        colormode,
        changeColorMode,
        page,
        changePage,
        isMobile
    }

    return <BasicContext.Provider value={value}>{children}</BasicContext.Provider>

}