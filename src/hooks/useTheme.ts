import { useContext } from "react";
import { ThemeContext } from "../context/themeContext";

interface ThemeContextType{
    theme:string;
    onChangeTheme:() => void;
}
export const useTheme = () : ThemeContextType => {
    const context = useContext(ThemeContext);
    if(context === undefined){
        throw new Error("Theme must be within the application");
    }
    return context;
}